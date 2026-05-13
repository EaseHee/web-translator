[한국어](README.md) · [English](README.en.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

# web-translator

웹 페이지 번역 CDN. 
`<script>` 태그 삽입.
다국어 드롭다운.

- URL: `https://EaseHee.github.io/web-translator/`
- 라이선스: MIT


## 유기력

- 코드 한 줄 임베드
- Google Translate 비공식 endpoint 호출 방식
- jsDelivr CDN 무료 배포
- localStorage 캐싱 (TTL 7일)
- MutationObserver -> SPA 동적 콘텐츠 자동 번역


## 사용법

번역을 적용할 페이지 `</body>` 직전에 다음 스크립트 태그 삽입.

```html
<script
  src="https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js"
  data-langs="en,ja,zh-CN,es,fr"
  data-default="ko"
  data-position="top-right"
  data-auto="false"
  defer></script>
```

fork하여 자체 배포하실 때에는 본인의 GitHub 사용자명이나 기관명으로 변경하여 사용하시면 됩니다.


## 옵션

| 속성 | 기본값 | 설명 |
|---|---|---|
| `data-langs` | `en,ja,zh-CN` | 드롭다운 표시 언어 목록 (쉼표 구분, BCP-47 코드) |
| `data-default` | `<html lang>` 값 또는 `auto` | 페이지 원본 언어 |
| `data-position` | `top-right` | 위젯 위치. `top-right` / `top-left` / `top-center` / `bottom-right` / `bottom-left` / `bottom-center` |
| `data-auto` | `false` | `true` 시 브라우저 언어 감지 후 자동 번역 시도 |
| `data-concurrency` | `4` | 동시 번역 요청 개수 상한 |
| `data-theme` | `auto` | 테마 강제. `auto` / `light` / `dark`. `auto`는 시스템 설정 추종 |


## 드롭다운 스타일·위치 상세 조정

위젯 외관과 위치를 두 방식으로 조정 가능. 둘 다 동시 사용 가능. 우선순위는 `data-*` 인라인 속성 > `data-style` > 외부 CSS override.

### 1) data-* 인라인 옵션

자주 쓰는 항목을 스크립트 태그에 직접 지정.

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

지원하는 data-* 키 (모두 CSS 길이·색·문자열 그대로 입력).

| 키 | 기본값 | 설명 |
|---|---|---|
| `data-offset-x` | `12px` | 화면 가장자리로부터 가로 거리 |
| `data-offset-y` | `12px` | 화면 가장자리로부터 세로 거리 |
| `data-z-index` | `2147483647` | 위젯 z-index |
| `data-font-family` | 시스템 폰트 | 글꼴 패밀리 |
| `data-font-size` | `14px` | 글자 크기 |
| `data-line-height` | `1.4` | 줄 간격 |
| `data-color` | `#222` (라이트) | 글자 색 |
| `data-bg` | `#fff` (라이트) | 배경 색 |
| `data-border-color` | `#d0d0d0` (라이트) | 테두리 색 |
| `data-border-width` | `1px` | 테두리 두께 |
| `data-radius` | `6px` | 모서리 반경 |
| `data-padding-y` | `6px` | 상하 패딩 |
| `data-padding-left` | `10px` | 좌측 패딩 |
| `data-padding-right` | `26px` | 우측 패딩 (화살표 영역 포함) |
| `data-shadow` | `0 1px 3px rgba(0,0,0,.08)` | box-shadow 값 |
| `data-focus-color` | `#4f8cff` | 포커스 outline 색 |
| `data-focus-width` | `2px` | 포커스 outline 두께 |
| `data-arrow` | 내장 SVG | 화살표 background-image (url 값). `none` 설정 시 화살표 제거 |
| `data-arrow-position` | `right 8px center` | 화살표 위치 |
| `data-arrow-size` | `10px 6px` | 화살표 크기 (CSS background-size 값) |
| `data-show-arrow` | `true` | `false` 지정 시 화살표·우측 패딩 동시 제거 |
| `data-display` | `block` | 위젯 컨테이너 display 값 |
| `data-hidden` | `false` | `true` 지정 시 위젯 비표시. 번역 기능은 유지하며 외부에서 select 노출만 차단 시 유용 |
| `data-width` | `auto` | 드롭박스 너비 (예: `160px`, `100%`) |
| `data-min-width` | `0` | 드롭박스 최소 너비 |
| `data-max-width` | `none` | 드롭박스 최대 너비 |
| `data-height` | `auto` | 드롭박스 높이 |
| `data-busy-opacity` | `.6` | 번역 진행 중 select 투명도 |
| `data-transition` | 색상 트랜지션 | CSS transition 속성 |

### 2) data-style로 여러 변수 한 번에

CSS 변수 선언 형식 문자열 그대로 입력.

```html
<script src="...translate.min.js"
  data-style="--wt-radius:12px;--wt-shadow:none;--wt-padding-y:8px"
  defer></script>
```

### 3) 외부 CSS 변수 override

호스트 페이지 CSS에서 `#wt-widget` 선택자로 변수 덮어쓰기.

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

다크 모드 사용자 정의는 `prefers-color-scheme` 미디어 쿼리와 함께 사용.

```css
@media (prefers-color-scheme: dark) {
  #wt-widget:not(.wt-theme-light) {
    --wt-bg: #000;
    --wt-color: #fff;
  }
}
```


## 번역 제외 처리

`data-no-translate` 속성 설정 시 해당 요소 번역 제외

```html
<div data-no-translate>이 영역은 번역에서 제외</div>
```

스크립트가 자동으로 무시하는 태그: `SCRIPT`, `STYLE`, `CODE`, `PRE`, `TEXTAREA`, `NOSCRIPT`, `IFRAME`, `SVG`, `CANVAS`, `KBD`, `SAMP`, `VAR`. `contenteditable` 요소 및 `#wt-widget` 자체도 제외.


## 지원 언어 코드 예시

`en` 영어 / `ja` 일본어 / `zh-CN` 중국어 간체 / `zh-TW` 중국어 번체 / `es` 스페인어 / `fr` 프랑스어 / `de` 독일어 / `it` 이탈리아어 / `pt` 포르투갈어 / `ru` 러시아어 / `vi` 베트남어 / `th` 태국어 / `id` 인도네시아어 / `ar` 아랍어 / `hi` 힌디어 / `tr` 터키어 / `nl` 네덜란드어 / `pl` 폴란드어 / `ko` 한국어

Google Translate가 지원하는 모든 코드 사용 가능.


## CDN URL 형식

- 운영 환경에서는 버전을 고정해주세요.

- 메이저 버전 고정
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1/dist/translate.min.js`
- 특정 버전 고정
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@1.0.0/dist/translate.min.js`
- 최신
  `https://cdn.jsdelivr.net/gh/EaseHee/web-translator@latest/dist/translate.min.js`


## 주의사항

- Google Translate 비공식 endpoint 사용으로 공식 SLA·약관 보장이 없습니다.
- 요율 제한 또는 차단이 발생 가능하여 운영 핵심 기능에 단독 의존 사용은 권장드리지 않습니다.


## 개발

```bash
npm install
npm run build       # dist/translate.min.js 생성
npm run watch       # dist/translate.js 감시 빌드
npm run serve       # docs/ 디렉터리 로컬 서빙 (http://localhost:9630)
```

## 배포

1. `src/` 수정 후 `npm run build`
2. `dist/translate.min.js` 포함 커밋 및 푸시
3. 릴리스 시 태그 설정: `git tag v1.0.0 && git push --tags`
4. jsDelivr가 GitHub 태그를 자동 캐싱. 즉시 `@1`, `@1.0.0`, `@latest` URL로 접근 가능

GitHub Actions `build.yml`이 main 푸시 시 자동 빌드 및 `dist/` 커밋.


## Secret 관리

`gh secret set` 명령으로 등록. 일괄 등록 시 `.secrets.env.example`을 복사한 `.secrets.env`(gitignore 등록)에 KEY=VALUE 작성 후 사용.

```bash
# 단건
gh secret set PAGES_TOKEN --body "<token>" --repo EaseHee/web-translator

# 일괄
while IFS='=' read -r k v; do
  [ -z "$k" ] || [ "${k#\#}" != "$k" ] && continue
  gh secret set "$k" --body "$v" --repo EaseHee/web-translator
done < .secrets.env
```

워크플로우 사용 예시.

```yaml
- uses: actions/configure-pages@v6
  with:
    enablement: true
    token: ${{ secrets.PAGES_TOKEN || github.token }}
```

`PAGES_TOKEN` 항목.

- 용도: GitHub Pages site 자동 활성화. 미등록 시 default `GITHUB_TOKEN` 폴백 (이 경우 Pages site는 사전 활성화 필요).
- 발급: GitHub Settings → Developer settings → Personal access tokens → Fine-grained → Repository access를 본 저장소로, Permissions에 Pages: Read and write, Metadata: Read 부여.

## Pages 사전 활성화 (PAT 미등록 시)

`PAGES_TOKEN` 미등록 시 최초 1회만 Pages 활성화 필요.

```bash
gh api -X POST /repos/EaseHee/web-translator/pages -f build_type=workflow
```

또는 Settings → Pages → Source = `GitHub Actions` 선택.

## 라이선스

MIT.
