import React, { useEffect } from "react";
import "./Navbar.scss";
import { applyBounceAnimation } from './Animate';
import Auth from "../../utils/auth";

function Navbar() {
  useEffect(() => {
    applyBounceAnimation();
  }, []);

  console.log(Auth.loggedIn());

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><a id="len1" className="hoverable" href="/">Home</a></li>
            {Auth.loggedIn() ? (
              <>
                <li><a id="len2" className="hoverable" href="/main">Main</a></li>
                <li><a id="len3" className="hoverable" href="/logout">Logout</a></li>
                <li><a id="len4" className="hoverable" href="/Contact">Contact</a></li>
                
              </>
            ) : (
              <li><a id="len2" className="hoverable" href="/login">Login/Signup</a></li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
