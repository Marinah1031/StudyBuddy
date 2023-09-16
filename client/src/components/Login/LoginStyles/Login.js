import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import "./Login.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../../../utils/mutations";
import Auth from "../../../utils/auth";

function Login(props) {
  useEffect(() => {
    const handleSignUpClick = () => {
      // event.preventDefault();

      const wrapper = document.querySelector(".wrapper");
      wrapper.classList.add("animate-signIn");
      wrapper.classList.remove("animate-signUp");
    };
    const handleSignInClick = () => {
      // event.preventDefault();
      const wrapper = document.querySelector(".wrapper");
      wrapper.classList.add("animate-signUp");
      wrapper.classList.remove("animate-signIn");
    };

    const signUpLink = document.querySelector(".signUp-link");
    const signInLink = document.querySelector(".signIn-link");

    signUpLink.addEventListener("click", handleSignUpClick);
    signInLink.addEventListener("click", handleSignInClick);

    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      signUpLink.removeEventListener("click", handleSignUpClick);
      signInLink.removeEventListener("click", handleSignInClick);
    };
  }, []);

  //code for handling the login form
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const [login, { error }] = useMutation(LOGIN_USER);

  const loginHandleChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(loginFormState);
      const loginResponse = await login({
        variables: {
          email: loginFormState.email,
          password: loginFormState.password,
        },
      });
      const token = loginResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  //code for handling the signin form
  const [signupFormState, setSignupFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const signupResponse = await addUser({
      variables: {
        username: signupFormState.username,
        email: signupFormState.email,
        password: signupFormState.password,
      },
    });
    const token = signupResponse.data.addUser.token;
    Auth.login(token);
  };

  const signupHandleChange = (event) => {
    const { name, value } = event.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  return (
    <section>
      <Container className='navbar'>
        <Navbar />
      </Container>
      <Container className='type-container'>
        <div className='wrapper'>
          <div className='form-wrapper sign-up'>
            <form onSubmit={handleSignupSubmit}>
              <h2>Sign Up</h2>
              <div className='input-group'>
                <input
                  type='username'
                  name='username'
                  id='username'
                  onChange={signupHandleChange}
                  required
                />
                <label htmlFor=''>Username</label>
              </div>
              <div className='input-group'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={signupHandleChange}
                  required
                />
                <label htmlFor=''>Email</label>
              </div>
              <div className='input-group'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={signupHandleChange}
                  required
                />
                <label htmlFor=''>Password</label>
              </div>
              <button type='submit' className='btn'>
                Sign Up
              </button>
              <div className='sign-link'>
                <p>
                  Already have an account?{" "}
                  <a className='signIn-link'>Sign In</a>
                </p>
              </div>
            </form>
          </div>

          <div className='form-wrapper sign-in'>
            <form onSubmit={handleSignInSubmit}>
              <h2>Login</h2>
              <div className='input-group'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={loginHandleChange}
                  required
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-group'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={loginHandleChange}
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>
              <div className='forgot-pass'>
                <a href='#'>Forgot Password?</a>
              </div>
              {error ? (
                <div>
                  <p className='error-text'>
                    Entered credentials do not match. Please try again.
                  </p>
                </div>
              ) : null}
              <button type='submit' className='btn'>
                Login
              </button>
              <div className='sign-link'>
                <p>
                  Don't have an account? <a className='signUp-link'>Sign Up</a>
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
