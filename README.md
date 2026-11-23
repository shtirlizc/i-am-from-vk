# Astro Starter Kit: Minimal

[Инструкция для агента по настройке нового статического Astro-проекта](docs/project-setup.md).

## Деплой на GitHub Pages

Workflow [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml) публикует
сайт после push в `main`. Его также можно запустить вручную: **Actions → Deploy to
GitHub Pages → Run workflow**, выбрав `main`. Запуски из других веток пропускаются.

Перед первым деплоем откройте **Settings → Pages → Build and deployment → Source**
и выберите **GitHub Actions**. Дополнительные секреты и отдельная ветка для сборки
не нужны.

Адрес после успешного деплоя: <https://shtirlizc.github.io/i-am-from-vk/>.

Workflow использует Node.js из `.nvmrc`, устанавливает зависимости через `npm ci`
по `package-lock.json` и выполняет `npm run build`, включая `astro check`.
Права на публикацию выдаются только заданию `deploy`; текущий деплой не прерывается
новым запуском.

В `astro.config.mjs` настроены `site` и `base` для адреса GitHub Pages. Локальный
сайт также доступен по пути `/i-am-from-vk/`. При добавлении ссылок на файлы из
`public/` используйте `import.meta.env.BASE_URL`, как в `src/components/head.astro`.

Документация: [Astro](https://docs.astro.build/en/guides/deploy/github/) и
[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run check`           | Check types and Astro diagnostics                |
| `npm run build`           | Check types and build your site to `./dist/`     |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
