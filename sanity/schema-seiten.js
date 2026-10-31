// Sanity-Schema Teil 2: Seiten-Texte (Startseite usw.), Kundenstimmen, Kontakt-Aufruf.
// Wird über Claude/Sanity-MCP deployt – diese Datei ist die Referenz.

{ name: 'knopf', title: 'Knopf', type: 'object', fields: [
  { name: 'text', title: 'Beschriftung', type: 'string' },
  { name: 'link', title: 'Ziel (z. B. /team)', type: 'string' },
] }

{ name: 'kennzahl', title: 'Kennzahl', type: 'object', fields: [
  { name: 'zahl', title: 'Zahl', type: 'string' },
  { name: 'titel', title: 'Titel', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
] }

{ name: 'referenzkachel', title: 'Referenz-Kachel', type: 'object', fields: [
  { name: 'jahr', title: 'Jahr', type: 'string' },
  { name: 'titel', title: 'Titel', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'bild', title: 'Bild', type: 'image', options: { hotspot: true } },
  { name: 'zeile', title: 'Zeile auf dem Bild', type: 'string' },
  { name: 'link', title: 'Ziel (z. B. /referenzen-cms/rastatt)', type: 'string' },
] }

{ name: 'interview', title: 'Interview', type: 'object', fields: [
  { name: 'bild', title: 'Vorschaubild', type: 'image', options: { hotspot: true } },
  { name: 'zitat', title: 'Zitat', type: 'text', rows: 3 },
  { name: 'name', title: 'Name', type: 'string' },
  { name: 'rolle', title: 'Beruf', type: 'string' },
  { name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } },
] }

{ name: 'frage', title: 'Frage', type: 'object', fields: [
  { name: 'frage', title: 'Frage', type: 'string' },
  { name: 'antwort', title: 'Antwort', type: 'text', rows: 4 },
] }

{ name: 'abschnittHero', title: 'Kopfbereich', type: 'object', fields: [
  { name: 'bild', title: 'Bild', type: 'image', options: { hotspot: true } },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'knopf', title: 'Knopf-Beschriftung', type: 'string' },
] }

{ name: 'abschnittLaufband', title: 'Laufband', type: 'object', fields: [
  { name: 'text', title: 'Text', type: 'string' },
  { name: 'link', title: 'Ziel', type: 'url' },
] }

{ name: 'abschnittZahlen', title: 'Abschnitt mit Kennzahlen', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'knopf', title: 'Knopf', type: 'knopf' },
  { name: 'kacheln', title: 'Kennzahlen', type: 'array', of: [{ type: 'kennzahl' }] },
] }

{ name: 'abschnittLeistungen', title: 'Abschnitt mit Leistungen', type: 'object', fields: [
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'knopf', title: 'Knopf 1', type: 'knopf' },
  { name: 'knopf2', title: 'Knopf 2', type: 'knopf' },
  { name: 'kacheln', title: 'Leistungen', type: 'array', of: [{ type: 'titelText' }] },
] }

{ name: 'abschnittProjekte', title: 'Abschnitt Projekte', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'hinweisTitel', title: 'Hinweis rechts – Titel', type: 'string' },
  { name: 'hinweisText', title: 'Hinweis rechts – Text', type: 'text', rows: 3 },
] }

{ name: 'abschnittVideo', title: 'Abschnitt Erklärvideo', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über dem Zitat', type: 'string' },
  { name: 'zitat', title: 'Zitat', type: 'text', rows: 3 },
  { name: 'bild', title: 'Vorschaubild', type: 'image', options: { hotspot: true } },
  { name: 'videoLink', title: 'Video-Link (YouTube)', type: 'url' },
] }

{ name: 'abschnittReferenzen', title: 'Abschnitt Referenzen', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'hinweisTitel', title: 'Hinweis rechts – Titel', type: 'string' },
  { name: 'hinweisText', title: 'Hinweis rechts – Text', type: 'text', rows: 3 },
  { name: 'kacheln', title: 'Referenz-Kacheln', type: 'array', of: [{ type: 'referenzkachel' }] },
] }

{ name: 'abschnittInterviews', title: 'Abschnitt Interviews', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'hinweisText', title: 'Hinweis rechts', type: 'text', rows: 3 },
  { name: 'karten', title: 'Interviews', type: 'array', of: [{ type: 'interview' }] },
] }

{ name: 'abschnittStimmen', title: 'Abschnitt Kundenstimmen', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 4 },
  { name: 'hinweisTitel', title: 'Hinweis rechts – Titel', type: 'string' },
  { name: 'hinweisText', title: 'Hinweis rechts – Text', type: 'text', rows: 3 },
] }

{ name: 'abschnittFragen', title: 'Abschnitt Fragen & Antworten', type: 'object', fields: [
  { name: 'thema', title: 'Kapitel-Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über der Überschrift', type: 'string' },
  { name: 'ueberschrift', title: 'Überschrift', type: 'text', rows: 2 },
  { name: 'text', title: 'Text', type: 'text', rows: 3 },
  { name: 'hinweisText', title: 'Hinweis rechts', type: 'text', rows: 3 },
  { name: 'fragen', title: 'Fragen', type: 'array', of: [{ type: 'frage' }] },
  { name: 'nachfrageTitel', title: '„Noch Fragen offen?“ – Überschrift', type: 'string' },
  { name: 'nachfrageText', title: '„Noch Fragen offen?“ – Text', type: 'text', rows: 3 },
] }

{ name: 'startseite', title: 'Seite: Startseite', type: 'document', fields: [
  { name: 'seoTitel', title: 'Titel bei Google (Browser-Tab)', type: 'string' },
  { name: 'seoBeschreibung', title: 'Beschreibung bei Google', type: 'text', rows: 3 },
  { name: 'hero', title: 'I. Kopfbereich', type: 'abschnittHero', options: { collapsible: true, collapsed: true } },
  { name: 'laufband', title: 'Laufband „Das sagen unsere Kunden“', type: 'abschnittLaufband', options: { collapsible: true, collapsed: true } },
  { name: 'zahlen', title: 'II. Über uns / In Zahlen', type: 'abschnittZahlen', options: { collapsible: true, collapsed: true } },
  { name: 'leistungen', title: 'Leistungen', type: 'abschnittLeistungen', options: { collapsible: true, collapsed: true } },
  { name: 'projekte', title: 'III. Projekte', type: 'abschnittProjekte', options: { collapsible: true, collapsed: true } },
  { name: 'video', title: 'IV. Erklärvideo', type: 'abschnittVideo', options: { collapsible: true, collapsed: true } },
  { name: 'referenzen', title: 'V. Referenzen', type: 'abschnittReferenzen', options: { collapsible: true, collapsed: true } },
  { name: 'interviews', title: 'VI. Interviews', type: 'abschnittInterviews', options: { collapsible: true, collapsed: true } },
  { name: 'stimmen', title: 'VII. Kundenstimmen (Texte gelten auch für Team-Seite)', type: 'abschnittStimmen', options: { collapsible: true, collapsed: true } },
  { name: 'fragen', title: 'IX. Fragen & Antworten', type: 'abschnittFragen', options: { collapsible: true, collapsed: true } },
] }

{ name: 'aufruf', title: 'Kontakt-Aufruf (auf allen Seiten)', type: 'document', fields: [
  { name: 'thema', title: 'Zeile oben', type: 'string' },
  { name: 'tagline', title: 'Kleine Zeile über dem Zitat', type: 'string' },
  { name: 'zitat', title: 'Zitat', type: 'text', rows: 3 },
  { name: 'knopf', title: 'Knopf-Beschriftung', type: 'string' },
  { name: 'unterzeile', title: 'Zeile unten links', type: 'string' },
  { name: 'projekt', title: 'Gezeigtes Projekt', type: 'reference', to: [{ type: 'projekt' }] },
  { name: 'kartenbild', title: 'Bild auf der Projektkarte', type: 'image', options: { hotspot: true } },
  { name: 'kartenNummer', title: 'Nummer auf der Projektkarte', type: 'string' },
] }

{ name: 'kundenstimme', title: 'Kundenstimme', type: 'document', fields: [
  { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
  { name: 'rolle', title: 'Beruf', type: 'string' },
  { name: 'titel', title: 'Überschrift', type: 'string' },
  { name: 'text', title: 'Text', type: 'text', rows: 6 },
  { name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } },
  { name: 'reihenfolge', title: 'Reihenfolge', type: 'number' },
], orderings: [{ title: 'Reihenfolge', name: 'reihenfolge', by: [{ field: 'reihenfolge', direction: 'asc' }] }] }
