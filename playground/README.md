# Vuetiwatch playground

Every Vuetiwatch theme against a wall of Vuetify components — navbars,
buttons in all six variants, form controls, dialogs, feedback and tables.
Nothing in the demo markup is styled; the entire difference between screens
comes from the active theme.

```sh
# from the repository root
bun install
bun run playground
```

The active theme is in the URL (`?theme=neon`) and remembered in
`localStorage`, so a theme is linkable and survives a reload.

Fonts for all six themes are loaded from Google Fonts in `index.html`. Real
apps load only the families they use — see the package README.

## Hosting it

The playground is a plain Vite SPA — it builds to static files with no server
behind it, so any free static host will serve it. There is no router, so no
SPA fallback rule is needed either.

`.github/workflows/playground.yml` publishes it to GitHub Pages on every push
to `main`. Enable it once under **Settings → Pages → Source → GitHub Actions**;
after that the site lives at `https://<user>.github.io/<repo>/`.

The workflow builds the package before the playground, because the playground
consumes it through the workspace and its `dist` is gitignored.

For Netlify, Vercel or Cloudflare Pages instead, point the host at this repo
with:

```
build command    bun install && bun run --filter vuetiwatch build && bun run --filter vuetiwatch-playground build
publish directory playground/dist
```

Those serve from the domain root, so leave `BASE_PATH` unset. A GitHub Pages
project site lives in a subdirectory, which is why the workflow sets it.

Note the build carries about 3.6 MB of `@mdi/font` in four formats. Browsers
only ever fetch the 403 kB `woff2`; the rest is dead weight on disk, which
matters for the repository rather than for visitors.
