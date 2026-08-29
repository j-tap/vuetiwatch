# Vuetiwatch playground

**[Live](https://j-tap.github.io/vuetiwatch/)**

Every theme against a wall of Vuetify components — navbars, buttons in all
six variants, cards, navigation, form controls, dialogs, feedback and tables.
Nothing in the demo markup is styled; the whole difference between screens
comes from the active theme.

```sh
# from the repository root
bun install
bun run dev
```

The active theme is in the URL (`?theme=neon`) and remembered in
`localStorage`, so a theme is linkable and survives a reload.

`index.html` loads every font the fourteen themes ask for. Real apps load only
the families they use — see the package README.

## Hosting

A plain Vite SPA: it builds to static files with no server and no router, so
any free static host will serve it as-is.

`.github/workflows/playground.yml` publishes it to GitHub Pages on every push
to `main`. Enable it once under **Settings → Pages → Source → GitHub Actions**.
The workflow builds the package first, because the playground consumes it
through the workspace and its `dist` is gitignored.

For Netlify, Vercel or Cloudflare Pages instead:

```
build command      bun install && bun run --filter vuetiwatch build && bun run --filter vuetiwatch-playground build
publish directory  playground/dist
```

Those serve from the domain root, so leave `BASE_PATH` unset — a GitHub Pages
project site lives in a subdirectory, which is why the workflow sets it.

## Search engines

The page is client-rendered, so the shipped HTML has to speak for itself.
`index.html` carries a description, a canonical URL (the theme is a query
parameter, not a page of its own), Open Graph tags with `public/og.png`, and
JSON-LD. Inside `#app` sits a static shell — a heading, the pitch and every
theme with its description — which Vue clears on mount; `vite-plugins/seo.ts`
injects that list from the package at build time, so it cannot drift, and
emits `sitemap.xml`.

Absolute URLs come from `SITE_URL`, alongside `BASE_PATH`; it defaults to the
GitHub Pages address. There is no `robots.txt`: a project site cannot serve
one — `/robots.txt` belongs to the domain root — so submit the sitemap in
Google Search Console instead.
