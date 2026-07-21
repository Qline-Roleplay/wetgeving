# Kosten-sectie (uitgeschakeld)

Deze map staat bewust **buiten** `content/docs`, zodat Fumadocs 'm niet
meebouwt — de sectie bestaat dus nog niet op de live site.

## Activeren

1. Verplaats deze map naar `content/docs/kosten`.
2. Voeg `"kosten"` toe aan de `pages`-array in
   [`content/docs/meta.json`](../docs/meta.json), bijvoorbeeld:
   ```json
   { "title": "Wetgeving", "pages": ["index", "wetboek", "apv", "kosten"] }
   ```
3. Vul de tarieven in `index.mdx` aan (nu staan er placeholders).
4. `npm run dev` om te controleren, dan committen.

## Uitschakelen

Verplaats `content/docs/kosten` terug naar `content/kosten-draft` en
verwijder `"kosten"` weer uit `content/docs/meta.json`.
