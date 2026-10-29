// Seiten und Adressen wie auf der Webflow-Seite – gleiche Adressen = keine Weiterleitungen nötig.
export const menue = [
  { ziffer: 'II.', name: 'Aktuelle Projekte', href: '/projekte' },
  { ziffer: 'III.', name: 'Unsere Referenzen', href: '/referenzen' },
  { ziffer: 'IV.', name: 'Unser Team', href: '/team' },
  { ziffer: 'V.', name: 'Denkmalsuche', href: '/denkmalsuche' },
  { ziffer: 'VI.', name: 'Bauträger', href: '/bautrager' },
  { ziffer: 'VII.', name: 'Denkmal & QNG erklärt', href: '/denkmal-und-qng-erklart' },
  { ziffer: 'VIII.', name: 'Renditerechner', href: '/berechnungstool' },
];

export const footerNavigation = [
  { name: 'Start', href: '/' },
  { name: 'Referenzen', href: '/referenzen' },
  { name: 'Denkmalsuche', href: '/denkmalsuche' },
  { name: 'Denkmal & QNG erklärt', href: '/denkmal-und-qng-erklart' },
];

export const footerMehr = [
  { name: 'Projekte', href: '/projekte' },
  { name: 'Team', href: '/team' },
  { name: 'Für Bauträger', href: '/bautrager' },
  { name: 'Renditerechner', href: '/berechnungstool' },
];

// Profil-Adressen 1:1 aus dem Webflow-Footer
export const social = [
  { name: 'Instagram', href: 'https://www.instagram.com/deutschemonumentum/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-peters-5033a4173/' },
  { name: 'Youtube', href: 'https://www.youtube.com/@DeutscheMonumentum' },
];

export const kontakt = {
  mobil: '+49 176 61947860',
  festnetz: '+49 721 98614532',
  email: 'info@deutsche-monumentum.de',
  domain: 'deutsche-monumentum.de',
};

// Unterseiten, die noch nachgebaut werden (Platzhalter)
export const platzhalter = [
  { slug: 'impressum', titel: 'Impressum' },
  { slug: 'datenschutzerklarung', titel: 'Datenschutzerklärung' },
  { slug: 'danke', titel: 'Vielen Dank für Ihre Anfrage' },
];
