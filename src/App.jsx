import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import ViewEvent from "./pages/EventById.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/events/:event_id' element={<ViewEvent />} />
    </Routes>
  )
}
