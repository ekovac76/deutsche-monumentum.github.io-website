// Lädt alle Bilder aus src/data/bilder.ts und src/data/projekte.json nach public/bilder/webflow
// und ersetzt die Webadressen durch lokale Pfade. Aufruf: npm run bilder
import fs from 'node:fs';
import path from 'node:path';
const ziel = 'public/bilder/webflow';
fs.mkdirSync(ziel, { recursive: true });
const dateien = ['src/data/bilder.ts', 'src/data/projekte.json'];
for (const datei of dateien) {
  let text = fs.readFileSync(datei, 'utf8');
  const urls = [...new Set(text.match(/https:\/\/[^'"\s]+/g) || [])];
  for (const url of urls) {
    const name = decodeURIComponent(url.split('/').pop()).normalize('NFC').replace(/[^\w.\-]+/g, '-');
    const pfad = path.join(ziel, name);
    if (!fs.existsSync(pfad)) {
      const r = await fetch(url);
      if (!r.ok) { console.log('Fehler', r.status, url); continue; }
      fs.writeFileSync(pfad, Buffer.from(await r.arrayBuffer()));
      console.log('geladen', name);
    }
    text = text.split(url).join('/bilder/webflow/' + name);
  }
  fs.writeFileSync(datei, text);
}
console.log('fertig');
