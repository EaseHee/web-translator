[한국어](README.md) · [English](README.en.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

# web-translator

A CDN for web page translation.
Drop in a `<script>` tag.
Get a multi-language dropdown.

- URL: `https://EaseHee.github.io/web-translator/`
- License: MIT


## Highlights

- One-line embed
- Calls Google Translate's unofficial endpoint
- Free distribution via jsDelivr CDN
- localStorage caching (7-day TTL)
- MutationObserver -> auto-translates SPA dynamic content


## Usage

Paste this script tag just before `</body>` on any page you want to translate.

```html
<script
  src="https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js"
  data-langs="en,ja,zh-CN,es,fr"
  data-default="ko"
  data-position="top-right"
  data-auto="false"
  defer></script>
```

When you fork and self-publish, replace the username in the URL with your own GitHub username or organization.


## Options

| Attribute | Default | Description |
|---|---|---|
| `data-langs` | `en,ja,zh-CN` | Languages shown in the dropdown (comma-separated BCP-47 codes) |
| `data-default` | `<html lang>` or `auto` | Source language of the page |
| `data-position` | `top-right` | Widget position: `top-right` / `top-left` / `bottom-right` / `bottom-left` |
| `data-auto` | `false` | If `true`, detects browser language and auto-translates |
| `data-concurrency` | `4` | Maximum number of concurrent translation requests |


## Excluding content

Add `data-no-translate` to any element to exclude it from translation.

```html
<div data-no-translate>This block is never translated.</div>
```

Automatically skipped tags: `SCRIPT`, `STYLE`, `CODE`, `PRE`, `TEXTAREA`, `NOSCRIPT`, `IFRAME`, `SVG`, `CANVAS`, `KBD`, `SAMP`, `VAR`. `contenteditable` elements and the widget itself (`#wt-widget`) are also skipped.


## Language codes

`en` English / `ja` Japanese / `zh-CN` Simplified Chinese / `zh-TW` Traditional Chinese / `es` Spanish / `fr` French / `de` German / `it` Italian / `pt` Portuguese / `ru` Russian / `vi` Vietnamese / `th` Thai / `id` Indonesian / `ar` Arabic / `hi` Hindi / `tr` Turkish / `nl` Dutch / `pl` Polish / `ko` Korean

Any code Google Translate accepts will work.


## CDN URL patterns

- Pin a version in production.

- Major version pinned
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js`
- Exact version pinned
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1.0.0/dist/translate.min.js`
- Latest
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@latest/dist/translate.min.js`


## Caveats

- Uses Google Translate's unofficial endpoint; no official SLA or terms-of-service guarantee.
- Rate limiting or blocking can occur, so relying on it as the sole translation layer for critical features is not recommended.


## Development

```bash
npm install
npm run build       # produces dist/translate.min.js
npm run watch       # rebuilds dist/translate.js on change
npm run serve       # serves docs/ at http://localhost:9630
```


## Release

1. Edit sources in `src/`, then `npm run build`
2. Commit and push including `dist/translate.min.js`
3. Tag a release: `git tag v1.0.0 && git push --tags`
4. jsDelivr automatically caches GitHub tags. `@1`, `@1.0.0`, and `@latest` URLs become available immediately.

The `build.yml` GitHub Action auto-builds and commits `dist/` on every push to `main`.


## Secrets

Register secrets via `gh secret set`. For batch registration, copy `.secrets.env.example` to `.secrets.env` (gitignored) and fill in KEY=VALUE lines.

```bash
# Single
gh secret set PAGES_TOKEN --body "<token>" --repo EaseHee/web-translator

# Batch
while IFS='=' read -r k v; do
  [ -z "$k" ] || [ "${k#\#}" != "$k" ] && continue
  gh secret set "$k" --body "$v" --repo EaseHee/web-translator
done < .secrets.env
```

Workflow usage:

```yaml
- uses: actions/configure-pages@v6
  with:
    enablement: true
    token: ${{ secrets.PAGES_TOKEN || github.token }}
```

`PAGES_TOKEN`:

- Purpose: automatic activation of GitHub Pages site. If not set, falls back to the default `GITHUB_TOKEN` (Pages site must already be enabled in that case).
- Issue: GitHub Settings → Developer settings → Personal access tokens → Fine-grained → Repository access scoped to this repo, with Permissions: Pages = Read and write, Metadata = Read.

## Pages pre-activation (when PAT is not registered)

If `PAGES_TOKEN` is not set, activate Pages once:

```bash
gh api -X POST /repos/EaseHee/web-translator/pages -f build_type=workflow
```

Or via Settings → Pages → Source = `GitHub Actions`.

## License

MIT.
