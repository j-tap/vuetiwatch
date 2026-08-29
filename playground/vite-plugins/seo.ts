import type { Plugin } from 'vite'
import { themeList } from 'vuetiwatch'

/** Where `%SITE_URL%` and the marker below are filled in. */
const THEMES_MARKER = '<!-- themes -->'

/** `&`, `<` and `>` are all the theme copy can contain — em dashes are safe. */
function escapeHtml (value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * What the page says before its script runs.
 *
 * The playground is a client-rendered SPA, so the shipped HTML describes
 * nothing: a crawler that does not execute the bundle — and the first paint
 * on a slow connection — sees an empty div. This fills the shell with the
 * page's actual subject, the theme list, taken from the package itself so it
 * cannot drift from what the app renders. The app clears it all on mount.
 *
 * Absolute URLs (canonical, Open Graph) cannot come from `base`, which is
 * only a path, so they are substituted here from the deployment's own origin.
 */
export function seo (siteUrl: string): Plugin {
  return {
    name: 'vuetiwatch-seo',

    transformIndexHtml (html) {
      const items = themeList
        .map(({ meta }) =>
          `<li><b>${escapeHtml(meta.title)}</b>${meta.dark ? ' (dark)' : ''} — ${escapeHtml(meta.description)}</li>`,
        )
        .join('\n        ')

      return html
        .replaceAll('%SITE_URL%', siteUrl)
        .replaceAll('%THEME_COUNT%', String(themeList.length))
        .replace(THEMES_MARKER, `<ul>\n        ${items}\n      </ul>`)
    },

    // One page, one URL — but a sitemap is what Search Console wants
    // submitted, and it carries the date of the deployment.
    generateBundle () {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${siteUrl}</loc>`,
          `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}
