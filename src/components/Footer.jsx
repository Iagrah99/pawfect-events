import { useNavigate } from "react-router-dom";
import navIcon from "../images/pe-nav-logo.png";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Footer = ({ page }) => {
  const navigate = useNavigate();

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLink = (e) => {
    e.preventDefault();
    const target = e.target.id === "home" ? "/" : `/${e.target.id}`;
    navigate(target);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <footer
      className={`${
        page === "home" ? "bg-slate-900" : "bg-slate-900"
      } text-white py-8`}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div
          id="/"
          onClick={handleLink}
          className="flex items-center cursor-pointer select-none text-white"
        >
          <img src={navIcon} alt="Logo" className="w-40 md:w-52 mr-2" />
        </div>

        <p className="hidden text-base mb-0">
          &copy; {new Date().getFullYear()} Pawfect Events.
        </p>

        <ul className="flex pl-0 space-x-3 md:space-x-6 text-sm md:text-base mb-0">
          <li
            className="md:hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="md:hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/events")}
          >
            Events
          </li>
          <li
            className={`md:hover:text-orange-500 ${
              loggedInUser?.is_organiser ? "block" : "hidden"
            } cursor-pointer`}
            onClick={() => navigate("/create-event")}
          >
            Create Event
          </li>
          <li
            className={`md:hover:text-orange-500 ${
              loggedInUser ? "block" : "hidden"
            } cursor-pointer`}
            onClick={handleLogout}
          >
            Logout
          </li>
          <li
            className={`md:hover:text-orange-500 ${
              loggedInUser && "hidden"
            } cursor-pointer`}
            onClick={() => navigate("/login")}
          >
            Login
          </li>
          <li
            className={`md:hover:text-orange-500 ${
              loggedInUser && "hidden"
            } cursor-pointer`}
            onClick={() => navigate("/register")}
          >
            Sign up
          </li>
        </ul>

        <p className="text-sm md:text-base mb-0">
          &copy; {new Date().getFullYear()} Pawfect Events.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
