# Contrast

*Part of the [Vuetiwatch](../README.md) documentation: [writing a theme](authoring.md) · [theme variables](theme-variables.md) · [what wins](cascade.md) · [contrast](contrast.md).*

Vuetify picks the label colour for a filled control automatically, by
whichever of black or white scores higher on [APCA](https://github.com/Myndex/apca-w3) —
the WCAG 3 draft algorithm. It optimises, but it does not clear a bar: on
Vuetify's own light theme the filled `warning` button lands at 2.4:1 against
WCAG 2's 4.5:1 for label text.

Every theme here is measured against both, and states `on-*` explicitly
wherever the automatic pick falls short — which is the documented way to
control it. Where the two models disagreed the colour was deepened a few
points of lightness instead of flipping the label, so the hue survives and
both models pass; `aurora` keeps its bright gradient for decoration and
carries a deeper one behind anything with text on it.

The result: in seventeen of the eighteen non-stock themes every filled control
clears 4.5:1. `classic` does not, and that is the point of it — it is stock
Vuetify, including this.

`npm run audit` measures all of it and fails on anything unexplained, so the
next palette change cannot quietly walk this back. Exceptions live in that
script with their reason attached, which is the only way a later reader can
tell a decision from an oversight.

`soft` is the one stated exception. Its filled controls carry white labels on
pastel grounds, which measures between 1.77:1 and 2.84:1 — under the bar, by
both models. Nothing about that is accidental: white is what the palette wants,
and the only way to earn it is to take the hues down by a third, at which point
the theme is no longer pastel and no longer itself. If a screen has to be legible
to everyone, pick a theme that measures — `atlas` and `graphite` are built for
exactly that. `soft` is for the places where the palette is the point.
