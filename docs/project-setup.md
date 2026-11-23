# Настройка статического проекта Astro

Инструкция для агента, работающего в уже созданном Astro-проекте. Подготовь зависимости, форматирование, проверку типов, локальные шрифты и базовые глобальные стили. Закрепи правила адаптивного CSS в `AGENTS.md`. По выбору пользователя настрой деплой на GitHub Pages. Сохрани существующий код и настройки, которые не относятся к этой задаче.

Этот файл самодостаточен: все необходимые шаблоны приведены ниже. Файлы других проектов, их история и предыдущая переписка не нужны.

## Как запустить

Скопируй этот файл в новый Astro-проект и передай агенту:

> Выполни инструкцию из docs/project-setup.md. Сначала изучи проект, затем одним сообщением запроси недостающие данные. После моих ответов выполняй настройку. Если нужна конвертация шрифтов, подготовь выбранные исходники и дождись моего сообщения о готовности.

## 1. Изучи проект и запроси входные данные

Прочитай применимые `AGENTS.md`, проверь состояние Git, `package.json`, lock-файл, конфигурацию Astro, TypeScript, стили, страницы и компоненты. Изучи существующие workflows в `.github/workflows/`, Git remote и основную ветку репозитория. Не перезаписывай пользовательские изменения. При повторном запуске дополни уже существующую настройку, не создавай дубликаты.

Ниже команды для npm. Если проект уже использует другой менеджер пакетов, используй его и существующий lock-файл. Не создавай второй lock-файл.

Используй актуальную официальную документацию для установленной версии Astro:

- [Компоненты](https://docs.astro.build/en/basics/astro-components/).
- [Глобальные стили](https://docs.astro.build/en/guides/styling/).
- [Шрифты](https://docs.astro.build/en/guides/fonts/).
- [Локальный провайдер шрифтов](https://docs.astro.build/en/reference/font-provider-reference/).
- [TypeScript и проверка типов](https://docs.astro.build/en/guides/typescript/).
- [Команды CLI](https://docs.astro.build/en/reference/cli-reference/).
- Если выбран деплой: [Astro на GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) и [GitHub Pages через Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Уточни только то, чего нет в задании или достоверно в проекте. Собери вопросы одним блоком:

| Параметр                 | Что нужно узнать                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Шрифты                   | Семейства, веса, обычные или курсивные начертания; где лежат исходные файлы                                 |
| Основной шрифт           | Какое семейство и вес использовать для документа; вес по умолчанию 400, если он есть среди выбранных файлов |
| Дополнительные семейства | Какие ещё семейства зарегистрировать для дальнейшей вёрстки                                                 |
| Палитра                  | Основной цвет, фон, основной и дополнительный цвета текста                                                  |
| Метаданные               | Язык документа и название страницы                                                                          |
| Слайдер                  | Нужен ли Swiper                                                                                             |
| GitHub Pages             | Нужно ли настроить деплой на GitHub Pages в этом репозитории?                                               |
| Переопределения          | Есть ли отличия от базовых CSS-настроек ниже                                                                |

Не переноси название бренда, шрифты и палитру из примеров или другого проекта. Если дизайн требует дополнительных переменных, спроси их значения. Для фавиконок используй существующие файлы; при необходимости замены запроси материалы и не добавляй ссылки на отсутствующие файлы.

После ответов приступай к обычным правкам без повторных согласований. Если ответ нужен для конкретного этапа, продолжай независимую работу. Не подменяй отсутствующие материалы выдуманными файлами.

Деплой на GitHub Pages настраивай только после положительного ответа или прямого запроса пользователя. Если деплой нужен, уточни только недостающие данные: репозиторий GitHub, ветку публикации и собственный домен, если он нужен. Если пользователь отказался, пропусти раздел 11, сохрани существующие настройки деплоя и выполни остальные этапы. Если ответ ещё не получен, продолжай независимые этапы; вопрос о деплое оставь открытым.

## 2. Проверь версии Node и зависимостей

Сохрани установленную версию Astro. Автоматически обновлять её ради этой инструкции не нужно.

Для добавляемых пакетов выбери актуальные стабильные версии, совместимые с установленным Astro, его плагинами и peer dependencies. Не устанавливай prerelease-версии и не обходи конфликты через `--force` или `--legacy-peer-deps`.

Выбери поддерживаемую [LTS-ветку Node.js](https://nodejs.org/en/about/previous-releases), удовлетворяющую требованиям всех выбранных пакетов. Запиши её основной номер в `.nvmrc`; точную нижнюю границу совместимости укажи в `package.json` → `engines.node`. Не копируй устаревшую версию из шаблона. Если текущая среда несовместима, сообщи, какая версия нужна.

Проверь поддержку `fonts`, `fontProviders.local()` и `<Font />` в установленном Astro. Если для них требуется обновление Astro, объясни несовместимость и запроси согласование обновления; не переключайся молча на другую архитектуру.

Установи зависимости для разработки:

```sh
npm install --save-dev prettier prettier-plugin-astro @astrojs/check typescript
```

Если подтверждён Swiper, установи его как зависимость приложения:

```sh
npm install swiper
```

ESLint и другие линтеры по умолчанию не добавляй. Обнови существующий lock-файл средствами менеджера пакетов. Не переписывай его вручную и не обновляй посторонние зависимости намеренно.

Проект должен остаться статическим. Сохрани стандартный static output либо существующее `output: "static"`; не добавляй серверный адаптер и SSR. Если исходный проект использует серверный режим, уточни это противоречие до смены режима.

## 3. Настрой Prettier

Создай `.prettierrc.mjs`, если конфигурации ещё нет. Иначе аккуратно дополни её, сохранив действующие правила и плагины:

```js
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
```

Добавь в `.prettierignore`:

```text
.astro/
node_modules/
package-lock.json
dist/
```

Для другого менеджера пакетов исключи его lock-файл. Если в проекте лежат временные материалы, исключи соответствующий каталог из форматирования. Не форматируй бинарные файлы и сторонние исходники.

## 4. Настрой astro check

Обеспечь следующие npm scripts, сохранив другие команды проекта:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "check": "astro check",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

Если сборка уже содержит дополнительные необходимые действия, сохрани их, добавив проверку перед сборкой. Не дублируй уже существующий `astro check`.

Для минимального проекта используй `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

Сохрани пользовательские настройки TypeScript, если они уже есть. Временные каталоги с посторонним кодом при необходимости исключи из проверки.

## 5. Подготовь выбранные шрифты

Составь список только согласованных семейств, весов и начертаний. Сверь внутренние метаданные файлов: имя файла само по себе не гарантирует правильный вес.

Типичные соответствия для статических шрифтов: Regular — 400, Medium — 500, SemiBold/DemiBold — 600, Bold — 700, ExtraBold — 800, Black — 900. Проверяй фактические значения. Если выбранного начертания нет, уточни замену; не выдавай соседний вес за нужный.

Конечное расположение файлов:

```text
src/assets/fonts/
  FamilyName/
    FamilyName-Regular.woff2
    FamilyName-Regular.woff
    FamilyName-Medium.woff2
    FamilyName-Medium.woff
```

Имена здесь условные. Используй понятные имена без пробелов и отдельную папку для каждого семейства. Не копируй всю коллекцию шрифтов.

### Если есть только TTF или OTF

1. Скопируй только выбранные файлы в соответствующие папки `src/assets/fonts`, сохранив исходную коллекцию на месте.
2. Сообщи пользователю соответствие «файл — семейство — вес — стиль» и предложи конвертировать выбранные файлы в WOFF2 и WOFF рядом с ними.
3. Не конвертируй самостоятельно: этот этап выполняет пользователь.
4. Выполни остальные независимые настройки, затем дождись сообщения о готовности. Не добавляй в конфигурацию пути к ещё не существующим WOFF/WOFF2.
5. После сообщения пользователя заново проверь реальные имена и метаданные конвертированных файлов: конвертер мог переименовать их. Проверь также наличие нужных символов, включая кириллицу, если она нужна сайту.

Оригиналы TTF/OTF не подключай к странице. Если пользователь уже удалил подготовленные TTF после конвертации, не восстанавливай их. Для имеющихся TTF согласуй уборку, если она требуется; исходную коллекцию не удаляй.

Если WOFF2 и WOFF уже предоставлены, сразу переходи к регистрации. Если каких-то форматов не хватает, запроси их. Не импортируй `stylesheet.css`, созданные конвертером: объявления `@font-face` создаст Astro.

## 6. Зарегистрируй шрифты через Fonts API

Дополни `astro.config.mjs`, сохранив существующую конфигурацию. Для каждого семейства используй локальный провайдер, уникальную CSS-переменную и `display: "swap"`.

Пример структуры для одного условного семейства и веса 400:

```js
// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Family Name",
      cssVariable: "--font-primary",
      display: "swap",
      options: {
        variants: [
          {
            src: [
              "./src/assets/fonts/FamilyName/FamilyName-Regular.woff2",
              "./src/assets/fonts/FamilyName/FamilyName-Regular.woff",
            ],
            weight: "400",
            style: "normal",
          },
        ],
      },
    },
  ],
});
```

Замени условные имена и пути реальными. Добавь отдельный variant для каждого выбранного веса и стиля. У каждого варианта сначала указывай WOFF2, затем WOFF. Регистрируй только существующие файлы. Для настоящего вариативного шрифта укажи его фактический диапазон весов, не имитируй вариативность статического файла.

Основное семейство получает `--font-primary`, второе — `--font-secondary`; при большем числе семейств используй понятные уникальные имена. Храни файлы в `src/assets/fonts`, чтобы ими управлял Astro, а не в `public/fonts`.

Не добавляй `preload` всех начертаний. Выборочная предзагрузка появится на этапе вёрстки первого экрана, когда станет понятно, какие шрифты на нём используются.

## 7. Подключи head и глобальные стили

Для минимального проекта создай `src/components/head.astro`. Если общий head или layout уже существует, используй его; не создавай второй `<head>`.

```astro
---
import "../styles/_main.css";

import { Font } from "astro:assets";
---

<head>
  <meta charset="utf-8" />
  <Font cssVariable="--font-primary" />
  <Font cssVariable="--font-secondary" />
  <meta name="viewport" content="width=device-width" />
  <meta name="generator" content={Astro.generator} />
  <title>Название страницы</title>
</head>
```

Замени название страницы согласованным. Добавь `<Font>` только для зарегистрированных семейств: если второго семейства нет, удали соответствующую строку. Сохрани действующие метатеги и ссылки на существующие фавиконки.

В существующей странице импортируй `Head` и используй `<Head />` вместо прежнего `<head>`. Установи согласованный `lang` на `<html>`. Содержимое `<body>` сохрани.

Структура стилей:

```text
src/styles/
  _main.css
  vendors.css
  variables.css
  scrollbar.css
  body.css
  media-example.css
```

`_main.css`:

```css
@import "./vendors.css";
@import "./variables.css";
@import "./scrollbar.css";
@import "./body.css";
```

`vendors.css` при наличии Swiper:

```css
@import "swiper/css";
```

Если Swiper не нужен, оставь `vendors.css` с комментарием для будущих сторонних стилей и не добавляй `.swiper` в `body.css`. Это подключение CSS не создаёт и не инициализирует слайдер.

## 8. Создай CSS-переменные

В `src/styles/variables.css` используй шаблон ниже. Маркеры `PRIMARY_COLOR`, `BACKGROUND_COLOR`, `TEXT_PRIMARY_COLOR`, `TEXT_SECONDARY_COLOR` замени подтверждёнными значениями перед сохранением CSS. Незаполненных маркеров в рабочих файлах быть не должно.

```css
:root {
  --color-primary: PRIMARY_COLOR;
  --color-bg-main: BACKGROUND_COLOR;
  --color-text-primary: TEXT_PRIMARY_COLOR;
  --color-text-secondary: TEXT_SECONDARY_COLOR;

  --space: 4px;
  --space8: calc(var(--space) * 2);
  --space12: calc(var(--space) * 3);
  --space16: calc(var(--space) * 4);
  --space20: calc(var(--space) * 5);
  --space24: calc(var(--space) * 6);
  --space28: calc(var(--space) * 7);
  --space32: calc(var(--space) * 8);
  --space36: calc(var(--space) * 9);
  --space40: calc(var(--space) * 10);
  --space44: calc(var(--space) * 11);
  --space48: calc(var(--space) * 12);

  --border-radius: 4px;
  --border-radius8: calc(var(--border-radius) * 2);
  --border-radius12: calc(var(--border-radius) * 3);
  --border-radius16: calc(var(--border-radius) * 4);
  --border-radius20: calc(var(--border-radius) * 5);

  --transition-short: 0.1s;
  --transition: 0.2s;
  --transition-long: 0.4s;

  --scrollbar-track-color: transparent;
  --scrollbar-color: var(--color-primary);
  --scrollbar-side: var(--space8);

  --delay: 0.2s;
  --timing-func: cubic-bezier(0.21, 0, 0.29, 1);
}
```

Светлая схема и перечисленные числовые значения — значения по умолчанию. Используй переопределения, если пользователь их сообщил. Не добавляй ширину контейнера, высоту шапки и `scroll-padding-top`: они зависят от будущей вёрстки и могут вообще не понадобиться.

## 9. Добавь базовые стили документа

`src/styles/body.css`:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

*::selection {
  color: var(--color-text-primary);
  background-color: var(--color-primary);
}

:root {
  background-color: var(--color-bg-main);
  color: var(--color-text-primary);
  font-weight: 400;
  font-size: 20px;
  font-family: var(--font-primary), sans-serif;
  font-synthesis: none;
  color-scheme: light;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  min-width: 320px;
  min-height: 100dvh;
}

a {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
  margin: 0;
}

button {
  -webkit-tap-highlight-color: transparent;
}

.swiper {
  overflow: hidden;
  width: 100%;
}
```

Если выбран другой базовый вес, замени `400` на согласованное значение, которое есть у основного семейства. Основной шрифт должен быть назначен документу, а не только зарегистрирован в Fonts API.

Не назначай дополнительные семейства заголовкам, кнопкам или отдельным блокам: это решается при вёрстке. Не добавляй глобальный `outline: none`; сохрани видимый фокус интерактивных элементов. Убедись, что выбранная палитра даёт читаемый текст при выделении.

`src/styles/scrollbar.css`:

```css
::-webkit-scrollbar {
  width: var(--scrollbar-side);
  height: var(--scrollbar-side);
}

::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track-color);
}

::-webkit-scrollbar-thumb {
  border-radius: calc(var(--scrollbar-side) / 2);
  background: var(--scrollbar-color);
}

* {
  scrollbar-color: var(--scrollbar-color) var(--scrollbar-track-color);
  scrollbar-width: thin;
}
```

## 10. Добавь справочник медиазапросов

Проверь, есть ли в проекте справочник медиазапросов, в том числе под именем `src/styles/media-exmple.css`. Если он уже есть, сохрани его имя и существующие условия; не создавай второй справочник. Если справочника нет, создай `src/styles/media-example.css` по шаблону ниже. Не импортируй его в `_main.css`: пустые примеры не нужны в рабочем CSS. При вёрстке переноси нужные условия в соответствующие компоненты.

```css
/* mobile */
@media (width < 560px) {
  /* media query rules */
}

/* wide-mobile */
@media (width >= 560px) {
  /* media query rules */
}

/* wide-mobile-only */
@media (width >= 560px) and (width < 768px) {
  /* media query rules */
}

/* tablet */
@media (width >= 768px) {
  /* media query rules */
}

/* tablet-only */
@media (width >= 768px) and (width < 960px) {
  /* media query rules */
}

/* desktop */
@media (width >= 960px) {
  /* media query rules */
}

/* desktop-only */
@media (width >= 960px) and (width < 1200px) {
  /* media query rules */
}

/* widescreen */
@media (width >= 1200px) {
  /* media query rules */
}

/* widescreen-only */
@media (width >= 1200px) and (width < 1332px) {
  /* media query rules */
}

/* fullhd */
@media (width >= 1600px) {
  /* media query rules */
}
```

Это независимые примеры, а не непересекающееся разбиение всех экранов. Отдельный пример для диапазона 1332–1599px здесь не задан; для него действует условие `width >= 1200px`.

### Добавь правила Responsive CSS в AGENTS.md

Создай `AGENTS.md` в корне нового проекта, если его нет. Если файл существует, сохрани остальные разделы и добавь `## Responsive CSS`. Если такой раздел уже есть, дополни его недостающими правилами без дублирования и сохрани дополнительные ограничения проекта. Этот этап обязателен и не зависит от выбора GitHub Pages.

Ниже полный текст раздела для нового проекта. В нём указан стандартный путь `src/styles/media-example.css`; если используется существующий справочник с другим именем, замени все упоминания пути на фактический. Сверь названия и порядок брейкпоинтов с этим справочником, сохранив порядок от меньшей ширины к большей. Другие разделы `AGENTS.md` из чужих проектов переносить не нужно.

````markdown
## Responsive CSS

These rules are mandatory for authored CSS throughout this repository, including Astro `<style>` blocks and standalone stylesheets. Follow them when adding or modifying responsive styles.

- Nest each responsive `@media` block inside the selector whose declarations it changes. Keep all responsive declarations for an element together with its base declarations.
- Within each selector, put base declarations first, then its responsive `@media` blocks, then any nested selectors. Apply this structure recursively: a nested selector must contain its own media queries.
- Inside a nested media query, write the changed declarations directly. Do not repeat the owning selector or collect several selectors into a separate page-level media block.
- Use the viewport-width conditions defined in `src/styles/media-example.css` by default. Read that file before writing responsive styles. A custom breakpoint is allowed only as an exception when the existing conditions cannot accommodate a concrete layout requirement, not merely for convenience.
- When a custom breakpoint is necessary, add its condition to `src/styles/media-example.css` with a descriptive breakpoint-name comment and a brief explanation of the layout requirement. Insert it in mobile-first order, then use the same condition and name in component styles. Do not change existing breakpoint conditions to solve a local layout issue.
- Immediately above each `@media` block, include the exact breakpoint-name comment from that file, such as `/* tablet */` or `/* desktop */`.
- Order media blocks within every selector mobile-first: narrower viewport ranges come before wider ones. The standard catalog order is `mobile`, `wide-mobile`, `wide-mobile-only`, `tablet`, `tablet-only`, `desktop`, `desktop-only`, `widescreen`, `widescreen-only`, `fullhd`; insert exceptional breakpoints at their corresponding viewport widths. At the same minimum width, put the general rule before its `-only` range. Include only the breakpoints that are needed.
- Preserve selector specificity and the intended cascade when reorganizing existing styles. Do not move responsive rules into distant blocks at the end of a component or stylesheet.

Required structure:

```css
.header {
  padding: var(--space24) 0;

  /* tablet */
  @media (width >= 768px) {
    padding: var(--space32) 0;
  }

  /* desktop */
  @media (width >= 960px) {
    padding: var(--space48) 0 var(--space40);
  }

  & .header__content {
    display: flex;
    flex-direction: column;

    /* tablet */
    @media (width >= 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    nav {
      display: flex;
      gap: var(--space24);
    }
  }
}
```

`src/styles/media-example.css` is the breakpoint reference; its top-level media queries are examples, not component styles to restructure.
````

## 11. Настрой GitHub Pages, если пользователь выбрал деплой

Положительный ответ разрешает подготовить файлы настройки в текущем проекте. Коммит, push, запуск публикации и изменение настроек репозитория выполняй только по отдельному запросу пользователя.

### Определи адрес и ветку

Возьми владельца и имя репозитория из Git remote, а основную ветку — из доступных метаданных репозитория. Не предполагай, что ветка всегда называется `main`. Если репозиторий ещё не подключён или данные неоднозначны, уточни их у пользователя; не создавай репозиторий автоматически.

Настрой `site` и `base` в существующем `astro.config.mjs`, сохранив шрифты и другие параметры. Для обычного репозитория без собственного домена используй следующую структуру:

```js
export default defineConfig({
  site: "https://OWNER.github.io",
  base: "/REPOSITORY",
  // Сохрани остальные настройки проекта.
});
```

Замени `OWNER` и `REPOSITORY` реальными значениями текущего репозитория. Для репозитория `OWNER.github.io` сайт размещается в корне: задай `site`, а `base` оставь `/` или не указывай. Если выбран собственный домен, используй его HTTPS-адрес в `site` и корневой `base`; опиши необходимые настройки домена в Pages и DNS. Не переноси адреса и домены из другого проекта.

Проверь ссылки на внутренние страницы и файлы из `public/`, в том числе фавиконки. При размещении в подпапке учитывай `import.meta.env.BASE_URL`; не добавляй префикс повторно к импортируемым ресурсам, которыми уже управляет Astro. Например, для существующего `public/favicon.svg`:

```astro
---
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
---

<link rel="icon" type="image/svg+xml" href={`${baseUrl}/favicon.svg`} />
```

При соединении путей убирай завершающий слеш из `BASE_URL` и добавляй один слеш перед именем файла, как в примере. Это работает и для корневого `base: "/"`, и для подпапки, независимо от настройки `trailingSlash`. Проверь итоговые URL в сборке и доступность фавиконок через dev-сервер по адресу с учётом `base`. Ссылки на якоря и внешние сайты сохрани. Укажи в README локальный путь сайта, если он изменился из-за `base`.

### Подготовь workflow

Если workflow деплоя уже существует, дополни его вместо создания второго. Иначе создай `.github/workflows/deploy.yaml`. Перед настройкой сверь стабильные версии Actions с их официальными репозиториями: номера в шаблоне служат отправной точкой и могут устареть.

Ниже шаблон для npm и ветки `main`. Замени `main` на согласованную ветку в `on.push.branches` и в условии задания `build`. Для другого менеджера пакетов адаптируй настройку кеша и команды установки и сборки; используй установку строго по существующему lock-файлу.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7
        with:
          persist-credentials: false

      - name: Setup Node.js
        uses: actions/setup-node@v7
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Check and build
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

Workflow должен использовать Node.js из `.nvmrc`, запускать проверку типов через существующий build script и передавать результат сборки из `build` в `deploy`. Если проект использует нестандартный `outDir`, укажи его вместо `dist`. Права `pages: write` и `id-token: write` выдавай только заданию публикации. Сохрани защиту от публикации из других веток при ручном запуске и последовательное выполнение деплоев без прерывания текущего.

Используй официальные Actions: [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [upload-pages-artifact](https://github.com/actions/upload-pages-artifact) и [deploy-pages](https://github.com/actions/deploy-pages). Не добавляй персональный токен или отдельную ветку с результатом сборки: для этой схемы достаточно встроенного `GITHUB_TOKEN`.

### Опиши первый запуск

Добавь в README итоговый адрес сайта, ветку публикации, способ ручного запуска workflow и действия перед первым деплоем: **Settings → Pages → Build and deployment → Source → GitHub Actions**. Если Pages недоступен для репозитория, сообщи причину; не меняй его видимость или тариф самостоятельно.

В итоговом отчёте отдели готовность файлов настройки от фактической публикации. Если отдельного запроса на публикацию не было, укажи оставшиеся действия: выбрать источник Pages, закоммитить и отправить изменения в согласованную ветку. После успешного деплоя URL доступен также в окружении `github-pages`.

## 12. Проверь результат

Отформатируй созданные и изменённые исходники и документацию локальным Prettier. Используй явный список файлов, чтобы не затронуть посторонние правки и временные материалы. Например:

```sh
npx --no-install prettier --write .prettierrc.mjs package.json tsconfig.json astro.config.mjs src/components/head.astro src/pages/index.astro src/styles
```

Список адаптируй под реально изменённые файлы. Затем проверь их через `prettier --check` и запусти:

```sh
npm run build
```

`build` уже запускает `astro check`, поэтому повторять проверку отдельно сразу перед ним не нужно. `npm run check` остаётся доступной самостоятельной командой.

Устрани ошибки, вызванные настройкой, и проверь:

- Нет неподтверждённых значений, условных имён из шаблона и ссылок на отсутствующие файлы.
- В сборке есть все согласованные семейства, веса и стили с WOFF2 первым источником и WOFF запасным.
- Font CSS содержит `font-display: swap`, нужные CSS-переменные и не дублируется стилями конвертера.
- Основной шрифт назначен документу с согласованным весом. Дополнительные семейства доступны для дальнейшей вёрстки.
- Глобальные стили импортируются, палитра заполнена, схема светлая, если не было переопределения.
- Swiper и его стили присутствуют только при подтверждённой необходимости.
- Значения контейнера и шапки не добавлены без задачи на соответствующую вёрстку.
- В корневом `AGENTS.md` есть один раздел `Responsive CSS` со всеми правилами и примером; путь к справочнику медиазапросов существует, а названия и порядок брейкпоинтов согласованы с ним. Остальные инструкции проекта сохранены.
- Если выбран GitHub Pages: workflow соответствует ветке и менеджеру пакетов проекта, `site` и `base` соответствуют адресу публикации, а локальные ресурсы в итоговых HTML и CSS доступны с учётом `base`.
- Если выбран GitHub Pages: README содержит адрес сайта и инструкцию первого запуска; состояние фактической публикации указано отдельно.
- `git diff --check` не обнаруживает ошибок пробелов, если проект находится под Git.

Если сборку блокирует окружение, сообщи точную причину и используй предусмотренный средой механизм разрешений, не меняя архитектуру проекта ради обхода ограничения. Fonts API некоторых версий Astro может поднимать временный HTTP-сервер при сборке; запрет открытия порта в песочнице не означает ошибку настройки шрифтов.

Запускай dev-сервер только при необходимости проверки в браузере. Соблюдай `AGENTS.md`. Если установленный Astro поддерживает фоновый режим, используй локальный CLI:

```sh
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Не предполагай наличие фоновых команд в старой версии Astro: сначала проверь справку установленного CLI. Не добавляй в проект требование неподдерживаемой команды.

В конце кратко перечисли изменения, согласованные параметры, выбор пользователя по GitHub Pages и результаты проверок. Если ожидается конвертация или ответ пользователя, явно укажи незавершённый этап. Не объявляй настройку завершённой до подключения шрифтов и успешной проверки доступных этапов. Коммит и публикацию выполняй только по отдельному запросу.
