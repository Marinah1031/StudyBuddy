import React, { useEffect } from "react";
import "./Navbar.scss";
import { applyBounceAnimation } from './Animate';
import Auth from "../../utils/auth";
import { Link } from 'react-router-dom';


function Navbar() {
  useEffect(() => {
    applyBounceAnimation();
  }, []);

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li><Link id="len1" className="hoverable" to="/">Home</Link></li>
            {Auth.loggedIn() ? (
              <>
                <li><Link id="len2" className="hoverable" to="/main">Main</Link></li>
                <li><Link id="len3" className="hoverable" to="/userpage">User Page</Link></li>
                <li><a id="len4" className="hoverable" href="/" onClick={() => Auth.logout()}>
              Logout
            </a></li>
                <li><Link id="len4" className="hoverable" to="/Contact">Contact</Link></li>
                
              </>
            ) : (
              <li><Link id="len2" className="hoverable" to="/login">Login/Signup</Link></li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;







