// Nur für die Vorschau auf GitHub Pages:
// 1) setzt den Unterordner (z. B. /deutsche-monumentum.github.io-website) vor alle internen Links,
// 2) sperrt die Vorschau für Suchmaschinen (noindex).
// Für die spätere echte Domain wird dieses Skript nicht benutzt.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const basis = (process.env.BASIS || '').replace(/\/$/, '');
if (!basis) { console.log('Kein BASIS gesetzt – nichts zu tun.'); process.exit(0); }

const dateien = [];
const lauf = (d) => readdirSync(d).forEach((n) => { const p = join(d, n); statSync(p).isDirectory() ? lauf(p) : dateien.push(p); });
lauf('dist');

let anzahl = 0;
for (const p of dateien) {
  if (!/\.(html|css|js)$/.test(p)) continue;
  let t = readFileSync(p, 'utf8');
  const alt = t;
  // Attribute in HTML: href="/…", src="/…", action="/…", poster="/…", content="/…"
  t = t.replace(/(\s(?:href|src|action|poster|srcset)=["'])\/(?!\/)/g, `$1${basis}/`);
  // CSS: url(/…)
  t = t.replace(/url\((["']?)\/(?!\/)/g, `url($1${basis}/`);
  if (p.endsWith('.html')) t = t.replace('<head>', '<head><meta name="robots" content="noindex, nofollow">');
  if (t !== alt) { writeFileSync(p, t); anzahl++; }
}
console.log(`Vorschau-Pfad ${basis} in ${anzahl} Dateien gesetzt.`);
