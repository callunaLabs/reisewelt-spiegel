# SPIEGEL Reisewelt — Projektdokumentation

## Architektur

```
WordPress (Headless CMS)              Astro (Frontend / SSR)
All-Inkl                               Replit
reisewelt-poc.calluna.ai               reisewelt-spiegel.replit.app
        │                                       │
        │  ◄── REST API ──────────────          │
        │                                       │
   /wp-admin                           SPIEGEL Partner Template
   Content pflegen                     (Header/Footer von spiegel.de)
```

- **Frontend:** Astro 6 mit Tailwind CSS v4, SSR (Server-Side Rendering via @astrojs/node)
- **Backend:** WordPress Headless auf All-Inkl (reisewelt-poc.calluna.ai)
- **Hosting FE:** Replit (reisewelt-spiegel.replit.app)
- **Repo:** github.com/callunaLabs/reisewelt-spiegel (private)
- **SPIEGEL Template:** Wird beim Rendern von spiegel.de/assets/partner/template-noads.html geladen

## Zugangsdaten

### WordPress
- URL: https://reisewelt-poc.calluna.ai/wp-admin
- User: reisewelt-admin
- Passwort: GTC0SrE2N2SCEyfGS8kSHMGX
- Hoster: All-Inkl

### GitHub
- Repo: callunaLabs/reisewelt-spiegel (private)
- CLI eingeloggt als: callunaLabs
- seovomspiegel ist Collaborator

### Replit
- URL: https://reisewelt-spiegel.replit.app
- Dev-URL: https://26a8eec4-aac1-4290-a7a4-b421a132dff4-00-12tlb8keavysa.spock.replit.dev
- Team: spiegel-gruppe

### Stitch (Google Design Tool)
- Projekt: "Homepage (Mobile)" — ID 15120787541132338741
- API-Key (Account u/3): AQ.Ab8RN6LCU77WB10fINJNU_rwTXkkqCQurEywMc8PXYkLeSCMJA
- Alle Design-Referenzen in /design-reference/

## WordPress Plugins (aktiv)

| Plugin | Zweck | Status |
|--------|-------|--------|
| advanced-custom-fields/acf.php | Flexible Felder | Aktiv |
| reisewelt-cpt.php | Custom Post Types + Meta Boxes | Aktiv |
| reisewelt-design-settings.php | Design-Einstellungen (/wp-admin → Reisewelt Design) | Aktiv |
| reisewelt-blocks/ | Gutenberg Blocks (11 Custom Blocks) | **DEAKTIVIERT** (verursacht Editor-Crash) |
| reisewelt-acf-fields.php | ACF Feldgruppen | **DEAKTIVIERT** (verursacht Editor-Crash) |
| seo-by-rank-math + Pro | SEO | Aktiv — **NIEMALS einzeln deaktivieren! Pro braucht Base.** |
| imagify | Bildkomprimierung | Aktiv |
| wp-rest-cache | REST API Cache | Aktiv (verdächtig für Editor-Bug) |
| safe-svg | SVG Upload erlauben | Aktiv |

## Custom Post Types

| Post Type | REST Endpoint | Anzahl | Partner |
|-----------|--------------|--------|---------|
| rundreise | /wp-json/wp/v2/rundreise | 6 | Marco Polo / Studiosus |
| genussreise | /wp-json/wp/v2/genussreise | 6 | Genussreisen GmbH |
| reisetrend | /wp-json/wp/v2/reisetrend | 2 | sparwelt.de |
| deal | /wp-json/wp/v2/deal | 0 | — |
| partner | /wp-json/wp/v2/partner | 3 | — |

### Meta-Felder (registriert via reisewelt-cpt.php)
- Reisen: preis, dauer, destination, partner, booking_url, highlights, kategorie
- Deals: preis, original_preis, rabatt, sterne, booking_url, gueltig_bis, destination
- Partner: website, telefon, email, kategorie, usps

## WordPress Seiten (für Kategorie-Pages)

| Seite | WP ID | Slug | Astro-Route |
|-------|-------|------|-------------|
| Startseite | 72 | startseite | / |
| Genussreisen | 73 | genussreisen-seite | /genussreisen |
| Rundreisen | 74 | rundreisen-seite | /rundreisen |
| Reisetrends | 75 | reisetrends-seite | /reisetrends |
| Über uns | 76 | ueber-uns-seite | /ueber-uns |

Die Astro-Seiten laden Hero-Daten (Bild, Titel, Untertitel) aus diesen WP-Seiten via `getPageBySlug()`. Der Hero-Block speichert seine Daten als `data-image`, `data-title`, `data-subtitle` Attribute im gerenderten HTML.

## Astro Seitenstruktur

```
src/pages/
├── index.astro                    ← Homepage (Hero + Featured Trips + Kategorien + FAQ)
├── 404.astro                      ← 404-Seite
├── suche.astro                    ← Suchseite
├── ueber-uns.astro                ← Über uns
├── rundreisen/
│   ├── index.astro                ← Rundreisen-Listing (6 Trips)
│   └── [slug].astro               ← Rundreise-Detail
├── genussreisen/
│   ├── index.astro                ← Genussreisen-Listing (6 Trips)
│   └── [slug].astro               ← Genussreise-Detail
└── reisetrends/
    ├── index.astro                ← Reisetrends-Listing (2 Artikel)
    └── [slug].astro               ← Reisetrend-Detail
```

## Komponenten

```
src/components/
├── Header.astro          ← Partner-Nav (Anzeige | Startseite, Rundreisen...)
├── Footer.astro          ← Footer (simple + full Variante)
├── MobileNav.astro       ← Bottom-Nav für Mobile (SVG Icons)
├── Breadcrumbs.astro     ← Breadcrumb-Navigation
└── BlockRenderer.astro   ← Rendert Gutenberg Blocks im Frontend
```

## Design System

### Farben (aus reisewelt.spiegel.de)
- Primary (Text): #2f2d2b
- Secondary (Akzent/CTA): #E64415
- Surface: #ffffff
- Surface Container: #f1efed
- Text: #2f2d2b
- Text Secondary: #807e7c

### Fonts (SPIEGEL-eigene, lokal in /public/fonts/)
- **Headlines:** SpiegelSlab4UICd (ExtraBold)
- **Body:** SpiegelSerifTextUI (Regular, Bold, Italic, BoldItalic)
- **Display:** SpiegelSerifDisplayUI (BoldItalic)
- **Labels/UI:** SpiegelSans4UI (Regular, Bold)
- **Fallbacks:** Inter (Headlines), Newsreader (Body)

### Icons
- **KEINE Material Symbols** — SPIEGEL CSS überschreibt die Font-Einbindung
- Alle Icons als **inline SVG** oder **HTML Entities** (→ ↗ ▼ ★ ☎ ✉)

### CSS Isolation
- SPIEGEL Template CSS bleibt komplett (für Header/Footer)
- Unser Content in `.reisewelt-content` Container
- Breakout via `width:100vw; margin-left:-50vw`
- Font-Overrides mit `!important` auf `.reisewelt-content`
- Viele Styles inline (`style=""`) um SPIEGEL CSS Konflikte zu umgehen

## SPIEGEL Partner Template

Das Layout fetcht beim Rendern das Template von:
`https://www.spiegel.de/assets/partner/template-noads.html`

Platzhalter: `###TITLE###`, `###DESCRIPTION###`, `###CANONICAL_URL###`, `###MAIN###`

Unser Content wird in `###MAIN###` eingefügt. Das Template liefert:
- SPIEGEL Global Header (DER SPIEGEL Logo, Navi, Abo-Links)
- SPIEGEL Global Footer
- SPIEGEL Fonts, Scripts, Meta

Kann via ENV `ENABLE_SPIEGEL_TEMPLATE=false` deaktiviert werden (Standalone-Modus).

## Bekannte Probleme

### 1. WordPress Gutenberg Editor crasht beim Speichern
- **Fehler:** `TypeError: e is not iterable` in block-editor.min.js
- **Wann:** Beim Speichern jeder Seite/Post
- **Verdächtige:** wp-rest-cache Plugin (liefert gecachte Antworten mit fehlenden Feldern) oder Rank Math (lädt 22+ JS-Dateien)
- **Workaround:** Content über REST API statt Editor bearbeiten
- **WICHTIG:** Rank Math + Rank Math Pro IMMER ZUSAMMEN de-/aktivieren! Sonst 500 Error.

### 2. Gutenberg Custom Blocks Plugin deaktiviert
- **Grund:** Array-Attribute in Block-Definitionen crashen WordPress block-editor.min.js
- **Fix nötig:** Alle Blocks verwenden bereits JSON-Strings statt Arrays, aber der Fehler kommt von woanders (vermutlich wp-rest-cache)
- **Status:** Plugin liegt bereit, muss nach Editor-Fix reaktiviert werden

### 3. Detail-Seiten Template
- Alle Detail-Seiten ([slug].astro) nutzen noch teilweise hardcoded Fallback-Daten
- WordPress-Content wird geladen, aber Fallback springt ein bei API-Fehler
- Einige Preise zeigen "ab ab X € €" (doppelt) — muss gefixt werden

## Replit Deployment

```bash
# Update auf Replit:
git fetch origin && git reset --hard origin/main && npm install && npm run start

# Dev-Modus:
npm run dev

# SSR Build:
npm run build && node dist/server/entry.mjs
```

### .replit Config
- Run: `npm run dev`
- Port: 4321 → External 80
- ENV: Keine speziellen ENV Vars nötig (WP URL ist hardcoded in wordpress.ts)

## Partner-Struktur (von reisewelt.spiegel.de)

| Navipunkt | Partner | Trips | Preisrange |
|-----------|---------|-------|------------|
| Rundreisen | Marco Polo / Studiosus (sgr-tours.de) | 6 | 1.195–2.495 € |
| Genussreisen | Genussreisen GmbH (genussreisen.de) | 6 | 1.689–3.589 € |
| Reisetrends | sparwelt.de / Checkout Charlie | 2 Artikel | Affiliate-Links |

## Scrape-Daten

- Vollständiger Scrape: /tmp/reisewelt-full-scrape.json (595 KB, 22 Seiten)
- Bild-URL-Mapping: /tmp/image-url-mapping.json
- Design-Referenz: /design-reference/ (HTML + Screenshots aller Stitch-Screens)

## WordPress Plugin-Dateien (im Repo)

```
wordpress-plugin/
├── reisewelt-cpt.php                    ← Custom Post Types + Meta Boxes
├── reisewelt-acf-fields.php             ← ACF Feldgruppen (DEAKTIVIERT)
├── reisewelt-design-settings.php        ← Design-Einstellungen
├── reisewelt-blocks/                    ← Gutenberg Blocks (DEAKTIVIERT)
│   ├── reisewelt-blocks.php
│   ├── blocks-editor.js
│   └── blocks-editor.css
└── emergency-recovery/                  ← Notfall-Recovery Scripts
    ├── reactivate-rankmath.php
    └── fix-reisewelt-plugins.php
```

## Nächste Schritte

1. WordPress Editor-Bug fixen (wp-rest-cache deaktivieren und testen)
2. Gutenberg Blocks reaktivieren
3. Detail-Seiten Template vereinheitlichen (ein Template für alle Reisetypen)
4. Bento Grid Block auf der Startseite einbauen
5. Design-Settings API ins Astro-Frontend einbinden
6. Preis-Anzeige fixen (doppeltes "ab" / "€")
7. Alle Bilder hochauflösend (eigene statt reisewelt.spiegel.de URLs)
