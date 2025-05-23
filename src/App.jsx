import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Events from "./pages/Events";
import ViewEvent from "./pages/EventById.jsx";
import UserById from "./pages/UserById.jsx";
import Login from "./pages/Login.jsx";
import Error from "./components/Error.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const { setLoggedInUser } = useContext(UserContext);
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, [setLoggedInUser]);

  function ScrollToTopOnRouteChange() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:event_id" element={<ViewEvent />} />
        <Route path="/users/:user_id" element={<UserById />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}
