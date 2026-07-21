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
  Gemeentewet, WVW, WWM, Sr en de boetetabel).
- `content/docs/apv` — de Algemene Plaatselijke Verordening (serverregels),
  per hoofdstuk.
- `content/kosten-draft` — een uitgewerkte "Kosten"-sectie die bewust
  **buiten** `content/docs` staat, dus niet meegebouwd wordt. Zie
  [content/kosten-draft/README.md](content/kosten-draft/README.md) om 'm te
  activeren.
- `src/lib/shared.ts` — sitenaam, GitHub-repo en Discord-link op één plek.

## Publiceren

Een push naar `main` bouwt de site via `.github/workflows/deploy.yml` en
publiceert de statische export naar GitHub Pages.
