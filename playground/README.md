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
