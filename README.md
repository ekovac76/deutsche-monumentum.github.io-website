# Website – Deutsche Monumentum

Neue Website, nachgebaut aus Webflow mit [Astro](https://astro.build).

- `src/pages` – die Seiten (Adressen wie bisher in Webflow)
- `src/components` – feste Bausteine (Navigation, Footer, Buttons …)
- `src/styles/tokens.css` – Farben, Abstände, Schriften aus dem Designsystem
- `public` – Bilder und Schriftdateien

Jede Änderung auf `main` wird automatisch gebaut und als Vorschau auf GitHub Pages veröffentlicht (`.github/workflows/vorschau.yml`). Die Vorschau ist für Suchmaschinen gesperrt.
