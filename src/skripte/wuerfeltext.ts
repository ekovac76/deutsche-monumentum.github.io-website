// Fließtexte, Hinweise und Footer-Texte: gleiche Animation wie die Überschriften
// (Zeilen steigen ruhig aus einer Maske auf, power4.out, gestaffelt) – Wunsch Eduard 10.11., statt Abflugtafel.
// Wird in eine bestehende GSAP-Zeitleiste ab Zeitpunkt „start“ eingehängt; danach ist der Text wieder normal.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

export function wuerfelText(tl: gsap.core.Timeline, el: HTMLElement | null | undefined, start: number): number {
  if (!el) return start;
  const zs = SplitText.create(el, { type: 'lines', mask: 'lines' });
  const zeilen = zs.lines as HTMLElement[];
  gsap.set(zeilen, { yPercent: 110 });
  tl.set(el, { autoAlpha: 1, y: 0 }, start)
    .to(zeilen, { yPercent: 0, duration: 1.12, ease: 'power4.out', stagger: 0.11 }, start);
  const ende = start + 1.12 + 0.11 * Math.max(0, zeilen.length - 1) + 0.05;
  tl.call(() => zs.revert(), [], ende);
  return ende;
}

// Hinweis (Nummer im Ring/Plus + kurzer Text): Ring blendet ein, Text steigt wie die Überschrift auf
export function wuerfelHinweis(tl: gsap.core.Timeline, hinweis: HTMLElement | null | undefined, start: number): number {
  if (!hinweis) return start;
  const text = hinweis.querySelector<HTMLElement>('p');
  const zeichen = hinweis.querySelectorAll<HTMLElement>('.ring, .plus');
  tl.set(hinweis, { autoAlpha: 1, scale: 1 }, start);
  if (zeichen.length) tl.fromTo(zeichen, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, start);
  return wuerfelText(tl, text, start);
}
