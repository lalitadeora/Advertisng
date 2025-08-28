import React, { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    console.log("Toggle clicked, isMobilemenuOpen:", !isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
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
  );
}
export default Navbar;
