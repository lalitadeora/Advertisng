import React, { useState } from "react";
import "./Login.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  /* Navbar...*/

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    console.log("Toggle clicked, isMobilemenuOpen:", !isMobileMenuOpen);
  };

  /* Navbar End...*/
  return (
    <>
      {" "}
      <>
        <nav className="navbar" style={{ backgroundColor: "#2CA089" }}>
          <div className="logo">
            <img src="../img/logoimage.png" alt="Logo" />
          </div>
          <div className="nav-content">
            <ul className="nav-links-desktop">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/aboutus">ABOUT US</Link>
              </li>
              <li>
                <Link to="/contactus">CONTACT US</Link>
              </li>
              <li>
                <Link to="/book">BOOK NOW</Link>
              </li>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            </ul>
            <div className="nav-right">
              <div
                className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
                onClick={toggleMobileMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </nav>

        <div className={`drawer ${isMobileMenuOpen ? "drawer-open" : ""}`}>
          <div className="drawer-header">
            <span className="close-btn" onClick={toggleMobileMenu}></span>
          </div>
          <ul className="drawer-links">
            <li>
              <a href="#" onClick={toggleMobileMenu}>
                Switch Account
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleMobileMenu}>
                Login
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleMobileMenu}>
                Logout
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleMobileMenu}>
                Sign in
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleMobileMenu}>
                sign out
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleMobileMenu}>
                Blogs
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleMobileMenu}>
                Career
              </a>
            </li>
          </ul>
        </div>
      </>
      <div className="login-container">
        <div className={`login-box ${isLogin ? "" : "active"}`}>
          {/* Left Panel */}
          <div className="left-panel">
            <h2>{isLogin ? "Welcome Back!" : "Hello, Friend!"}</h2>
            <p>
              {isLogin
                ? "To keep connected with us, please login with your company / business / personal info."
                : "Enter your company / business / personal details and start your journey with us!"}
            </p>
            <button className="toggle-btn" onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            <div className="form-wrapper">
              {/* Login Form */}
              <div className={`form-content ${isLogin ? "show" : "hide"}`}>
                <h2>Login</h2>
                <div className="social-icon">
                  <button className="social-btn">
                    <img src="/img/Facebook.png" alt="Facebook" />
                  </button>
                  <button className="social-btn">
                    <img src="/img/Google.png" alt="Google" />
                  </button>
                  <button className="social-btn">
                    <img src="/img/linkedin.png" alt="LinkedIn" />
                  </button>
                </div>
                <p>or use your email account</p>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forgot your password?</a>
                <button>Login</button>
              </div>

              {/* Sign Up Form */}
              <div className={`form-content ${isLogin ? "hide" : "show"}`}>
                <h2>Create Account</h2>
                <div className="social-icon">
                  <button className="social-btn">
                    <img src="/img/Facebook.png" alt="Facebook" />
                  </button>
                  <button className="social-btn">
                    <img src="/img/Google.png" alt="Google" />
                  </button>
                  <button className="social-btn">
                    <img src="/img/linkedin.png" alt="LinkedIn" />
                  </button>
                </div>
                <p>or fill these out to registration</p>
                <input type="text" placeholder="Your/business Name" />
                <input type="text" placeholder="Your/business E-mail" />
                <input type="text" placeholder="OTP on E-mail" />
                <input type="text" placeholder="Your/business Mobile no." />
                <input type="text" placeholder="OTP on Mobile no." />
                <input type="password" placeholder="Password" />
                <button>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
