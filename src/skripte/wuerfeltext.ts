// Zauberwürfel-Effekt für Fließtexte (Kontrast zu den aufsteigenden Überschriften):
// innerhalb jedes Wortes klappen Gruppen von 3–4 Buchstaben 1- bis 2-mal ruhig um die waagrechte Achse,
// zeigen zunächst Zufallszeichen derselben Art und mit der letzten Drehung den richtigen Text.
// Wird in eine bestehende GSAP-Zeitleiste ab Zeitpunkt „start“ eingehängt; danach ist der Text wieder normal.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const klein = 'acenorsuvxz', gross = 'ABCDEHKNOPRSTUZ', ziffer = '0123456789';
const zufall = (z: string) => {
  const v = /[0-9]/.test(z) ? ziffer : /[A-ZÄÖÜ]/.test(z) ? gross : /[a-zäöüß]/.test(z) ? klein : '';
  return v ? v[Math.floor(Math.random() * v.length)] : z;
};

export function wuerfelText(tl: gsap.core.Timeline, el: HTMLElement | null | undefined, start: number): number {
  if (!el) return start;
  gsap.set(el, { autoAlpha: 0 });
  const zs = SplitText.create(el, { type: 'words,chars' });
  const gruppen: HTMLElement[][] = [];
  (zs.words as HTMLElement[]).forEach((w) => {
    const cs = [...w.querySelectorAll<HTMLElement>(':scope > div')];
    for (let i = 0; i < cs.length;) { const n = 3 + Math.floor(Math.random() * 2); gruppen.push(cs.slice(i, i + n)); i += n; }
  });
  (zs.chars as HTMLElement[]).forEach((c) => {
    c.dataset.echt = c.textContent || '';
    c.style.width = c.getBoundingClientRect().width + 'px';
    c.style.textAlign = 'center';
  });
  gsap.set(el, { perspective: 400 });
  const misch = (g: HTMLElement[]) => g.forEach((c) => { c.textContent = zufall(c.dataset.echt!); });
  const echt = (g: HTMLElement[]) => g.forEach((c) => { c.textContent = c.dataset.echt!; });
  tl.call(() => gruppen.forEach(misch), [], start).set(el, { autoAlpha: 1, y: 0 }, start);
  let ende = start;
  gruppen.forEach((g) => {
    // 1–2 ruhige Drehungen je Gruppe (wie ein Zauberwürfel, kein schnelles Flackern)
    const drehungen = 1 + Math.floor(Math.random() * 2);
    let t = start + 0.03 + Math.random() * 0.5;
    for (let d = 0; d < drehungen; d++) {
      const letzte = d === drehungen - 1;
      tl.to(g, { rotationX: 90, duration: 0.28, ease: 'power2.in', transformOrigin: '50% 50%' }, t)
        .call(() => (letzte ? echt(g) : misch(g)), [], t + 0.28)
        .fromTo(g, { rotationX: -90 }, { rotationX: 0, duration: 0.38, ease: 'power2.out' }, t + 0.28);
      t += 0.7 + Math.random() * 0.1;
    }
    ende = Math.max(ende, t);
  });
  tl.call(() => zs.revert(), [], ende + 0.05);
  return ende + 0.05;
}
