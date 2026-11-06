// Sitemap für Google – alle öffentlichen Seiten, ohne Test-, Danke- und Fehlerseite.
// Die Projekt-, Referenz- und Landingpage-Adressen kommen automatisch aus dem CMS.
import type { APIRoute } from 'astro';
import { projektDetails, referenzen, landingpages } from '../data/cms';
const feste = ['/', '/projekte', '/referenzen', '/team', '/bautrager', '/denkmalsuche', '/denkmal-und-qng-erklart',
  '/berechnungstool', '/berechnungstool/denkmal', '/berechnungstool/qng', '/impressum', '/datenschutzerklarung'];
export const GET: APIRoute = ({ site }) => {
  const pfade = [
    ...feste,
    ...projektDetails.filter((p) => !p.entwurf).map((p) => `/projekte-cms/${p.slug}`),
    ...referenzen.map((r) => `/referenzen-cms/${r.slug}`),
    ...landingpages.map((l) => `/projekt-landingpages/${l.slug}`),
  ];
  const heute = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pfade
    .map((p) => `  <url><loc>${new URL(p, site).href.replace(/\/$/, p === '/' ? '/' : '')}</loc><lastmod>${heute}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
