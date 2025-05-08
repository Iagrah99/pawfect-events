import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faB, faBars } from "@fortawesome/free-solid-svg-icons";
import navIcon from "../images/de-nav-icon-transparent.png";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
    <nav className="bg-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand */}
          <div
            id="/"
            onClick={handleLink}
            className="flex items-center cursor-pointer select-none text-white"
          >
            <img
              src={navIcon}
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10 mr-2"
            />
            <span className="text-lg md:text-xl font-semibold">
              Pawfect Events
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex lg:gap-0 space-x-6">
            {loggedInUser ? (
              <>
                {loggedInUser.is_organiser && (
                  <span
                    className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                    onClick={() => navigate("/create-event")}
                  >
                    Create Event
                  </span>
                )}

                <span
                  className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <span
                  className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                  onClick={handleLink}
                  id="login"
                >
                  Login
                </span>
                <span
                  className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                  onClick={handleLink}
                  id="register"
                >
                  Sign Up
                </span>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <img
              src={loggedInUser.avatar_url}
              alt="User Avatar"
              className="w-11 h-11 rounded-full shadow cursor-pointer"
              onClick={() => navigate(`/users/${loggedInUser.user_id}`)}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-white focus:outline-none"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-slate-700 px-3 py-1">
          {loggedInUser ? (
            <div className="flex justify-between items-center">
              {/* Left side: Links */}
              <div className="flex flex-row items-center gap-3">
                {loggedInUser.is_organiser && (
                  <span
                    className="text-cyan-50 hover:text-cyan-200 cursor-pointer"
                    onClick={() => navigate("/create-event")}
                  >
                    Create Event
                  </span>
                )}
                <span
                  className="text-cyan-50 hover:text-cyan-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>

              {/* Right side: Avatar */}
              <img
                src={loggedInUser.avatar_url}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-md cursor-pointer"
                onClick={() => navigate(`/users/${loggedInUser.user_id}`)}
              />
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {/* Left side: Guest links */}
              <div className="flex flex-col space-y-2">
                <span
                  className="text-cyan-50 hover:text-cyan-200 cursor-pointer"
                  onClick={handleLink}
                >
                  Login
                </span>
                <span
                  className="text-cyan-50 hover:text-cyan-200 cursor-pointer"
                  onClick={handleLink}
                >
                  Sign Up
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
