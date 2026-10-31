import { einstellungen, seite } from './cms';

// Menü und Footer-Links: in Sanity unter „Navigation“ pflegbar
const nav = seite('navigation');

// Seiten und Adressen wie auf der Webflow-Seite – gleiche Adressen = keine Weiterleitungen nötig.
export const menue = nav.menue.map(({ ziffer, name, href }) => ({ ziffer, name, href }));

export const footerNavigation = nav.footerNavigation.map(({ name, href }) => ({ name, href }));

export const footerMehr = nav.footerMehr.map(({ name, href }) => ({ name, href }));

// Profil-Adressen 1:1 aus dem Webflow-Footer
export const social = einstellungen?.social?.length ? einstellungen.social.map(({ name, href }) => ({ name, href })) : [
  { name: 'Instagram', href: 'https://www.instagram.com/deutschemonumentum/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-peters-5033a4173/' },
  { name: 'Youtube', href: 'https://www.youtube.com/@DeutscheMonumentum' },
];

export const kontakt = {
  mobil: einstellungen?.mobil || '+49 176 61947860',
  festnetz: einstellungen?.festnetz || '+49 721 98614532',
  email: einstellungen?.email || 'info@deutsche-monumentum.de',
  domain: einstellungen?.domain || 'deutsche-monumentum.de',
};

// Unterseiten, die noch nachgebaut werden (Platzhalter)
export const platzhalter = [
  { slug: 'impressum', titel: 'Impressum' },
  { slug: 'datenschutzerklarung', titel: 'Datenschutzerklärung' },
  { slug: 'danke', titel: 'Vielen Dank für Ihre Anfrage' },
];
