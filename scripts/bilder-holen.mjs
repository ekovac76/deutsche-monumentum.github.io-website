// Lädt alle Bilder, die der Code noch direkt von Webflow holt, nach public/bilder/webflow
// und ersetzt die Webadressen durch lokale Pfade.
// Läuft auf GitHub (Workflow „Bilder von Webflow übernehmen“), weil nur dort Webflow erreichbar ist.
// Die JSON-Dateien in src/data sind nur das Sicherheitsnetz (die echten Inhalte kommen aus Sanity) und bleiben unverändert.
import fs from 'node:fs';
import path from 'node:path';
const ziel = 'public/bilder/webflow';
fs.mkdirSync(ziel, { recursive: true });
const MUSTER = /https:\/\/(?:s3\.amazonaws\.com\/webflow-prod-assets|[a-z0-9.-]+\.website-files\.com)\/[^'"`\s]+/g;
function alleDateien(ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(ordner, e.name);
    return e.isDirectory() ? alleDateien(p) : /\.(astro|ts|css|mjs)$/.test(e.name) ? [p] : [];
  });
}
let geladen = 0, fehler = 0;
for (const datei of alleDateien('src')) {
  let text = fs.readFileSync(datei, 'utf8');
  const urls = [...new Set(text.match(MUSTER) || [])];
  if (!urls.length) continue;
  for (const url of urls) {
    const name = decodeURIComponent(url.split('/').pop()).normalize('NFC').replace(/[^\w.\-]+/g, '-');
    const pfad = path.join(ziel, name);
    if (!fs.existsSync(pfad)) {
      const r = await fetch(url);
      if (!r.ok) { console.log('FEHLER', r.status, url); fehler++; continue; }
      fs.writeFileSync(pfad, Buffer.from(await r.arrayBuffer()));
      geladen++;
    }
    text = text.split(url).join('/bilder/webflow/' + name);
  }
  fs.writeFileSync(datei, text);
  console.log(datei, urls.length, 'Adressen umgestellt');
}
console.log(`fertig: ${geladen} Dateien geladen, ${fehler} Fehler`);
if (fehler) process.exit(1);
