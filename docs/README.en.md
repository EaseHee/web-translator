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
| `data-position` | `top-right` | Widget position: `top-right` / `top-left` / `top-center` / `bottom-right` / `bottom-left` / `bottom-center` |
| `data-auto` | `false` | If `true`, detects browser language and auto-translates |
| `data-concurrency` | `4` | Maximum number of concurrent translation requests |
| `data-theme` | `auto` | Force theme: `auto` / `light` / `dark`. `auto` follows the system setting |


## Styling and positioning

The widget appearance and position can be tuned in two ways, used together if needed. Priority order: inline `data-*` attributes > `data-style` > external CSS overrides.

### 1) Inline data-* options

Set common properties directly on the script tag.

```html
<script src="https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js"
  data-position="bottom-center"
  data-offset-x="24px"
  data-offset-y="20px"
  data-theme="dark"
  data-font-size="13px"
  data-radius="10px"
  data-bg="#0b1220"
  data-color="#e5e7eb"
  data-border-color="#1f2937"
  data-shadow="0 4px 12px rgba(0,0,0,.3)"
  defer></script>
```

Supported keys (values are passed straight through as CSS length / color / string).

| Key | Default | Description |
|---|---|---|
| `data-offset-x` | `12px` | Horizontal distance from the edge |
| `data-offset-y` | `12px` | Vertical distance from the edge |
| `data-z-index` | `2147483647` | Widget z-index |
| `data-font-family` | system stack | Font family |
| `data-font-size` | `14px` | Font size |
| `data-line-height` | `1.4` | Line height |
| `data-color` | `#222` (light) | Text color |
| `data-bg` | `#fff` (light) | Background color |
| `data-border-color` | `#d0d0d0` (light) | Border color |
| `data-border-width` | `1px` | Border width |
| `data-radius` | `6px` | Corner radius |
| `data-padding-y` | `6px` | Vertical padding |
| `data-padding-left` | `10px` | Left padding |
| `data-padding-right` | `26px` | Right padding (includes arrow area) |
| `data-shadow` | `0 1px 3px rgba(0,0,0,.08)` | box-shadow value |
| `data-focus-color` | `#4f8cff` | Focus outline color |
| `data-focus-width` | `2px` | Focus outline width |
| `data-arrow` | built-in SVG | Arrow background-image (`url(...)`). Set to `none` to remove the arrow |
| `data-arrow-position` | `right 8px center` | Arrow position |
| `data-arrow-size` | `10px 6px` | Arrow size (CSS `background-size` value) |
| `data-show-arrow` | `true` | Set `false` to remove both the arrow and the right padding reserved for it |
| `data-display` | `block` | Container `display` value |
| `data-hidden` | `false` | Set `true` to hide the widget entirely while keeping translation behavior |
| `data-width` | `auto` | Dropdown width (e.g. `160px`, `100%`) |
| `data-min-width` | `0` | Dropdown minimum width |
| `data-max-width` | `none` | Dropdown maximum width |
| `data-height` | `auto` | Dropdown height |
| `data-busy-opacity` | `.6` | Opacity while translating |
| `data-transition` | color transitions | CSS transition value |

### 2) `data-style` for multiple variables

Provide raw CSS variable declarations.

```html
<script src="...translate.min.js"
  data-style="--wt-radius:12px;--wt-shadow:none;--wt-padding-y:8px"
  defer></script>
```

### 3) External CSS variable overrides

Override variables in your own stylesheet via the `#wt-widget` selector.

```html
<style>
#wt-widget {
  --wt-offset-x: 24px;
  --wt-offset-y: 20px;
  --wt-radius: 12px;
  --wt-bg: #111;
  --wt-color: #fff;
  --wt-border-color: transparent;
  --wt-shadow: 0 6px 16px rgba(0,0,0,.4);
}
</style>
```

Customize the dark variant via the `prefers-color-scheme` media query.

```css
@media (prefers-color-scheme: dark) {
  #wt-widget:not(.wt-theme-light) {
    --wt-bg: #000;
    --wt-color: #fff;
  }
}
```


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
3. Push a release tag
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. The `release.yml` workflow runs automatically:
   - Re-builds from the tagged source
   - Warns if `package.json` version differs from the tag
   - Creates a GitHub Release with auto-generated notes and automatic prerelease detection
   - Attaches `translate.min.js`, `translate-<tag>.min.js`, and `SHA256SUMS`
5. jsDelivr automatically caches GitHub tags. `@1`, `@1.0.0`, and `@latest` URLs become available immediately.

Manual run: GitHub Actions → `release` → `Run workflow` → enter the tag.

`build.yml` auto-builds and commits `dist/` on every push to `main`. `pages.yml` deploys to GitHub Pages whenever `docs/` or `dist/` changes.

Tag naming: `v<major>.<minor>.<patch>` (e.g. `v1.0.0`). Tags like `v1.0.0-beta.1`, `v1.0.0-rc.1` are flagged as prereleases automatically.


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
