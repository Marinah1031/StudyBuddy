import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Navbar.scss";
import { applyBounceAnimation } from './Animate';

function Navbar() {
  useEffect(() => {
    applyBounceAnimation(); // Call the animation function when the component mounts
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><a id="len1" className="hoverable" href="/">Home</a></li>
            <li><a id="len2" className="hoverable" href="/login">Login/Signup</a></li>
            <li><a id="len3" className="hoverable" href="/Contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
