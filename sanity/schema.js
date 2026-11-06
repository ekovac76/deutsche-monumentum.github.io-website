// Sanity-Schema (Inhaltsmodell) der Website.
// Wird über Claude/Sanity-MCP als "MCP-managed schema" deployt – diese Datei ist die Referenz.

{
  name: 'fakt',
  title: 'Fakt',
  type: 'object',
  fields: [
    { name: 'label', title: 'Bezeichnung', type: 'string' },
    { name: 'wert', title: 'Wert', type: 'string' },
  ],
}

{
  name: 'titelText',
  title: 'Punkt',
  type: 'object',
  fields: [
    { name: 'titel', title: 'Titel', type: 'string' },
    { name: 'text', title: 'Text', type: 'text', rows: 3 },
  ],
}

{
  name: 'bildMitText',
  title: 'Bild mit Text',
  type: 'object',
  fields: [
    { name: 'bild', title: 'Bild', type: 'image', options: { hotspot: true } },
    { name: 'text', title: 'Bildunterschrift', type: 'string' },
  ],
}

{
  name: 'bauphase',
  title: 'Bauphase',
  type: 'object',
  fields: [
    { name: 'datum', title: 'Datum / Bezeichnung', type: 'string' },
    { name: 'bilder', title: 'Bilder', type: 'array', of: [{ type: 'image', options: { hotspot: true } }], options: { layout: 'grid' } },
  ],
}

{
  name: 'projekt',
  title: 'Projekt',
  type: 'document',
  groups: [
    { name: 'kachel', title: 'Kachel (Übersicht)', default: true },
    { name: 'kopf', title: 'Kopfbereich' },
    { name: 'inhalt', title: 'Inhalte' },
    { name: 'standort', title: 'Standort' },
    { name: 'berater', title: 'Berater' },
  ],
  fields: [
    { name: 'name', title: 'Projektname', type: 'string', group: 'kachel', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Adresse (URL)', type: 'slug', group: 'kachel', options: { source: 'name' }, validation: (Rule) => Rule.required() },
    { name: 'entwurf', title: 'Entwurf (nicht auf der Website zeigen)', type: 'boolean', group: 'kachel', initialValue: false },
    { name: 'reihenfolge', title: 'Reihenfolge', type: 'number', group: 'kachel' },
    { name: 'nummer', title: 'Nummer auf der Kachel (z. B. 01 / 08)', type: 'string', group: 'kachel' },
    { name: 'kategorie', title: 'Kategorie', type: 'string', group: 'kachel', options: { list: ['Denkmal', 'QNG Neubau'] } },
    { name: 'status', title: 'Status', type: 'string', group: 'kachel', options: { list: ['Verfügbar', 'Reserviert', 'Verkauft'] } },
    { name: 'titel', title: 'Titel der Kachel', type: 'string', group: 'kachel' },
    { name: 'caption', title: 'Unterzeile der Kachel', type: 'string', group: 'kachel' },
    { name: 'kachelName', title: 'Name auf der Kachel', type: 'string', group: 'kachel' },
    { name: 'bild', title: 'Kachelbild', type: 'image', group: 'kachel', options: { hotspot: true } },
    { name: 'kachelVideo', title: 'Kachel-Video (MP4, 10:7, läuft beim Darüberfahren)', type: 'file', group: 'kachel', options: { accept: 'video/mp4' } },
    { name: 'kachelStandbild', title: 'Kachel-Standbild (erstes Bild des Kachel-Videos)', type: 'image', group: 'kachel' },
    { name: 'einheiten', title: 'Einheiten', type: 'string', group: 'kachel' },
    { name: 'flaechen', title: 'Flächen', type: 'string', group: 'kachel' },
    { name: 'preise', title: 'Preise', type: 'string', group: 'kachel' },
    { name: 'afa', title: 'AfA', type: 'string', group: 'kachel' },
    { name: 'kfw', title: 'KfW', type: 'string', group: 'kachel' },
    { name: 'standort', title: 'Standort (Stadt)', type: 'string', group: 'kachel' },

    { name: 'heroBild', title: 'Titelbild', type: 'image', group: 'kopf', options: { hotspot: true } },
    { name: 'heroVideoDesktop', title: 'Titelvideo Desktop (MP4, 16:9) – ersetzt das Titelbild', type: 'file', group: 'kopf', options: { accept: 'video/mp4' } },
    { name: 'heroVideoHandy', title: 'Titelvideo Handy (MP4, Hochformat 4:5)', type: 'file', group: 'kopf', options: { accept: 'video/mp4' } },
    { name: 'heroStandbild', title: 'Titelvideo-Standbild (erscheint, bis das Video läuft)', type: 'image', group: 'kopf' },
    { name: 'heroHeadline', title: 'Überschrift', type: 'text', rows: 2, group: 'kopf' },
    { name: 'heroSubline', title: 'Unterzeile', type: 'text', rows: 3, group: 'kopf' },
    { name: 'fakten', title: 'Fakten', type: 'array', group: 'kopf', of: [{ type: 'fakt' }] },

    { name: 'introHeadline', title: 'Einleitung – Überschrift', type: 'text', rows: 2, group: 'inhalt' },
    { name: 'introText', title: 'Einleitung – Text', type: 'array', group: 'inhalt', of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }] },
    { name: 'infoLabel', title: 'Hinweis – Bezeichnung', type: 'string', group: 'inhalt' },
    { name: 'infoText', title: 'Hinweis – Text', type: 'text', rows: 3, group: 'inhalt' },
    { name: 'slider', title: 'Bilder-Slider', type: 'array', group: 'inhalt', of: [{ type: 'bildMitText' }] },
    { name: 'videoZitat', title: 'Video – Zitat', type: 'text', rows: 3, group: 'inhalt' },
    { name: 'videoLink', title: 'Video – Link (YouTube)', type: 'url', group: 'inhalt' },
    { name: 'videoCover', title: 'Video – Vorschaubild', type: 'image', group: 'inhalt', options: { hotspot: true } },
    { name: 'vorteileHeadline', title: 'Vorteile – Überschrift', type: 'text', rows: 2, group: 'inhalt' },
    { name: 'vorteileIntro', title: 'Vorteile – Einleitung', type: 'text', rows: 3, group: 'inhalt' },
    { name: 'vorteile', title: 'Vorteile', type: 'array', group: 'inhalt', of: [{ type: 'titelText' }] },

    { name: 'standortHeadline', title: 'Standort – Überschrift', type: 'text', rows: 2, group: 'standort' },
    { name: 'standortText', title: 'Standort – Text', type: 'text', rows: 5, group: 'standort' },
    { name: 'standortBilder', title: 'Standort – Bilder', type: 'array', group: 'standort', of: [{ type: 'image', options: { hotspot: true } }], options: { layout: 'grid' } },

    { name: 'beraterHeadline', title: 'Berater – Überschrift', type: 'text', rows: 2, group: 'berater' },
    { name: 'beraterText', title: 'Berater – Text', type: 'text', rows: 3, group: 'berater' },
    { name: 'berater', title: 'Berater', type: 'array', group: 'berater', of: [{ type: 'titelText' }] },
  ],
  orderings: [{ title: 'Reihenfolge', name: 'reihenfolge', by: [{ field: 'reihenfolge', direction: 'asc' }] }],
}

{
  name: 'referenz',
  title: 'Referenz',
  type: 'document',
  groups: [
    { name: 'kopf', title: 'Kopfbereich', default: true },
    { name: 'inhalt', title: 'Inhalte' },
    { name: 'bilder', title: 'Galerie & Baufortschritt' },
  ],
  fields: [
    { name: 'name', title: 'Name', type: 'string', group: 'kopf', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Adresse (URL)', type: 'slug', group: 'kopf', options: { source: 'name' }, validation: (Rule) => Rule.required() },
    { name: 'reihenfolge', title: 'Reihenfolge', type: 'number', group: 'kopf' },
    { name: 'heroBild', title: 'Titelbild', type: 'image', group: 'kopf', options: { hotspot: true } },
    { name: 'heroVideoDesktop', title: 'Titelvideo Desktop (MP4, 16:9) – ersetzt das Titelbild', type: 'file', group: 'kopf', options: { accept: 'video/mp4' } },
    { name: 'heroVideoHandy', title: 'Titelvideo Handy (MP4, Hochformat 4:5)', type: 'file', group: 'kopf', options: { accept: 'video/mp4' } },
    { name: 'heroStandbild', title: 'Titelvideo-Standbild (erscheint, bis das Video läuft)', type: 'image', group: 'kopf' },
    { name: 'heroHeadline', title: 'Überschrift', type: 'text', rows: 2, group: 'kopf' },
    { name: 'heroSubline', title: 'Unterzeile', type: 'text', rows: 3, group: 'kopf' },
    { name: 'fakten', title: 'Fakten', type: 'array', group: 'kopf', of: [{ type: 'fakt' }] },

    { name: 'introHeadline', title: 'Einleitung – Überschrift', type: 'text', rows: 2, group: 'inhalt' },
    { name: 'introText', title: 'Einleitung – Text', type: 'array', group: 'inhalt', of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }] },
    { name: 'infoNummer', title: 'Hinweis – Nummer', type: 'string', group: 'inhalt' },
    { name: 'infoLabel', title: 'Hinweis – Bezeichnung', type: 'string', group: 'inhalt' },
    { name: 'infoText', title: 'Hinweis – Text', type: 'text', rows: 3, group: 'inhalt' },
    { name: 'videoZitat', title: 'Video – Zitat', type: 'text', rows: 3, group: 'inhalt' },
    { name: 'videoLink', title: 'Video – Link (YouTube)', type: 'url', group: 'inhalt' },
    { name: 'videoLabel', title: 'Video – Bezeichnung', type: 'string', group: 'inhalt' },

    { name: 'galerie', title: 'Galerie (Slider)', type: 'array', group: 'bilder', of: [{ type: 'bildMitText' }] },
    { name: 'bauHeadline', title: 'Baufortschritt – Überschrift', type: 'text', rows: 2, group: 'bilder' },
    { name: 'bau', title: 'Baufortschritt', type: 'array', group: 'bilder', of: [{ type: 'bauphase' }] },
  ],
  orderings: [{ title: 'Reihenfolge', name: 'reihenfolge', by: [{ field: 'reihenfolge', direction: 'asc' }] }],
}

{
  name: 'video',
  title: 'Mediathek-Video',
  type: 'document',
  fields: [
    { name: 'name', title: 'Titel', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Adresse (URL)', type: 'slug', options: { source: 'name' }, validation: (Rule) => Rule.required() },
    { name: 'nummer', title: 'Nummer (z. B. 01)', type: 'string' },
    { name: 'untertitel', title: 'Untertitel', type: 'string' },
    { name: 'kurztext', title: 'Kurztext', type: 'text', rows: 3 },
    { name: 'thema', title: 'Thema', type: 'string', options: { list: ['Denkmal', 'QNG'] } },
    { name: 'kategorie', title: 'Kategorie', type: 'string', options: { list: ['Allgemeines', 'Finanzierung', 'Risiken', 'Kaufablauf'] } },
    { name: 'video', title: 'Video-Link (YouTube)', type: 'url' },
    { name: 'coverbild', title: 'Vorschaubild', type: 'image', options: { hotspot: true } },
    { name: 'autor', title: 'Autor', type: 'string' },
    { name: 'datum', title: 'Datum', type: 'date' },
    { name: 'dauer', title: 'Dauer', type: 'string' },
  ],
  orderings: [{ title: 'Nummer', name: 'nummer', by: [{ field: 'nummer', direction: 'asc' }] }],
}

{
  name: 'einstellungen',
  title: 'Kontakt & Social Media',
  type: 'document',
  fields: [
    { name: 'mobil', title: 'Mobil', type: 'string' },
    { name: 'festnetz', title: 'Festnetz', type: 'string' },
    { name: 'email', title: 'E-Mail', type: 'string' },
    { name: 'domain', title: 'Domain', type: 'string' },
    {
      name: 'social',
      title: 'Social-Media-Profile',
      type: 'array',
      of: [{ type: 'object', name: 'profil', fields: [{ name: 'name', title: 'Name', type: 'string' }, { name: 'href', title: 'Adresse', type: 'url' }] }],
    },
  ],
}
