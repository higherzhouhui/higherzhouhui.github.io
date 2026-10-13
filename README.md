# 风中追风的博客

Vite + React 静态站点，发布到 GitHub Pages。

```bash
git clone https://github.com/higherzhouhui/higherzhouhui.github.io.git
cd higherzhouhui.github.io
npm i
npm run dev
```

本地：http://localhost:5173/

```bash
npm run build
npm run preview
```

## 发布（必读）

推送 `main` 后，GitHub Actions 会构建 `dist/` 并发布。

仓库 **Settings → Pages → Build and deployment → Source** 必须选 **GitHub Actions**。

不要改回 **Deploy from a branch**。分支根目录的 `index.html` 是 Vite 源文件，浏览器读不到打包后的 JS，站点会空或 404。

免费账号不要把这个仓库设为 **Private**：用户站 `username.github.io` 在免费计划下会直接关掉 Pages。

旧 HTML 在 `archive/`，不要再放回仓库根目录的 `pages/` 或 `css/`，会劫持 `/css`、`/pages/*` 这些 SPA 路由。
