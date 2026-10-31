// Sanity-Schema Teil 3: übrige Seiten (Projekte, Referenzen, Team, Bauträger, Denkmalsuche, Erklärt, Rechner) und Navigation.

{ name: 'vorteil', title: 'Kachel', type: 'object', fields: [
  { name: 'zahl', title: 'Nummer', type: 'string' },
  { name: 'label', title: 'Kleines Wort neben der Nummer', type: 'string' },
  { name: 'titel', title: 'Titel', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'icon', title: 'Symbol', type: 'image' },
] }

{ name: 'wissensthema', title: 'Thema', type: 'object', fields: [
  { name: 'titel', title: 'Titel', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'bild', title: 'Video-Vorschaubild', type: 'image', options: { hotspot: true } },
  { name: 'videoLink', title: 'Video-Link (YouTube)', type: 'url' },
] }

{ name: 'zeitstrahlEintrag', title: 'Eintrag', type: 'object', fields: [
  { name: 'referenz', title: 'Verlinkte Referenz', type: 'reference', to: [{ type: 'referenz' }] },
  { name: 'jahr', title: 'Jahr', type: 'string' },
  { name: 'titel', title: 'Titel', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'karteTitel', title: 'Karte – Titel', type: 'string' },
  { name: 'karteText', title: 'Karte – Text', type: 'text', rows: 3 },
  { name: 'karteBild', title: 'Karte – Bild', type: 'image', options: { hotspot: true } },
  { name: 'ort', title: 'Karte – Ort', type: 'string' },
] }

{ name: 'vorherNachherPaar', title: 'Vorher/Nachher', type: 'object', fields: [
  { name: 'vorher', title: 'Bild vorher', type: 'image', options: { hotspot: true } },
  { name: 'nachher', title: 'Bild nachher', type: 'image', options: { hotspot: true } },
  { name: 'titel', title: 'Titel', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
] }

{ name: 'teammitglied', title: 'Person', type: 'object', fields: [
  { name: 'name', title: 'Name', type: 'string' },
  { name: 'rolle', title: 'Rolle (Abzeichen)', type: 'string' },
  { name: 'nummer', title: 'Nummer (z. B. Nº 01)', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'bild', title: 'Foto', type: 'image', options: { hotspot: true } },
] }

{ name: 'kriterium', title: 'Kriterium', type: 'object', fields: [
  { name: 'text', title: 'Text', type: 'string' },
  { name: 'icon', title: 'Symbol', type: 'image' },
] }

{ name: 'rechnerKachel', title: 'Rechner', type: 'object', fields: [
  { name: 'titel', title: 'Titel', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 2 },
  { name: 'link', title: 'Ziel', type: 'string' },
  { name: 'icon', title: 'Symbol', type: 'image' },
] }

{ name: 'menuepunkt', title: 'Menüpunkt', type: 'object', fields: [
  { name: 'ziffer', title: 'Ziffer (nur Hauptmenü, z. B. II.)', type: 'string' },
  { name: 'name', title: 'Name', type: 'string' },
  { name: 'href', title: 'Ziel (z. B. /projekte)', type: 'string' },
] }

{ name: 'abschnittListe', title: 'Abschnitt Projektliste', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'knopf', title: 'Knopf-Beschriftung', type: 'string' },
] }

{ name: 'abschnittVorteile', title: 'Abschnitt mit Kacheln', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'knopf', title: 'Knopf-Beschriftung', type: 'string' },
  { name: 'kacheln', title: 'Kacheln', type: 'array', of: [{ type: 'vorteil' }] },
] }

{ name: 'abschnittWissen', title: 'Abschnitt Wissen im Video', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'hinweisText', title: 'Hinweis rechts', type: 'text', rows: 3 },
  { name: 'themen', title: 'Themen', type: 'array', of: [{ type: 'wissensthema' }] },
] }

{ name: 'abschnittZeitstrahl', title: 'Abschnitt Zeitstrahl', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'hinweisTitel', title: 'Hinweis rechts – Titel', type: 'string' },
  { name: 'hinweisText', title: 'Hinweis rechts – Text', type: 'text', rows: 3 },
  { name: 'knopf', title: 'Knopf-Beschriftung', type: 'string' },
  { name: 'eintraege', title: 'Einträge', type: 'array', of: [{ type: 'zeitstrahlEintrag' }] },
] }

{ name: 'abschnittVorherNachher', title: 'Abschnitt Vorher/Nachher', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'paare', title: 'Bildpaare', type: 'array', of: [{ type: 'vorherNachherPaar' }] },
] }

{ name: 'abschnittTeam', title: 'Abschnitt Team', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'hinweisTitel', title: 'Hinweis rechts – Titel', type: 'string' },
  { name: 'hinweisText', title: 'Hinweis rechts – Text', type: 'text', rows: 3 },
  { name: 'jahr', title: 'Jahr auf den Karten', type: 'string' },
  { name: 'mitglieder', title: 'Personen', type: 'array', of: [{ type: 'teammitglied' }] },
] }

{ name: 'abschnittAblauf', title: 'Abschnitt Ablauf', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'hinweisText', title: 'Hinweis rechts', type: 'text', rows: 3 },
  { name: 'schritte', title: 'Schritte', type: 'array', of: [{ type: 'titelText' }] },
  { name: 'knopf', title: 'Knopf-Beschriftung', type: 'string' },
] }

{ name: 'abschnittKriterien', title: 'Abschnitt Kriterien', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'kriterien', title: 'Kriterien', type: 'array', of: [{ type: 'kriterium' }] },
  { name: 'knopf', title: 'Knopf-Beschriftung', type: 'string' },
  { name: 'bilder', title: 'Bilder (genau 4)', type: 'array', of: [{ type: 'image', options: { hotspot: true } }], options: { layout: 'grid' } },
] }

{ name: 'abschnittVideothek', title: 'Abschnitt Videothek', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'reiter', title: 'Filter-Reiter', type: 'array', of: [{ type: 'string' }] },
  { name: 'autorBild', title: 'Foto des Autors', type: 'image', options: { hotspot: true } },
] }

{ name: 'abschnittRechner', title: 'Abschnitt Rechner', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über dem Zitat', type: 'string' },
  { name: 'zitat', title: 'Zitat', type: 'text', rows: 3 },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'rechner', title: 'Rechner', type: 'array', of: [{ type: 'rechnerKachel' }] },
  { name: 'bild', title: 'Video-Vorschaubild', type: 'image', options: { hotspot: true } },
  { name: 'videoLink', title: 'Video-Link (YouTube)', type: 'url' },
] }

{ name: 'projekteseite', title: 'Seite: Projekte', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'liste', title: 'II. Aktuelle Projekte', type: 'abschnittListe', options: { collapsible: true, collapsed: true } },
  { name: 'video', title: 'III. Video', type: 'abschnittVideo', options: { collapsible: true, collapsed: true } },
  { name: 'vorteile', title: 'IV. Ihre Vorteile', type: 'abschnittVorteile', options: { collapsible: true, collapsed: true } },
  { name: 'wissen', title: 'Wissen im Video', type: 'abschnittWissen', options: { collapsible: true, collapsed: true } },
  { name: 'fragen', title: 'V. Fragen & Antworten', type: 'abschnittFragen', options: { collapsible: true, collapsed: true } },
] }

{ name: 'referenzenseite', title: 'Seite: Referenzen', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'zeitstrahl', title: 'II. Zeitstrahl', type: 'abschnittZeitstrahl', options: { collapsible: true, collapsed: true } },
  { name: 'vorherNachher', title: 'Vorher/Nachher (gilt auch für Denkmalsuche)', type: 'abschnittVorherNachher', options: { collapsible: true, collapsed: true } },
] }

{ name: 'teamseite', title: 'Seite: Team', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'team', title: 'II. Unser Team', type: 'abschnittTeam', options: { collapsible: true, collapsed: true } },
  { name: 'leistungen', title: 'III. Leistungen', type: 'abschnittVorteile', options: { collapsible: true, collapsed: true } },
  { name: 'video', title: 'IV. Video', type: 'abschnittVideo', options: { collapsible: true, collapsed: true } },
] }

{ name: 'bautraegerseite', title: 'Seite: Für Bauträger', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'ablauf', title: 'II. So arbeiten wir', type: 'abschnittAblauf', options: { collapsible: true, collapsed: true } },
  { name: 'video', title: 'III. Video', type: 'abschnittVideo', options: { collapsible: true, collapsed: true } },
] }

{ name: 'denkmalsucheseite', title: 'Seite: Denkmalsuche', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'kriterien', title: 'III. Kriterien', type: 'abschnittKriterien', options: { collapsible: true, collapsed: true } },
  { name: 'video', title: 'IV. Video', type: 'abschnittVideo', options: { collapsible: true, collapsed: true } },
] }

{ name: 'erklaertseite', title: 'Seite: Denkmal & QNG erklärt', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'videothek', title: 'Videothek (Videos selbst unter „Mediathek-Video“)', type: 'abschnittVideothek', options: { collapsible: true, collapsed: true } },
  { name: 'stimmen', title: 'Kundenstimmen – Überschriften', type: 'abschnittStimmen', options: { collapsible: true, collapsed: true } },
] }

{ name: 'rechnerseite', title: 'Seite: Renditerechner', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'rechner', title: 'Rechner-Auswahl', type: 'abschnittRechner', options: { collapsible: true, collapsed: true } },
] }

{ name: 'navigation', title: 'Navigation (Menü & Footer)', type: 'document', fields: [
  { name: 'menue', title: 'Hauptmenü', type: 'array', of: [{ type: 'menuepunkt' }] },
  { name: 'footerNavigation', title: 'Footer – Spalte „Navigation“', type: 'array', of: [{ type: 'menuepunkt' }] },
  { name: 'footerMehr', title: 'Footer – Spalte „Mehr“', type: 'array', of: [{ type: 'menuepunkt' }] },
] }
