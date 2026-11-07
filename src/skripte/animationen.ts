// Gemeinsame Animationen für alle Sektionen ohne eigene Animation (Eduard, Nov. 2026).
// Gleiche Regeln wie auf der Startseite:
// – Tagline blendet ein, Überschriften steigen Zeile für Zeile aus der Kante, Einleitungstexte mit Zauberwürfel-Effekt,
//   Knöpfe weich von unten, Hinweise flackern verzögert wie ein Fernseher
// – Karten/Listen bauen sich als Welle auf (beim Hineinscrollen, auch bei langen Listen Stück für Stück)
// – Bildrahmen und Videovorschauen öffnen sich aus der Mitte
// – Karten-Hover: Lupe auf dem Titel, verlinkte Karten heben sich leicht
// – Referenzen-Zeitstrahl: Parallax zwischen Karte und Bild
// Sektionen mit eigener Animation tragen data-eigen und werden hier übersprungen.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wuerfelText } from './wuerfeltext';
gsap.registerPlugin(SplitText, ScrollTrigger);

const flackern = [
  { autoAlpha: 0.7, duration: 0.05 }, { autoAlpha: 0.05, duration: 0.07 },
  { autoAlpha: 0.9, duration: 0.04 }, { autoAlpha: 0.2, duration: 0.09 },
  { autoAlpha: 0.5, duration: 0.05 }, { autoAlpha: 0, duration: 0.12 },
  { autoAlpha: 1, duration: 0.04 }, { autoAlpha: 0.6, duration: 0.05 }, { autoAlpha: 1, duration: 0.08 },
];

export function lupe(el: HTMLElement, ausloeser: HTMLElement = el) {
  const chars = SplitText.create(el, { type: 'words,chars' }).chars as HTMLElement[];
  if (!chars.length) return;
  gsap.set(chars, { transformOrigin: '50% 75%' });
  const zeichen = (c: HTMLElement, f: number) =>
    gsap.to(c, { scale: 1 + 0.2 * f, opacity: 1 - 0.4 * f, duration: 0.45, ease: 'power3.out', overwrite: true });
  ausloeser.addEventListener('mousemove', (e) => {
    const m = chars.map((c) => { const r = c.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, h: r.height }; });
    let n = 0;
    m.forEach((q, i) => { if (Math.abs(q.y - e.clientY) < Math.abs(m[n].y - e.clientY)) n = i; });
    chars.forEach((c, i) => {
      if (Math.abs(m[i].y - m[n].y) > m[n].h * 0.4) { zeichen(c, 0); return; }
      const nah = Math.max(0, 1 - Math.abs(e.clientX - m[i].x) / (m[i].h * 2.2));
      zeichen(c, nah * nah * (3 - 2 * nah));
    });
  });
  ausloeser.addEventListener('mouseleave', () => chars.forEach((c) => zeichen(c, 0)));
}

export function oeffnen(b: HTMLElement) {
  const off = { k: 0 };
  const zeichne = () => {
    const w = b.offsetWidth, h = b.offsetHeight, rand = 80;
    const hw = (w / 2 + rand) * off.k, hh = (h / 2 + rand) * off.k;
    b.style.clipPath = `polygon(${w / 2 - hw}px ${h / 2 - hh}px,${w / 2 + hw}px ${h / 2 - hh}px,${w / 2 + hw}px ${h / 2 + hh}px,${w / 2 - hw}px ${h / 2 + hh}px)`;
  };
  const bild = b.querySelector<HTMLElement>('img, video, .bild');
  const tl = gsap.timeline({ onStart: zeichne })
    .fromTo(b, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'power1.out' }, 0)
    .to(off, { k: 1, duration: 1.0, ease: 'power2.out', onUpdate: zeichne, onComplete: () => { b.style.clipPath = ''; } }, 0);
  if (bild) tl.fromTo(bild, { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'power2.out', clearProps: 'scale' }, 0);
  return tl;
}

const ITEM = ['.karten > *', '.kacheln > *', '.liste > *', '.berater-liste > *', '.vorteile > *', '.fakten > li',
  '[data-karussell] .spur > * > *', '.galerie-bild', '[role="tablist"] > .tab'].join(',');
const BILD = '.vorschau, .rahmen';

const ohne = (el: Element, liste: Element[]) => !liste.some((x) => x !== el && x.contains(el));

export function sektionenAnimieren() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hover = matchMedia('(hover: hover)').matches;
  document.querySelectorAll<HTMLElement>('section.sektion:not([data-eigen])').forEach((sek) => {
    if (sek.querySelector('.sektion-innen.oben > .text')) return; // Rechtstexte bleiben ruhig
    let items = [...sek.querySelectorAll<HTMLElement>(ITEM)];
    items = items.filter((el) => ohne(el, items));
    const inItem = (el: Element) => items.some((i) => i.contains(el));
    const bilder = [...sek.querySelectorAll<HTMLElement>(BILD)].filter((b) => !inItem(b));

    const tagline = [...sek.querySelectorAll<HTMLElement>('.tagline')].filter((e) => !inItem(e));
    const titel = [...sek.querySelectorAll<HTMLElement>('h2, p.h3')].filter((e) => !inItem(e));
    const texte = [...sek.querySelectorAll<HTMLElement>('p.text-normal, p.einleitung')]
      .filter((e) => !inItem(e) && (e.textContent || '').length < 450).slice(0, 3);
    const knoepfe = [...sek.querySelectorAll<HTMLElement>('.button-zeile')].filter((e) => !inItem(e));
    const hinweise = [...sek.querySelectorAll<HTMLElement>('.hinweis')].filter((e) => !inItem(e));

    gsap.set([...tagline, ...titel, ...knoepfe, ...hinweise, ...bilder], { autoAlpha: 0 });
    // Kennzahl-/Vorteilskarten werden auf breiten Bildschirmen wie Spielkarten ausgeteilt (wie Startseite Kapitel 02)
    const breit = matchMedia('(min-width: 992px)').matches;
    const austeilen = breit ? items.filter((i) => i.matches('.kennzahlkarte')) : [];
    const welle = items.filter((i) => !austeilen.includes(i));
    let ausgeteilt = austeilen.length === 0;
    gsap.set(welle, { autoAlpha: 0, y: 120 });
    gsap.set(austeilen, { autoAlpha: 0 });

    document.fonts.ready.then(() => {
      const tl = gsap.timeline({ paused: true });
      tagline.forEach((t) => tl.fromTo(t, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.96, ease: 'power3.out' }, 0));
      titel.forEach((h) => {
        const z = SplitText.create(h, { type: 'lines', mask: 'lines' });
        gsap.set(h, { autoAlpha: 1 });
        gsap.set(z.lines, { yPercent: 110 });
        tl.to(z.lines, { yPercent: 0, duration: 1.12, ease: 'power4.out', stagger: 0.11 }, 0.12);
      });
      texte.forEach((t) => wuerfelText(tl, t, 0.12));
      knoepfe.forEach((k) => tl.fromTo(k, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.12, ease: 'power4.out' }, 0.8));
      hinweise.forEach((h) => tl.to(h, { keyframes: flackern, ease: 'none' }, 1.3)
        .fromTo(h, { scale: 0.97 }, { scale: 1, duration: 0.6, ease: 'power2.out' }, 1.3));
      ScrollTrigger.create({ trigger: sek, start: 'top 70%', once: true, onEnter: () => tl.play() });

      // Welle: Elemente kommen Stück für Stück, sobald sie ins Bild scrollen
      if (austeilen.length > 1) {
        const dtl = gsap.timeline({ paused: true });
        const vorbereiten = () => {
          // Stapel liegt auf dem Platz der letzten Karte (unten rechts)
          gsap.set(austeilen, { clearProps: 'x,y,transform' });
          const ziel = austeilen[austeilen.length - 1].getBoundingClientRect();
          const dreh = [-5, 5, -5, 5];
          austeilen.forEach((k, i) => {
            const r = k.getBoundingClientRect();
            gsap.set(k, { x: ziel.left - r.left, y: ziel.top - r.top, rotation: dreh[i % 4], zIndex: austeilen.length - i, autoAlpha: 1, yPercent: 200 });
          });
        };
        // 1. Stapel fliegt von unten herein, 2. Karten werden ohne Stopp nacheinander auf ihre Plätze verteilt und drehen sich gerade
        dtl.to(austeilen, { yPercent: 0, duration: 0.9, ease: 'power2.out', stagger: 0.06 }, 0)
          .to(austeilen.slice(0, -1), { x: 0, y: 0, rotation: 0, duration: 1.0, ease: 'power3.out', stagger: 0.14 }, 0.6)
          .to(austeilen[austeilen.length - 1], { rotation: 0, duration: 1.0, ease: 'power3.out' }, 0.6 + 0.14 * (austeilen.length - 1))
          .set(austeilen, { zIndex: 'auto' })
          .call(() => { ausgeteilt = true; });
        ScrollTrigger.create({
          trigger: austeilen[0].parentElement!, start: 'top 75%', once: true,
          onEnter: () => { vorbereiten(); dtl.play(); },
        });
      }
      if (welle.length) ScrollTrigger.batch(welle, {
        start: 'top 88%', once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.0, ease: 'back.out(1.6)', stagger: 0.09, overwrite: true }),
      });
      bilder.forEach((b) => ScrollTrigger.create({ trigger: b, start: 'top 85%', once: true, onEnter: () => oeffnen(b) }));

      // Hover auf Karten: Lupe auf dem Titel, verlinkte Karten heben sich edel an
      if (hover) items.forEach((it) => {
        const t = it.querySelector<HTMLElement>('h3, .h4, .titel');
        if (t && (t.textContent || '').length < 80) lupe(t, it);
        const link = it.matches('a') ? it : it.querySelector<HTMLElement>('a.karte-link, a.link');
        const kennzahl = it.matches('.kennzahlkarte');
        if ((link || kennzahl) && !sek.querySelector('[data-zeitstrahl]')) {
          const ziel = it;
          const pfeil = kennzahl ? it.querySelector<HTMLElement>('.pfeil') : null;
          it.addEventListener('mouseenter', () => {
            if (!ausgeteilt && austeilen.includes(it)) return;
            gsap.to(ziel, { scale: kennzahl ? 1.035 : 1.03, y: -6, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
            if (pfeil) gsap.to(pfeil, { scale: 1.2, yPercent: -40, duration: 0.6, ease: 'circ.inOut', overwrite: 'auto' });
          });
          it.addEventListener('mouseleave', () => {
            gsap.to(ziel, { scale: 1, y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
            if (pfeil) gsap.to(pfeil, { scale: 1, yPercent: 0, duration: 0.4, ease: 'circ.inOut', overwrite: 'auto' });
          });
        }
      });
    });

    // Parallax im Referenzen-Zeitstrahl: Karte gleitet gegen das Scrollen, Bild darin entgegengesetzt
    sek.querySelectorAll<HTMLElement>('[data-zeitstrahl] .reihe').forEach((r) => {
      const karte = r.querySelector<HTMLElement>('.bild-spalte');
      const bild = r.querySelector<HTMLElement>('.bildrahmen img');
      const st = { trigger: r, start: 'top bottom', end: 'bottom top', scrub: true };
      if (karte) gsap.fromTo(karte, { y: 70 }, { y: -70, ease: 'none', scrollTrigger: st });
      if (bild) gsap.fromTo(bild, { yPercent: -8, scale: 1.18 }, { yPercent: 8, scale: 1.18, ease: 'none', scrollTrigger: st });
    });
  });
}
