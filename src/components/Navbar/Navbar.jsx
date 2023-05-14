import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const handleNavToggle = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/home">Logo</Link>
      </div>
      <button className="navbar__toggle" onClick={handleNavToggle}>
        {showNav ? "Close" : "Menu"}
      </button>
      <ul className={`navbar__links ${showNav ? "show" : ""}`}>
        <li className="navbar__link">
          <Link to="/home">Notas</Link>
        </li>
        {/* <li className="navbar__link">
          <Link to="/profile">Services</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
