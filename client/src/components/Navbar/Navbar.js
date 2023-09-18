import React, { useEffect } from "react";
import "./Navbar.scss"; // Import the SCSS styles
import { applyBounceAnimation } from './Animate'; // Import the bounce animation function
import Auth from "../../utils/auth"; // Import authentication utility
import { Link } from 'react-router-dom';

function Navbar() {
  // Apply bounce animation when the component mounts
  useEffect(() => {
    applyBounceAnimation();
  }, []);

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            {/* Home link */}
            <li><Link id="len1" className="hoverable" to="/">Home</Link></li>
            
            {/* Conditionally render links based on user authentication */}
            {Auth.loggedIn() ? (
              <>
                {/* Main link */}
                <li><Link id="len2" className="hoverable" to="/main">Main</Link></li>
                
                {/* User Page link */}
                <li><Link id="len3" className="hoverable" to="/userpage">User Page</Link></li>
                
                {/* Logout button */}
                <li><a id="len4" className="hoverable" href="/" onClick={() => Auth.logout()}>
                  Logout
                </a></li>
              </>
            ) : (
              // Login/Signup link for non-authenticated users
              <li><Link id="len2" className="hoverable" to="/login">Login/Signup</Link></li>
            )}
            
            {/* Support Us link */}
            <li><Link id="len3" className="hoverable" to="/supportUs">Support Us</Link></li>
            
            {/* Contact Us link */}
            <li><Link id="len4" className="hoverable" to="/Contact">Contact Us</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
