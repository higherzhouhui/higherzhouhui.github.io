# 风中追风的博客

Vite + React 静态站点，可部署到 GitHub Pages。

```bash
git clone https://github.com/higherzhouhui/higherzhouhui.github.io.git
cd higherzhouhui.github.io
npm i
npm run dev
```

本地开发地址：http://localhost:5173/

```bash
npm run build
npm run preview
```

推送到 `main` 后，GitHub Actions 会构建并发布到 GitHub Pages。仓库 Settings → Pages → Source 选择 **GitHub Actions**。
