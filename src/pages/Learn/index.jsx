import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { isSubject, shanghaiToday } from './learn.js'
import LearnHub from './LearnHub.jsx'
import LearnLesson from './LearnLesson.jsx'

function TodayShortcut() {
  const { subject } = useParams()
  if (!isSubject(subject)) return <Navigate to="/learn" replace />
  return <Navigate to={`/learn/${subject}/${shanghaiToday()}`} replace />
}

export default function LearnIndex() {
  return (
    <Routes>
      <Route index element={<LearnHub />} />
      <Route path=":subject" element={<TodayShortcut />} />
      <Route path=":subject/:date" element={<LearnLesson />} />
    </Routes>
  )
}
