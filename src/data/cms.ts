// Inhalte aus Sanity (CMS) laden – beim Bauen der Website.
// Ist Sanity nicht erreichbar oder leer, werden die JSON-Dateien in diesem Ordner verwendet (Sicherheitsnetz).
// Die Daten werden in genau die Form gebracht, die die Seiten bisher aus den JSON-Dateien kennen.
import projekteJson from './projekte.json';
import detailsJson from './projekt-details.json';
import referenzenJson from './referenzen.json';
import mediathekJson from './mediathek.json';
import kundenstimmenJson from './kundenstimmen.json';
import landingpagesJson from './landingpages.json';
import startseiteJson from './seiten/startseite.json';
import aufrufJson from './seiten/aufruf.json';
import projekteseiteJson from './seiten/projekteseite.json';
import referenzenseiteJson from './seiten/referenzenseite.json';
import teamseiteJson from './seiten/teamseite.json';
import bautraegerseiteJson from './seiten/bautraegerseite.json';
import denkmalsucheseiteJson from './seiten/denkmalsucheseite.json';
import erklaertseiteJson from './seiten/erklaertseite.json';
import rechnerseiteJson from './seiten/rechnerseite.json';
import navigationJson from './seiten/navigation.json';

// Seiten-Texte: je Seite ein Eintrag in Sanity (feste ID) + JSON-Datei als Sicherheitsnetz
const SEITEN = { startseite: startseiteJson, aufruf: aufrufJson, projekteseite: projekteseiteJson, referenzenseite: referenzenseiteJson, teamseite: teamseiteJson,
  bautraegerseite: bautraegerseiteJson, denkmalsucheseite: denkmalsucheseiteJson,
  erklaertseite: erklaertseiteJson, rechnerseite: rechnerseiteJson, navigation: navigationJson };

const PROJEKT = 'kgw2l752';
const DATASET = 'production';

const QUERY = `{
  "projekte": *[_type == "projekt" && !(_id in path("drafts.**"))] | order(reihenfolge asc) {
    ..., "bild": bild.asset->url, "heroBild": heroBild.asset->url, "videoCover": videoCover.asset->url,
    "slider": slider[]{ text, "bild": bild.asset->url },
    "standortBilder": standortBilder[].asset->url
  },
  "referenzen": *[_type == "referenz" && !(_id in path("drafts.**"))] | order(reihenfolge asc) {
    ..., "heroBild": heroBild.asset->url,
    "galerie": galerie[]{ text, "bild": bild.asset->url },
    "bau": bau[]{ datum, "bilder": bilder[].asset->url }
  },
  "videos": *[_type == "video" && !(_id in path("drafts.**"))] | order(nummer asc) { ..., "coverbild": coverbild.asset->url },
  "einstellungen": *[_id == "einstellungen"][0],
  "seiten": *[_id in $seiten],
  "landingpages": *[_type == "landingpage" && !(_id in path("drafts.**"))]{ _id, _type, name, crmProjekt, kampagnenHeadline, kampagnenText, "slug": slug.current, "projekt": projekt->slug.current },
  "kundenstimmen": *[_type == "kundenstimme" && !(_id in path("drafts.**"))] | order(reihenfolge asc),
  "bilder": *[_type == "sanity.imageAsset"]{ _id, url },
  "dateien": *[_type == "sanity.fileAsset"]{ _id, url },
  "verweise": *[_type in ["projekt", "referenz", "video"] && !(_id in path("drafts.**"))]{ _id, "slug": slug.current }
}`;

async function laden(): Promise<any | null> {
  if (process.env.CMS === 'aus') return null;
  try {
    const res = await fetch(`https://${PROJEKT}.api.sanity.io/v2025-02-19/data/query/${DATASET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: QUERY, params: { seiten: Object.keys(SEITEN) }, perspective: 'published' }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = await res.json();
    if (!result?.projekte?.length) throw new Error('keine Projekte in Sanity');
    console.log(`[cms] Inhalte aus Sanity geladen (${result.projekte.length} Projekte, ${result.referenzen.length} Referenzen, ${result.videos.length} Videos)`);
    return result;
  } catch (e) {
    console.warn(`[cms] Sanity nicht verfügbar (${(e as Error).message}) – verwende JSON-Dateien.`);
    return null;
  }
}

const cms = await laden();

// Bild-URL von Sanity: automatisch modernes Format (WebP/AVIF)
const bild = (u?: string | null) => (u ? (u.includes('cdn.sanity.io') ? `${u}?auto=format` : u) : null);
const s = (v: any) => v ?? '';
const html = (bloecke: any[] | undefined) =>
  (bloecke || [])
    .map((b) => `<p>${(b.children || []).map((c: any) => esc(c.text || '')).join('')}</p>`)
    .join('');
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const paare = (l: any[] | undefined, a: string, b: string) => (l || []).map((x) => [s(x[a]), s(x[b])]);

export const projekte: typeof projekteJson = cms
  ? cms.projekte
      .filter((p: any) => !p.entwurf)
      .map((p: any) => ({
        slug: p.slug?.current, nummer: s(p.nummer), kategorie: s(p.kategorie), status: s(p.status),
        caption: s(p.caption), titel: s(p.titel), name: s(p.kachelName || p.name), einheiten: s(p.einheiten),
        flaechen: s(p.flaechen), preise: s(p.preise), afa: s(p.afa), kfw: s(p.kfw), standort: s(p.standort),
        bild: bild(p.bild) ?? '',
      }))
  : projekteJson;

export const projektDetails: typeof detailsJson = cms
  ? cms.projekte.map((p: any) => ({
      slug: p.slug?.current, entwurf: !!p.entwurf, name: s(p.name), standort: s(p.standort),
      heroBild: bild(p.heroBild) ?? '', heroHeadline: s(p.heroHeadline), heroSubline: s(p.heroSubline),
      fakten: paare(p.fakten, 'label', 'wert'),
      introHeadline: s(p.introHeadline), introText: html(p.introText),
      infoLabel: s(p.infoLabel), infoText: s(p.infoText),
      slider: (p.slider || []).map((x: any) => ({ bild: bild(x.bild) ?? '', text: s(x.text) })),
      videoZitat: s(p.videoZitat), videoLink: s(p.videoLink), videoCover: bild(p.videoCover),
      vorteileHeadline: s(p.vorteileHeadline), vorteileIntro: s(p.vorteileIntro), vorteile: paare(p.vorteile, 'titel', 'text'),
      standortHeadline: s(p.standortHeadline), standortText: s(p.standortText),
      standortBilder: (p.standortBilder || []).filter(Boolean).map((u: string) => bild(u)),
      beraterHeadline: s(p.beraterHeadline), beraterText: s(p.beraterText), berater: paare(p.berater, 'titel', 'text'),
    }))
  : detailsJson;

export const referenzen: typeof referenzenJson = cms
  ? cms.referenzen.map((r: any) => ({
      slug: r.slug?.current, name: s(r.name), heroHeadline: s(r.heroHeadline), heroSubline: s(r.heroSubline),
      heroBild: bild(r.heroBild) ?? '', fakten: paare(r.fakten, 'label', 'wert'),
      introHeadline: s(r.introHeadline), introText: html(r.introText),
      infoNummer: s(r.infoNummer), infoLabel: s(r.infoLabel), infoText: s(r.infoText),
      videoZitat: s(r.videoZitat), videoLink: s(r.videoLink), videoLabel: s(r.videoLabel), bauHeadline: s(r.bauHeadline),
      galerie: (r.galerie || []).map((x: any) => ({ bild: bild(x.bild) ?? '', text: s(x.text) })),
      bau: (r.bau || []).map((b: any) => ({ datum: s(b.datum), bilder: (b.bilder || []).filter(Boolean).map((u: string) => bild(u)) })),
    }))
  : referenzenJson;

export const mediathek: typeof mediathekJson = cms
  ? cms.videos.map((v: any) => ({
      nummer: s(v.nummer), slug: v.slug?.current, name: s(v.name), untertitel: s(v.untertitel), kurztext: s(v.kurztext),
      thema: s(v.thema), kategorie: s(v.kategorie), video: s(v.video), coverbild: bild(v.coverbild) ?? '',
      autor: s(v.autor), datum: s(v.datum), dauer: s(v.dauer),
    }))
  : mediathekJson;

export const einstellungen: { mobil?: string; festnetz?: string; email?: string; domain?: string; social?: { name: string; href: string }[] } | null =
  cms?.einstellungen ?? null;

// ---------- Seiten-Texte ----------
// Sanity-Bilder → Bild-URL, Sanity-Dateien (Videos) → Datei-URL, Verweise (z. B. auf ein Projekt) → dessen Adresse (slug)
const bildUrl = new Map<string, string>((cms?.bilder || []).map((b: any) => [b._id, b.url]));
const dateiUrl = new Map<string, string>((cms?.dateien || []).map((d: any) => [d._id, d.url]));
const slugVon = new Map<string, string>((cms?.verweise || []).map((v: any) => [v._id, v.slug]));
function aufloesen(wert: any): any {
  if (Array.isArray(wert)) return wert.map(aufloesen);
  if (wert && typeof wert === 'object') {
    if (wert._type === 'file' || wert.asset?._ref?.startsWith('file-')) return dateiUrl.get(wert.asset?._ref) ?? '';
    if (wert._type === 'image' || wert.asset?._ref) return bild(bildUrl.get(wert.asset?._ref)) ?? '';
    if (wert._type === 'reference') return slugVon.get(wert._ref) ?? '';
    const o: any = {};
    for (const [k, v] of Object.entries(wert)) if (!k.startsWith('_') || k === '_type') o[k] = aufloesen(v);
    return o;
  }
  return wert;
}

type Seiten = typeof SEITEN;
export function seite<K extends keyof Seiten>(id: K): Seiten[K] {
  const doc = cms?.seiten?.find((d: any) => d._id === id);
  return doc ? aufloesen(doc) : SEITEN[id];
}

export const kundenstimmen: typeof kundenstimmenJson = cms?.kundenstimmen?.length ? aufloesen(cms.kundenstimmen) : kundenstimmenJson;

// Projekt-Landingpages (Werbung): Projekt-Inhalt + eigene Überschrift/Text + CRM-Projektname
export const landingpages: typeof landingpagesJson = cms?.landingpages?.length
  ? cms.landingpages.map((l: any) => ({ ...l, kampagnenHeadline: l.kampagnenHeadline ?? '', kampagnenText: l.kampagnenText ?? '' }))
  : landingpagesJson;
