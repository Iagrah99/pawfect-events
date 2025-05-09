import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import navIcon from "../images/pe-nav-logo.png";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLink = (e) => {
    e.preventDefault();
    const target =
      e.target.id === "home" ? "/" : `/${e.target.id}`.toLowerCase();
    navigate(target);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <nav
      className="bg-slate-900 sticky top-0 border-1 border-slate-800 z-50"
      style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-24">
          {/* Brand */}
          <div
            id="/"
            onClick={handleLink}
            className="flex items-center cursor-pointer select-none text-white"
          >
            <img
              src={navIcon}
              alt="Logo"
              className="w-40 md:w-60"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex lg:gap-0 space-x-6">
            <span
              className="text-cyan-50 text-sm md:text-base hover:text-orange-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>

            <span
              className="text-cyan-50 text-sm md:text-base hover:text-orange-500 cursor-pointer"
              onClick={() => navigate("/events")}
            >
              Events
            </span>
            {loggedInUser ? (
              <>
                {loggedInUser.is_organiser && (
                  <span
                    className="text-cyan-50 text-sm md:text-base hover:text-orange-500 cursor-pointer"
                    onClick={() => navigate("/create-event")}
                  >
                    Create Event
                  </span>
                )}

                <span
                  className="text-cyan-50 text-sm md:text-base hover:text-orange-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <span
                  className="text-cyan-50 text-sm md:text-base hover:text-orange-500 cursor-pointer"
                  onClick={handleLink}
                  id="login"
                >
                  Login
                </span>
                <span
                  className="text-cyan-50 text-sm md:text-base hover:text-orange-500 cursor-pointer"
                  onClick={handleLink}
                  id="register"
                >
                  Sign Up
                </span>
              </>
            )}
          </div>

          {loggedInUser && (
            <div className="hidden md:flex justify-start items-center pr-12">
              <img
                src={loggedInUser?.avatar_url}
                alt="User Avatar"
                className="w-11 h-11 rounded-full shadow cursor-pointer"
                onClick={() => navigate(`/users/${loggedInUser.user_id}`)}
              />
            </div>
          )}

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
        <div className="md:hidden bg-slate-900 px-3">
          <div className={`flex ${loggedInUser ? 'justify-between pb-2' : 'justify-center pb-3'}   items-center`}>
            {/* Left side: Always-visible links */}
            <div className='flex flex-row items-center gap-3'>
              <span
                className="text-cyan-50 text-sm md:text-base cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              <span
                className="text-cyan-50 text-sm md:text-base cursor-pointer"
                onClick={() => navigate("/events")}
              >
                Events
              </span>

              {loggedInUser ? (
                <>
                  {loggedInUser.is_organiser && (
                    <span
                      className="text-cyan-50 text-sm md:text-base cursor-pointer"
                      onClick={() => navigate("/create-event")}
                    >
                      Create Event
                    </span>
                  )}
                  <span
                    className="text-cyan-50 text-sm md:text-base cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="text-cyan-50 text-sm md:text-base cursor-pointer"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </span>
                  <span
                    className="text-cyan-50 text-sm md:text-base cursor-pointer"
                    onClick={() => navigate('/register')}
                  >
                    Sign Up
                  </span>
                </>
              )}
            </div>

            {/* Right side: Avatar (if logged in) */}
            {loggedInUser && (
              <img
                src={loggedInUser.avatar_url}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 mb-2 border-gray-700 shadow-md cursor-pointer"
                onClick={() => navigate(`/users/${loggedInUser.user_id}`)}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
