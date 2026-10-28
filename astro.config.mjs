import { defineConfig } from 'astro/config';

// Adressen wie auf der Webflow-Seite (ohne Schrägstrich am Ende)
export default defineConfig({
  site: 'https://deutsche-monumentum.de',
  trailingSlash: 'never',
  build: { format: 'file' },
});
