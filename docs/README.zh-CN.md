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
| `data-position` | `top-right` | 挂件位置: `top-right` / `top-left` / `top-center` / `bottom-right` / `bottom-left` / `bottom-center` |
| `data-auto` | `false` | 为 `true` 时根据浏览器语言自动翻译 |
| `data-concurrency` | `4` | 并发翻译请求上限 |
| `data-theme` | `auto` | 强制主题:`auto` / `light` / `dark`。`auto` 跟随系统设置 |


## 下拉框样式与位置精细调整

挂件外观和位置可通过两种方式调整,可同时使用。优先级:内联 `data-*` 属性 > `data-style` > 外部 CSS override。

### 1) data-* 内联选项

将常用属性直接写在脚本标签上。

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

支持的 data-* 键(取值按 CSS 长度 / 颜色 / 字符串原样传入)。

| 键 | 默认值 | 说明 |
|---|---|---|
| `data-offset-x` | `12px` | 距屏幕边缘的水平距离 |
| `data-offset-y` | `12px` | 距屏幕边缘的垂直距离 |
| `data-z-index` | `2147483647` | 挂件的 z-index |
| `data-font-family` | 系统字体 | 字体族 |
| `data-font-size` | `14px` | 字号 |
| `data-line-height` | `1.4` | 行高 |
| `data-color` | `#222`(浅色) | 文字颜色 |
| `data-bg` | `#fff`(浅色) | 背景色 |
| `data-border-color` | `#d0d0d0`(浅色) | 边框色 |
| `data-border-width` | `1px` | 边框宽度 |
| `data-radius` | `6px` | 圆角半径 |
| `data-padding-y` | `6px` | 上下内边距 |
| `data-padding-left` | `10px` | 左内边距 |
| `data-padding-right` | `26px` | 右内边距(含箭头区域) |
| `data-shadow` | `0 1px 3px rgba(0,0,0,.08)` | box-shadow 值 |
| `data-focus-color` | `#4f8cff` | 聚焦 outline 颜色 |
| `data-focus-width` | `2px` | 聚焦 outline 宽度 |
| `data-arrow` | 内置 SVG | 箭头 background-image (`url(...)`)。设为 `none` 可隐藏箭头 |
| `data-arrow-position` | `right 8px center` | 箭头位置 |
| `data-arrow-size` | `10px 6px` | 箭头大小 (CSS `background-size` 值) |
| `data-show-arrow` | `true` | 设为 `false` 同时移除箭头与右内边距 |
| `data-display` | `block` | 挂件容器 `display` 值 |
| `data-hidden` | `false` | 设为 `true` 隐藏挂件,翻译功能仍保留 |
| `data-width` | `auto` | 下拉框宽度 (如 `160px`, `100%`) |
| `data-min-width` | `0` | 下拉框最小宽度 |
| `data-max-width` | `none` | 下拉框最大宽度 |
| `data-height` | `auto` | 下拉框高度 |
| `data-busy-opacity` | `.6` | 翻译进行时的 select 透明度 |
| `data-transition` | 颜色过渡 | CSS transition 值 |

### 2) data-style 批量指定

按 CSS 变量声明的形式整段传入。

```html
<script src="...translate.min.js"
  data-style="--wt-radius:12px;--wt-shadow:none;--wt-padding-y:8px"
  defer></script>
```

### 3) 外部 CSS 变量 override

在宿主页面的 CSS 中通过 `#wt-widget` 选择器覆盖变量。

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

针对深色模式可结合 `prefers-color-scheme` 媒体查询自定义。

```css
@media (prefers-color-scheme: dark) {
  #wt-widget:not(.wt-theme-light) {
    --wt-bg: #000;
    --wt-color: #fff;
  }
}
```


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
3. 推送发布 tag
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. `release.yml` 工作流自动运行
   - 以 tag 对应的源代码重新构建
   - `package.json` 版本与 tag 不一致时给出警告
   - 自动创建 GitHub Release(自动生成 release notes,自动识别 prerelease)
   - 附加 `translate.min.js`、`translate-<tag>.min.js`、`SHA256SUMS` 资产
5. jsDelivr 会自动缓存 GitHub tag,`@1`、`@1.0.0`、`@latest` URL 立即可用

手动触发: GitHub Actions → `release` → `Run workflow` → 输入 tag。

`build.yml` 在 main 推送时自动构建并提交 `dist/`,`pages.yml` 在 `docs/` 或 `dist/` 变化时自动部署 GitHub Pages。

Tag 命名规则: `v<major>.<minor>.<patch>`(例如 `v1.0.0`)。`v1.0.0-beta.1`、`v1.0.0-rc.1` 等形式会被自动标记为 prerelease。


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
