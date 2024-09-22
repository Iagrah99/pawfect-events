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
        <Navbar.Brand id="home" className="flex items-center cursor-pointer" onClick={handleLink}>
          <img src={navIcon} className="w-10 h-10 mr-1" alt="Logo" />
          <span>Pawfect Events</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow">
            {loggedInUser ? (
              <div className="ml-auto flex items-center space-x-4">
                <Nav.Item className="text-cyan-50">
                  Hello, {loggedInUser.username}!
                </Nav.Item>

                <img
                  src={loggedInUser.avatar_url}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-lg ml-2 cursor-pointer"
                  onClick={() => navigate(`/users/${loggedInUser.user_id}`)}
                />

                {loggedInUser.is_organiser && (
                  <Nav.Item
                    className="text-cyan-50 hover:text-cyan-200 cursor-pointer"
                    id="create-event"
                    onClick={() => navigate('/create-event')}
                  >
                    Create Event
                  </Nav.Item>
                )}

                <Nav.Item
                  className="text-cyan-50 hover:text-cyan-200 cursor-pointer ml-6"
                  id="logout"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Item>
              </div>

            ) : (
              <div className="ml-auto flex space-x-4">
                <Nav.Item className="text-cyan-50 hover:text-cyan-200 cursor-pointer" id="login" onClick={handleLink}>
                  Login
                </Nav.Item>
                <Nav.Item className="text-cyan-50 hover:text-cyan-200 cursor-pointer" id="register" onClick={handleLink}>
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
