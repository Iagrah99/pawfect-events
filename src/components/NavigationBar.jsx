import { Container, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Nav from "react-bootstrap/Nav";
import navIcon from "../images/de-nav-icon-transparent.png";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLink = (e) => {
    e.preventDefault();
    const target = e.target.id === "home" ? "/" : `/${e.target.id}`;
    navigate(target);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-zinc-900" sticky="top">
      <Container>
        {/* Brand and Logo */}
        <Navbar.Brand
          id="home"
          className="flex items-center cursor-pointer text-white"
          onClick={handleLink}
        >
          <img src={navIcon} className="w-8 h-8 md:w-10 md:h-10 mr-2" alt="Logo" />
          <span className="text-lg md:text-xl font-semibold">Pawfect Events</span>
        </Navbar.Brand>
        {/* Navbar Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="ms-auto flex-grow-1 justify-end">
            {loggedInUser ? (
              <div className="flex flex-col md:flex-row md:items-center items-start space-y-3 md:space-y-0 md:space-x-10">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <Nav.Item className="text-cyan-50 text-sm md:text-base">
                    Hello, {loggedInUser.username}
                  </Nav.Item>
                  <img
                    src={loggedInUser.avatar_url}
                    alt="User Avatar"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-700 shadow-lg cursor-pointer"
                    onClick={() => navigate(`/users/${loggedInUser.user_id}`)}
                  />
                </div>

                {loggedInUser.is_organiser && (
                  <Nav.Item
                    className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                    id="create-event"
                    onClick={() => navigate('/create-event')}
                  >
                    Create Event
                  </Nav.Item>
                )}

                <Nav.Item
                  className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                  id="logout"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Item>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <Nav.Item
                  className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                  id="login"
                  onClick={handleLink}
                >
                  Login
                </Nav.Item>
                <Nav.Item
                  className="text-cyan-50 text-sm md:text-base hover:text-cyan-200 cursor-pointer"
                  id="register"
                  onClick={handleLink}
                >
                  Sign Up
                </Nav.Item>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
