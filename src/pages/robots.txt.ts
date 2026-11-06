// robots.txt – erlaubt Suchmaschinen alles außer Test- und Dankeseite, verweist auf die Sitemap
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nDisallow: /werkstatt\nDisallow: /danke\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
