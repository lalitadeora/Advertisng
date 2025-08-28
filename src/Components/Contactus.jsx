import React, { useState } from "react";
import "./contactus.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const ContactUs = () => {
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
        <nav className="navbar" style={{ backgroundColor: "#20c997" }}>
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
      <div className="contact-us-container">
        {/* हेडर सेक्शन */}
        <div className="contact-header">
          <h1>Contact us</h1>
        </div>
        <div className="c-i-t">
          <div className="contact-info-tab">
            <span className="dot">🟡</span> Contact info{" "}
            <span className="dot">🟡</span>
          </div>
          <h2>
            <span className="contact-red">Contact</span>
            <span className="contact-black"> & Join Together</span>
          </h2>
          <p className="contact-text">
            Use the details below to contact us. We are always
            <br /> here to assist you
          </p>
        </div>
        <div class="contact-details">
          <div class="contact-box">
            <img
              src="../img/location.png"
              alt="Location Icon"
              class="contact-box-icons"
            />
            <div class="contact-text">
              <h3>Location..</h3>
              <h1 class="highlight-text">Visit Us At</h1>
              <p>65, street Jodhpur (raj.)</p>
              <p>58, street Jaipur (raj.)</p>
            </div>
          </div>
          <div class="contact-box">
            <img
              src="../img/call.png"
              alt="Call Icon"
              class="contact-box-icons"
            />
            <div class="contact-text">
              <h3>24*7 service..</h3>
              <h1 class="highlight-text">Call Us On</h1>
              <p>Mob. +91-123-4567890</p>
              <p>Wh.app. 1234567890</p>
            </div>
          </div>
          <div class="contact-box">
            <img
              src="../img/mail.png"
              alt="Mail Icon"
              class="contact-box-icons"
            />
            <div class="contact-text">
              <h3>Drop a mail..</h3>
              <h1 class="highlight-text">Mail Address</h1>
              <p>deoradvertising67@gmail.com</p>
              <p>deoradvertising67@gmail.com</p>
            </div>
          </div>
          <div class="contact-box">
            <img
              src="../img/watch.png"
              alt="Clock Icon"
              class="contact-box-icons"
            />
            <div class="contact-text">
              <h3>Office Hours..</h3>
              <h1 class="highlight-text">Opening Time</h1>
              <p>Mon - Sat : 9am to 6pm</p>
              <p>Sunday (closed)</p>
            </div>
          </div>
        </div>

        {/* फूटर सेक्शन - सोशल मीडिया और फॉर्म */}
        <div className="contact-footer">
          <div className="contact-container">
            <div className="social-section">
              <p>
                <span className="we-also">We also</span>{" "}
                <span className="available-on">available on</span>
              </p>

              <div className="social-icons-container">
                <div className="icons-bg">
                  <a href="https://wa.me/your_number" target="_blank">
                    <img
                      src="../img/whatsapp.png"
                      alt="WhatsApp"
                      className="social-icons"
                    />
                  </a>
                  <a href="https://linkedin.com/your_profile" target="_blank">
                    <img
                      src="../img/linkedin.png"
                      alt="LinkedIn"
                      className="social-icons"
                    />
                  </a>
                  <a href="https://x.com/your_profile" target="_blank">
                    <img src="../img/x.png" alt="X" className="social-icons" />
                  </a>
                  <a href="https://facebook.com/your_page" target="_blank">
                    <img
                      src="../img/Facebook.png"
                      alt="Facebook"
                      className="social-icons"
                    />
                  </a>
                  <a href="https://youtube.com/your_channel" target="_blank">
                    <img
                      src="../img/YouTube.png"
                      alt="YouTube"
                      className="social-icons"
                    />
                  </a>
                  <a href="mailto:your_email@gmail.com">
                    <img
                      src="../img/Gmail.png"
                      alt="Gmail"
                      className="social-icons"
                    />
                  </a>
                </div>
              </div>

              <div className="assist-text">
                <p className="red">For</p>
                <p className="blue">24*7</p>
                <p className="black">to assist you</p>
              </div>
            </div>

            <div className="contact-image">
              <img src="../img/service.png" alt="Contact Person" />
            </div>

            <div className="form-section">
              <h2>
                <span className="reach">Reach</span>{" "}
                <span className="black">& Get in Touch With Us!</span>
              </h2>
              <form>
                <input
                  type="text"
                  placeholder="Your or company name*"
                  required
                />
                <input
                  type="email"
                  placeholder="Your or company e-mail*"
                  required
                />
                <input
                  type="text"
                  placeholder="Your or company number*"
                  required
                />
                <textarea placeholder="Your queries*" required></textarea>
                <button type="submit" id="sub-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
