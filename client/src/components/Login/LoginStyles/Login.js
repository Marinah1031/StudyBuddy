import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import "./Login.css";


function Login() {
  useEffect(() => {
    const handleSignUpClick = ( event ) => {
      event.preventDefault();

      const wrapper = document.querySelector('.wrapper');
      wrapper.classList.add('animate-signIn');
      wrapper.classList.remove('animate-signUp');
    };

    const handleSignInClick = (event ) => {
      event.preventDefault();
      const wrapper = document.querySelector('.wrapper');
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    };

    const signUpLink = document.querySelector('.signUp-link');
    const signInLink = document.querySelector('#login');

    signUpLink.addEventListener('submit', handleSignUpClick);
    signInLink.addEventListener('submit', handleSignInClick);

    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      signUpLink.removeEventListener('submit', handleSignUpClick);
      signInLink.removeEventListener('submit', handleSignInClick);
    };
  }, []);

  return (
    <section>
        <Container className="navbar">
            <Navbar/>
        </Container>
      <Container className="type-container">
        <div className="wrapper">
          <div className="form-wrapper sign-up">
            <form action="">
              <h2>Sign Up</h2>
              <div className="input-group">
                <input type="text" required />
                <label htmlFor="">Username</label>
              </div>
              <div className="input-group">
                <input type="email" required />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-group">
                <input type="password" required />
                <label htmlFor="">Password</label>
              </div>
              <button type="submit" className="btn">
                Sign Up
              </button>
              <div className="sign-link">
                <p>
                  Already have an account?{" "}
                  <a href="#" className="signIn-link">
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="form-wrapper sign-in">
            <form id="login">
              <h2>Login</h2>
              <div className="input-group">
                <input type="text" required />
                <label htmlFor="">Username</label>
              </div>
              <div className="input-group">
                <input type="password" required />
                <label htmlFor="">Password</label>
              </div>
              <div className="forgot-pass">
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              <div className="sign-link">
                <p>
                  Don't have an account?{" "}
                  <a href="#" className="signUp-link">
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Login;