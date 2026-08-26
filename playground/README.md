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
