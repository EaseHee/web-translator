[한국어](README.md) · [English](README.en.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

# web-translator

Web ページ翻訳の CDN。
`<script>` タグを 1 行追加。
多言語ドロップダウン表示。

- URL: `https://EaseHee.github.io/web-translator/`
- ライセンス: MIT


## 特徴

- ワンライン埋め込み
- Google 翻訳の非公式エンドポイント呼び出し
- jsDelivr CDN による無料配信
- localStorage キャッシュ(TTL 7 日)
- MutationObserver -> SPA の動的コンテンツを自動翻訳


## 使い方

翻訳を適用したいページの `</body>` 直前に以下のスクリプトタグを挿入してください。

```html
<script
  src="https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js"
  data-langs="en,ja,zh-CN,es,fr"
  data-default="ko"
  data-position="top-right"
  data-auto="false"
  defer></script>
```

fork して自身で配信する場合は、URL 内のユーザー名をご自身の GitHub ユーザー名または組織名に置き換えてください。


## オプション

| 属性 | 既定値 | 説明 |
|---|---|---|
| `data-langs` | `en,ja,zh-CN` | ドロップダウンに表示する言語(カンマ区切り、BCP-47 コード) |
| `data-default` | `<html lang>` または `auto` | ページの原文言語 |
| `data-position` | `top-right` | ウィジェット位置: `top-right` / `top-left` / `top-center` / `bottom-right` / `bottom-left` / `bottom-center` |
| `data-auto` | `false` | `true` の場合ブラウザの言語を検出して自動翻訳 |
| `data-concurrency` | `4` | 同時翻訳リクエスト数の上限 |
| `data-theme` | `auto` | テーマ強制指定: `auto` / `light` / `dark`。`auto` はシステム設定に追従 |


## ドロップダウンのスタイル・位置の詳細調整

ウィジェットの外観と位置は 2 通りの方法で調整可能。併用可。優先順位は インライン `data-*` > `data-style` > 外部 CSS override。

### 1) data-* インラインオプション

よく使う項目をスクリプトタグに直接指定。

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

対応する data-* キー(値は CSS の長さ / 色 / 文字列をそのまま渡せます)。

| キー | 既定値 | 説明 |
|---|---|---|
| `data-offset-x` | `12px` | 画面端からの水平距離 |
| `data-offset-y` | `12px` | 画面端からの垂直距離 |
| `data-z-index` | `2147483647` | ウィジェットの z-index |
| `data-font-family` | システムフォント | フォントファミリ |
| `data-font-size` | `14px` | フォントサイズ |
| `data-line-height` | `1.4` | 行間 |
| `data-color` | `#222` (ライト) | 文字色 |
| `data-bg` | `#fff` (ライト) | 背景色 |
| `data-border-color` | `#d0d0d0` (ライト) | 枠線色 |
| `data-border-width` | `1px` | 枠線太さ |
| `data-radius` | `6px` | 角丸半径 |
| `data-padding-y` | `6px` | 上下パディング |
| `data-padding-left` | `10px` | 左パディング |
| `data-padding-right` | `26px` | 右パディング(矢印領域込み) |
| `data-shadow` | `0 1px 3px rgba(0,0,0,.08)` | box-shadow 値 |
| `data-focus-color` | `#4f8cff` | フォーカス outline 色 |
| `data-focus-width` | `2px` | フォーカス outline 太さ |
| `data-arrow` | 組み込み SVG | 矢印の background-image (`url(...)`) |
| `data-arrow-position` | `right 8px center` | 矢印位置 |
| `data-busy-opacity` | `.6` | 翻訳中の select 透明度 |
| `data-transition` | 色トランジション | CSS transition 値 |

### 2) data-style でまとめて指定

CSS 変数宣言形式の文字列をそのまま渡す。

```html
<script src="...translate.min.js"
  data-style="--wt-radius:12px;--wt-shadow:none;--wt-padding-y:8px"
  defer></script>
```

### 3) 外部 CSS による変数 override

ホストページの CSS で `#wt-widget` セレクタにより変数を上書き。

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

ダーク表示のカスタマイズは `prefers-color-scheme` メディアクエリと組み合わせ。

```css
@media (prefers-color-scheme: dark) {
  #wt-widget:not(.wt-theme-light) {
    --wt-bg: #000;
    --wt-color: #fff;
  }
}
```


## 翻訳対象外

`data-no-translate` 属性を設定すると、その要素は翻訳対象外になります。

```html
<div data-no-translate>このブロックは翻訳されません。</div>
```

自動的にスキップされるタグ: `SCRIPT`, `STYLE`, `CODE`, `PRE`, `TEXTAREA`, `NOSCRIPT`, `IFRAME`, `SVG`, `CANVAS`, `KBD`, `SAMP`, `VAR`。`contenteditable` 要素およびウィジェット自身(`#wt-widget`)も除外されます。


## 言語コード例

`en` 英語 / `ja` 日本語 / `zh-CN` 簡体字中国語 / `zh-TW` 繁体字中国語 / `es` スペイン語 / `fr` フランス語 / `de` ドイツ語 / `it` イタリア語 / `pt` ポルトガル語 / `ru` ロシア語 / `vi` ベトナム語 / `th` タイ語 / `id` インドネシア語 / `ar` アラビア語 / `hi` ヒンディー語 / `tr` トルコ語 / `nl` オランダ語 / `pl` ポーランド語 / `ko` 韓国語

Google 翻訳がサポートする任意のコードを利用できます。


## CDN URL 形式

- 本番環境ではバージョン固定を推奨します。

- メジャーバージョン固定
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js`
- 完全固定
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1.0.0/dist/translate.min.js`
- 最新
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@latest/dist/translate.min.js`


## 注意事項

- Google 翻訳の非公式エンドポイントを使用しているため、公式の SLA や利用規約上の保証はありません。
- レート制限や遮断が発生する可能性があるため、運用上の中核機能としての単独依存は推奨されません。


## 開発

```bash
npm install
npm run build       # dist/translate.min.js を生成
npm run watch       # dist/translate.js を変更監視ビルド
npm run serve       # docs/ をローカル配信 (http://localhost:9630)
```


## リリース

1. `src/` を編集して `npm run build`
2. `dist/translate.min.js` を含めてコミットおよびプッシュ
3. リリース時にタグ付与: `git tag v1.0.0 && git push --tags`
4. jsDelivr が GitHub タグを自動キャッシュ。`@1`、`@1.0.0`、`@latest` URL が即時利用可能。

`build.yml` GitHub Action が main プッシュ時に自動ビルドおよび `dist/` のコミットを行います。


## シークレット管理

`gh secret set` で登録します。一括登録する場合は `.secrets.env.example` をコピーした `.secrets.env`(gitignore 対象)に KEY=VALUE 形式で記述してください。

```bash
# 単一
gh secret set PAGES_TOKEN --body "<token>" --repo EaseHee/web-translator

# 一括
while IFS='=' read -r k v; do
  [ -z "$k" ] || [ "${k#\#}" != "$k" ] && continue
  gh secret set "$k" --body "$v" --repo EaseHee/web-translator
done < .secrets.env
```

ワークフローでの利用例:

```yaml
- uses: actions/configure-pages@v6
  with:
    enablement: true
    token: ${{ secrets.PAGES_TOKEN || github.token }}
```

`PAGES_TOKEN`:

- 用途: GitHub Pages site の自動有効化。未設定時はデフォルトの `GITHUB_TOKEN` にフォールバック(その場合 Pages site の事前有効化が必要)。
- 発行: GitHub Settings → Developer settings → Personal access tokens → Fine-grained → Repository access を本リポジトリに、Permissions に Pages: Read and write、Metadata: Read を付与。

## Pages 事前有効化(PAT 未登録時)

`PAGES_TOKEN` 未登録の場合、最初の 1 回のみ Pages の有効化が必要です。

```bash
gh api -X POST /repos/EaseHee/web-translator/pages -f build_type=workflow
```

または Settings → Pages → Source = `GitHub Actions` を選択。

## ライセンス

MIT.
