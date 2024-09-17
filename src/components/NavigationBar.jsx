import { Container, Navbar } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import navIcon from '../images/de-nav-icon-transparent.png'

const NavigationBar = () => {

  const navigate = useNavigate();

  const handleLink = (e) => {
    e.preventDefault()
    if (e.target.id === "/" || e.target.id === "home") {
      navigate("/")
    } else {
      navigate(`/${e.target.id}`)
    }
  }

  return (
    <Navbar expand="lg" className="bg-zinc-900" sticky='top'>
      <Container>

        <Navbar.Brand id='home' className="flex items-center cursor-pointer" onClick={handleLink}>
          <img src={navIcon} className="w-10 h-10 mr-1" alt="Logo" />
          <span>Pawfect Events</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-end">
            <Nav.Link className=" text-cyan-50 hover:text-cyan-200" id='login'>Login</Nav.Link>
            <Nav.Link className=" text-cyan-50 hover:text-cyan-200" id='register'>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
