// Einmaliger Import: überträgt Projekte, Referenzen, Mediathek und Kontaktdaten
// aus src/data/*.json nach Sanity und lädt alle Bilder von Webflow in Sanity hoch.
// Läuft auf GitHub (Workflow "Inhalte nach Sanity importieren"), braucht SANITY_WRITE_TOKEN.
// Vorhandene Dokumente werden NICHT überschrieben (außer ERSETZEN=1).
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const PROJEKT = 'kgw2l752';
const DATASET = 'production';
const API = `https://${PROJEKT}.api.sanity.io/v2025-02-19`;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const ERSETZEN = process.env.ERSETZEN === '1';
if (!TOKEN) throw new Error('SANITY_WRITE_TOKEN fehlt (GitHub → Settings → Secrets → Actions).');

const lese = (f) => JSON.parse(readFileSync(new URL(`../src/data/${f}.json`, import.meta.url), 'utf8'));
const projekte = lese('projekte');
const details = lese('projekt-details');
const referenzen = lese('referenzen');
const mediathek = lese('mediathek');
const navi = readFileSync(new URL('../src/data/navigation.ts', import.meta.url), 'utf8');

// ---------- Bilder ----------
const cache = new Map();
async function ladeHoch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bild nicht ladbar (${res.status}): ${url}`);
  const daten = Buffer.from(await res.arrayBuffer());
  const name = decodeURIComponent(url.split('/').pop().split('?')[0]);
  const typ = res.headers.get('content-type') || 'application/octet-stream';
  for (let versuch = 1; ; versuch++) {
    const up = await fetch(`${API}/assets/images/${DATASET}?filename=${encodeURIComponent(name)}&sourceName=webflow&sourceId=${createHash('sha1').update(url).digest('hex')}&sourceUrl=${encodeURIComponent(url)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': typ },
      body: daten,
    });
    if (up.ok) return (await up.json()).document._id;
    if (versuch >= 4) throw new Error(`Upload fehlgeschlagen (${up.status}): ${url} – ${await up.text()}`);
    await new Promise((r) => setTimeout(r, 2000 * versuch));
  }
}
function bild(url) {
  if (!url) return undefined;
  if (!cache.has(url)) cache.set(url, null);
  return { __bild: url };
}

// Alle Bild-URLs sammeln, dann parallel (max. 6) hochladen
async function alleHochladen(urls) {
  const liste = [...urls];
  let fertig = 0;
  async function arbeiter() {
    while (liste.length) {
      const u = liste.shift();
      cache.set(u, await ladeHoch(u));
      if (++fertig % 25 === 0) console.log(`  ${fertig}/${urls.size} Bilder`);
    }
  }
  await Promise.all(Array.from({ length: 6 }, arbeiter));
}

// Platzhalter {__bild: url} → Sanity-Bild mit Asset-Referenz
let k = 0;
const key = () => (++k).toString(36).padStart(6, '0') + Math.random().toString(36).slice(2, 8);
function einsetzen(wert, inArray = false) {
  if (Array.isArray(wert)) return wert.map((x) => einsetzen(x, true));
  if (wert && typeof wert === 'object') {
    if (wert.__bild) {
      const o = { _type: 'image', asset: { _type: 'reference', _ref: cache.get(wert.__bild) } };
      if (inArray) o._key = key();
      return o;
    }
    const o = {};
    for (const [n, v] of Object.entries(wert)) if (v !== undefined && v !== null && v !== '') o[n] = einsetzen(v);
    if (inArray && !o._key) o._key = key();
    return o;
  }
  return wert;
}

// ---------- Text ----------
const entities = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
function htmlZuBloecken(html) {
  if (!html) return undefined;
  return html
    .split(/<\/p>/i)
    .map((p) => entities(p.replace(/<[^>]+>/g, '')).trim())
    .filter(Boolean)
    .map((text) => ({ _type: 'block', style: 'normal', markDefs: [], children: [{ _type: 'span', text, marks: [] }] }));
}
const fakten = (l) => (l || []).map(([label, wert]) => ({ _type: 'fakt', label, wert }));
const punkte = (l) => (l || []).map(([titel, text]) => ({ _type: 'titelText', titel, text }));
const slug = (s) => ({ _type: 'slug', current: s });

// ---------- Dokumente ----------
const docs = [];
const reihe = new Map(projekte.map((p, i) => [p.slug, i + 1]));
details.forEach((d, i) => {
  const c = projekte.find((p) => p.slug === d.slug) || {};
  docs.push({
    _id: `projekt-${d.slug}`, _type: 'projekt',
    name: d.name, slug: slug(d.slug), entwurf: !!d.entwurf,
    reihenfolge: reihe.get(d.slug) ?? 100 + i,
    nummer: c.nummer, kategorie: c.kategorie, status: c.status, titel: c.titel, caption: c.caption,
    kachelName: c.name, bild: bild(c.bild), einheiten: c.einheiten, flaechen: c.flaechen, preise: c.preise,
    afa: c.afa, kfw: c.kfw, standort: d.standort || c.standort,
    heroBild: bild(d.heroBild), heroHeadline: d.heroHeadline, heroSubline: d.heroSubline, fakten: fakten(d.fakten),
    introHeadline: d.introHeadline, introText: htmlZuBloecken(d.introText),
    infoLabel: d.infoLabel, infoText: d.infoText,
    slider: (d.slider || []).map((s) => ({ _type: 'bildMitText', bild: bild(s.bild), text: s.text })),
    videoZitat: d.videoZitat, videoLink: d.videoLink, videoCover: bild(d.videoCover),
    vorteileHeadline: d.vorteileHeadline, vorteileIntro: d.vorteileIntro, vorteile: punkte(d.vorteile),
    standortHeadline: d.standortHeadline, standortText: d.standortText, standortBilder: (d.standortBilder || []).map(bild),
    beraterHeadline: d.beraterHeadline, beraterText: d.beraterText, berater: punkte(d.berater),
  });
});
referenzen.forEach((r, i) => {
  docs.push({
    _id: `referenz-${r.slug}`, _type: 'referenz',
    name: r.name, slug: slug(r.slug), reihenfolge: i + 1,
    heroBild: bild(r.heroBild), heroHeadline: r.heroHeadline, heroSubline: r.heroSubline, fakten: fakten(r.fakten),
    introHeadline: r.introHeadline, introText: htmlZuBloecken(r.introText),
    infoNummer: r.infoNummer, infoLabel: r.infoLabel, infoText: r.infoText,
    videoZitat: r.videoZitat, videoLink: r.videoLink, videoLabel: r.videoLabel,
    galerie: (r.galerie || []).map((g) => ({ _type: 'bildMitText', bild: bild(g.bild), text: g.text })),
    bauHeadline: r.bauHeadline,
    bau: (r.bau || []).map((b) => ({ _type: 'bauphase', datum: b.datum, bilder: (b.bilder || []).map(bild) })),
  });
});
mediathek.forEach((v) => {
  docs.push({
    _id: `video-${v.slug}`, _type: 'video',
    name: v.name, slug: slug(v.slug), nummer: v.nummer, untertitel: v.untertitel, kurztext: v.kurztext,
    thema: v.thema, kategorie: v.kategorie, video: v.video, coverbild: bild(v.coverbild),
    autor: v.autor, datum: v.datum, dauer: v.dauer,
  });
});
const feld = (n) => (navi.match(new RegExp(`${n}: '([^']+)'`)) || [])[1];
docs.push({
  _id: 'einstellungen', _type: 'einstellungen',
  mobil: feld('mobil'), festnetz: feld('festnetz'), email: feld('email'), domain: feld('domain'),
  social: [...navi.matchAll(/\{ name: '([^']+)', href: '(https:[^']+)' \}/g)].map(([, name, href]) => ({ _type: 'profil', name, href })),
});

console.log(`${docs.length} Dokumente, ${cache.size} Bilder`);
await alleHochladen(new Set(cache.keys()));
console.log('Bilder fertig');

const fertig = docs.map((d) => einsetzen(d));
for (let i = 0; i < fertig.length; i += 10) {
  const teil = fertig.slice(i, i + 10);
  const res = await fetch(`${API}/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations: teil.map((d) => (ERSETZEN ? { createOrReplace: d } : { createIfNotExists: d })) }),
  });
  if (!res.ok) throw new Error(`Speichern fehlgeschlagen (${res.status}): ${await res.text()}`);
}
console.log('Dokumente gespeichert – fertig.');
