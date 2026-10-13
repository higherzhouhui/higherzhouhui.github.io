import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LegacyPage from './components/LegacyPage.jsx'
import StudyTest from './pages/StudyTest.jsx'
import TextScroll from './pages/TextScroll.jsx'
import apiHtml from './legacy/api.html?raw'
import cssAnimationHtml from './legacy/cssanimation.html?raw'
import engineeringHtml from './legacy/engineering.html?raw'
import homeHtml from './legacy/home.html?raw'
import icssHtml from './legacy/icss.html?raw'
import ihtmlHtml from './legacy/ihtml.html?raw'
import ijsHtml from './legacy/ijs.html?raw'
import ireactHtml from './legacy/ireact.html?raw'
import ivueHtml from './legacy/ivue.html?raw'
import searchWorkHtml from './legacy/searchWork.html?raw'
import waterCssHtml from './legacy/waterCss.html?raw'
import workhelpHtml from './legacy/workhelp.html?raw'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LegacyPage html={homeHtml} title="风中追风的博客" />} />
        <Route path="/pages/ihtml.html" element={<LegacyPage html={ihtmlHtml} title="HTML5" />} />
        <Route path="/pages/ijs.html" element={<LegacyPage html={ijsHtml} title="JavaScript" />} />
        <Route path="/pages/icss.html" element={<LegacyPage html={icssHtml} title="CSS" />} />
        <Route path="/pages/ireact.html" element={<LegacyPage html={ireactHtml} title="REACT" />} />
        <Route path="/pages/ivue.html" element={<LegacyPage html={ivueHtml} title="VUE" />} />
        <Route path="/pages/api.html" element={<LegacyPage html={apiHtml} title="API以及常用工具网站" />} />
        <Route path="/pages/searchWork.html" element={<LegacyPage html={searchWorkHtml} title="面试精题" />} />
        <Route path="/pages/workhelp.html" element={<LegacyPage html={workhelpHtml} title="常用函数" />} />
        <Route path="/pages/engineering.html" element={<LegacyPage html={engineeringHtml} title="前端工程化" />} />
        <Route path="/pages/cssanimation.html" element={<LegacyPage html={cssAnimationHtml} title="CSS动画" />} />
        <Route path="/pages/cssanimation/waterCss.html" element={<LegacyPage html={waterCssHtml} title="水滴" />} />
        <Route path="/pages/cssanimation/textScroll.html" element={<TextScroll />} />
        <Route path="/pages/studytest.html" element={<StudyTest />} />
      </Routes>
    </BrowserRouter>
  )
}
