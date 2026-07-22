# Qline Roleplay — Wetgeving

De centrale plek voor het Wetboek en de APV van Qline Roleplay, gebouwd met
[Next.js](https://nextjs.org) en [Fumadocs](https://fumadocs.dev), en
gepubliceerd via GitHub Pages.

## Ontwikkelen

```bash
npm install
npm run dev
```

Open http://localhost:3000 om het resultaat te bekijken.

## Structuur

- `data/` — canonieke JSON-brondata: `boetetabel.json` (boetes),
  `wetboek.json` (cel-/taakstraffen per wet) en `kosten.json` (diensttarieven
  + belastingtarieven). Dit is de bron van waarheid — bewerk deze bestanden,
  niet de gegenereerde tabellen op de site.
- `schema/` — een JSON Schema per databestand
  (`boetetabel.schema.json`, `wetboek.schema.json`, `kosten.schema.json`).
  Draai `npm run validate:data` om alle databestanden hiertegen te
  controleren; elke PR die `data/` of `schema/` raakt, doet dit ook
  automatisch via `.github/workflows/validate-data.yml`.
- `src/lib/boetes-data.ts`, `wetboek-data.ts`, `kosten-data.ts` — dunne
  laag die de JSON uit `data/` typeert en formatteert voor de componenten
  (`<BoeteTable />`, `<WetTable wet="..." />`, `<KostenTabel categorie="..." />`)
  en de interactieve calculators.
- `content/docs/wetboek` — het strafrechtelijke Wetboek (BW, Opiumwet,
  Gemeentewet, WVW, WWM, Sr, de boetetabel, Algemene Bepalingen,
  strafverminderingsgronden, schadevergoeding en bewijs).
- `content/docs/apv` — de Algemene Plaatselijke Verordening (serverregels),
  per hoofdstuk.
- `content/docs/rechtspraak.mdx` — hoe strafzaken worden afgehandeld en de
  rol van advocaten.
- `content/docs/financien` (Kosten + Belastingen) en `notam.mdx` —
  gepubliceerd met duidelijke TODO-callouts en voorbeeldbedragen (uit
  `data/kosten.json`, alle met `definitief: false`); vervang deze zodra de
  echte tarieven bekend zijn.
- `src/lib/shared.ts` — sitenaam, GitHub-repo en Discord-link op één plek.

## Publiceren

Een push naar `main` bouwt de site via `.github/workflows/deploy.yml` en
publiceert de statische export naar GitHub Pages.
