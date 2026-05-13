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
| `data-position` | `top-right` | ウィジェット位置: `top-right` / `top-left` / `bottom-right` / `bottom-left` |
| `data-auto` | `false` | `true` の場合ブラウザの言語を検出して自動翻訳 |
| `data-concurrency` | `4` | 同時翻訳リクエスト数の上限 |


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
