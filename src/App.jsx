import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shell from './components/layout/Shell.jsx'
import { ARTICLE_PAGES } from './content/routes.js'
import { I18nProvider } from './i18n/I18nProvider.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import Home from './pages/Home.jsx'
import LabIndex from './pages/LabIndex.jsx'
import DiaryIndex from './pages/Diary/index.jsx'
import LabPrinter from './pages/LabPrinter.jsx'
import LabScroll from './pages/LabScroll.jsx'
import LabWater from './pages/LabWater.jsx'
import NotFound from './pages/NotFound.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <Shell>
            <Routes>
              <Route path="/" element={<Home />} />
              {ARTICLE_PAGES.flatMap((page) =>
                page.paths.map((path) => (
                  <Route key={path} path={path} element={<ArticlePage pageKey={page.pageKey} />} />
                )),
              )}
              <Route path="/diary/*" element={<DiaryIndex />} />
              <Route path="/lab" element={<LabIndex />} />
              <Route path="/pages/cssanimation.html" element={<LabIndex />} />
              <Route path="/lab/water" element={<LabWater />} />
              <Route path="/pages/cssanimation/waterCss.html" element={<LabWater />} />
              <Route path="/lab/scroll" element={<LabScroll />} />
              <Route path="/pages/cssanimation/textScroll.html" element={<LabScroll />} />
              <Route path="/lab/printer" element={<LabPrinter />} />
              <Route path="/pages/studytest.html" element={<LabPrinter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Shell>
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  )
}
