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

- `content/docs/wetboek` — het strafrechtelijke Wetboek (BW, Opiumwet,
  Gemeentewet, WVW, WWM, Sr, de boetetabel, Algemene Bepalingen,
  strafverminderingsgronden, schadevergoeding en bewijs).
- `content/docs/apv` — de Algemene Plaatselijke Verordening (serverregels),
  per hoofdstuk.
- `content/docs/rechtspraak.mdx` — hoe strafzaken worden afgehandeld en de
  rol van advocaten.
- `content/docs/kosten`, `belastingen.mdx`, `notam.mdx` — gepubliceerd met
  duidelijke TODO-callouts en voorbeeldbedragen; vervang deze zodra de
  echte tarieven bekend zijn.
- `src/lib/shared.ts` — sitenaam, GitHub-repo en Discord-link op één plek.

## Publiceren

Een push naar `main` bouwt de site via `.github/workflows/deploy.yml` en
publiceert de statische export naar GitHub Pages.
