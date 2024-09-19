import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import ViewEvent from "./pages/EventById.jsx"
import UserById from "./pages/UserById.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/events/:event_id' element={<ViewEvent />} />
      <Route path='/users/:user_id' element={<UserById />} />
    </Routes>
  )
}
