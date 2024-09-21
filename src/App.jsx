import { Routes, Route } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import Home from "./pages/Home";
import ViewEvent from "./pages/EventById.jsx"
import UserById from "./pages/UserById.jsx"
import Login from "./pages/Login.jsx"

export default function App() {
  const { setLoggedInUser } = useContext(UserContext);
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, [setLoggedInUser]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/events/:event_id' element={<ViewEvent />} />
      <Route path='/users/:user_id' element={<UserById />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
