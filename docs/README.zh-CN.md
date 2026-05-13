[한국어](README.md) · [English](README.en.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

# web-translator

网页翻译 CDN。
插入 `<script>` 标签。
显示多语言下拉菜单。

- URL: `https://EaseHee.github.io/web-translator/`
- 许可证: MIT


## 特性

- 一行代码即可嵌入
- 调用 Google 翻译非官方 endpoint
- 通过 jsDelivr CDN 免费分发
- localStorage 缓存 (TTL 7 天)
- MutationObserver -> 自动翻译 SPA 动态内容


## 用法

将以下脚本标签粘贴到要翻译的页面 `</body>` 之前。

```html
<script
  src="https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js"
  data-langs="en,ja,zh-CN,es,fr"
  data-default="ko"
  data-position="top-right"
  data-auto="false"
  defer></script>
```

fork 并自行发布时,请将 URL 中的用户名替换为你自己的 GitHub 用户名或组织名。


## 配置项

| 属性 | 默认值 | 说明 |
|---|---|---|
| `data-langs` | `en,ja,zh-CN` | 下拉显示的语言(逗号分隔的 BCP-47 代码) |
| `data-default` | `<html lang>` 或 `auto` | 页面原文语言 |
| `data-position` | `top-right` | 挂件位置: `top-right` / `top-left` / `bottom-right` / `bottom-left` |
| `data-auto` | `false` | 为 `true` 时根据浏览器语言自动翻译 |
| `data-concurrency` | `4` | 并发翻译请求上限 |


## 排除翻译

设置 `data-no-translate` 属性,该元素将不参与翻译。

```html
<div data-no-translate>这一块永远不会被翻译。</div>
```

自动跳过的标签:`SCRIPT`、`STYLE`、`CODE`、`PRE`、`TEXTAREA`、`NOSCRIPT`、`IFRAME`、`SVG`、`CANVAS`、`KBD`、`SAMP`、`VAR`。`contenteditable` 元素及挂件自身(`#wt-widget`)同样被排除。


## 语言代码示例

`en` 英语 / `ja` 日语 / `zh-CN` 简体中文 / `zh-TW` 繁体中文 / `es` 西班牙语 / `fr` 法语 / `de` 德语 / `it` 意大利语 / `pt` 葡萄牙语 / `ru` 俄语 / `vi` 越南语 / `th` 泰语 / `id` 印尼语 / `ar` 阿拉伯语 / `hi` 印地语 / `tr` 土耳其语 / `nl` 荷兰语 / `pl` 波兰语 / `ko` 韩语

任何 Google 翻译支持的代码均可使用。


## CDN URL 形式

- 生产环境请固定版本。

- 锁定主版本
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js`
- 锁定确切版本
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1.0.0/dist/translate.min.js`
- 最新
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@latest/dist/translate.min.js`


## 注意事项

- 使用 Google 翻译非官方 endpoint,无任何官方 SLA 或服务条款保证。
- 可能随时遇到速率限制或封锁,不建议作为商用/核心功能的唯一翻译方案。


## 开发

```bash
npm install
npm run build       # 生成 dist/translate.min.js
npm run watch       # 监听并构建 dist/translate.js
npm run serve       # 在本地以 http://localhost:9630 提供 docs/
```


## 发布

1. 修改 `src/` 后执行 `npm run build`
2. 连同 `dist/translate.min.js` 一并提交并推送
3. 打 tag 发布: `git tag v1.0.0 && git push --tags`
4. jsDelivr 会自动缓存 GitHub tag,`@1`、`@1.0.0`、`@latest` URL 立即可用

`build.yml` GitHub Action 会在 main 分支推送时自动构建并提交 `dist/`。


## 密钥管理

通过 `gh secret set` 注册。批量注册时,将 `.secrets.env.example` 复制为 `.secrets.env`(已加入 gitignore),并按 KEY=VALUE 填写。

```bash
# 单条
gh secret set PAGES_TOKEN --body "<token>" --repo EaseHee/web-translator

# 批量
while IFS='=' read -r k v; do
  [ -z "$k" ] || [ "${k#\#}" != "$k" ] && continue
  gh secret set "$k" --body "$v" --repo EaseHee/web-translator
done < .secrets.env
```

工作流使用示例:

```yaml
- uses: actions/configure-pages@v6
  with:
    enablement: true
    token: ${{ secrets.PAGES_TOKEN || github.token }}
```

`PAGES_TOKEN`:

- 用途: 自动启用 GitHub Pages site。未设置时回退到默认 `GITHUB_TOKEN`(此时需事先手动启用 Pages site)。
- 申请: GitHub Settings → Developer settings → Personal access tokens → Fine-grained → Repository access 选择本仓库,Permissions 授予 Pages: Read and write,Metadata: Read。

## Pages 预启用(未注册 PAT 时)

未注册 `PAGES_TOKEN` 时,首次需手动启用 Pages 一次。

```bash
gh api -X POST /repos/EaseHee/web-translator/pages -f build_type=workflow
```

或 Settings → Pages → Source = `GitHub Actions`。

## 许可证

MIT.
