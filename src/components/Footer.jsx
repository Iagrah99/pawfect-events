import { useNavigate } from "react-router-dom";
import navIcon from "../images/de-nav-icon-transparent.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleLink = (e) => {
    e.preventDefault();
    const target = e.target.id === "home" ? "/" : `/${e.target.id}`;
    navigate(target);
  };

  return (
    <footer className="bg-slate-900 text-white py-6 md:mt-10">
      <div className="container mx-auto px-4 h-10 flex flex-row justify-between items-center">
        <div
          id="/"
          onClick={handleLink}
          className="flex items-center cursor-pointer select-none text-white"
        >
          <img
            src={navIcon}
            alt="Logo"
            className="w-6 h-6 md:w-8 md:h-8 mr-2"
          />
          <span className="text-base md:text-lg font-semibold">
            Pawfect Events
          </span>
        </div>

        <p className="text-sm mb-0">
          &copy; {new Date().getFullYear()} Pawfect Events.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
