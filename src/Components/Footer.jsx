import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-columns">
          <div className="column">
            <ul>
              <li>
                <Link to="book">Book your screen</Link>
              </li>
              <li>
                <Link to="#">Current booking</Link>
              </li>
              <li>
                <Link to="#">Previous booking</Link>
              </li>
              <li>
                <Link to="#">Payment history</Link>
              </li>
              <li>
                <Link to="#">Hot booking</Link>
              </li>
              <li>
                <Link to="#">Booking more features</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="aboutus">About us</Link>
              </li>
              <li>
                <Link to="contactus">Contact us</Link>
              </li>
              <li>
                <Link to="login">Login</Link>
              </li>
              <li>
                <Link to="login">New user / sign</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <ul>
              <li>
                <Link to="#">Feedback</Link>
              </li>
              <li>
                <Link to="queries">Your queries</Link>
              </li>
              <li>
                <Link to="#">Our pricing</Link>
              </li>
              <li>
                <Link to="bigclients">Our big clients</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <ul>
              <li>
                <Link to="/privacypolicy">Privacy policy</Link>
              </li>
              <li>
                <Link to="privacypolicy">Terms and conditions</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>
              </li>
              <li>
                <Link to="#">Service</Link>
              </li>
            </ul>
          </div>
          <div className="column"></div> {/* Empty column */}
        </div>
        <div className="footer-bottom">
          <p>© Copyright by deoraadvertising 2025</p>
          <div className="social-media">
            <a href="#">
              <img src="../img/whatsapp.png" alt="WhatsApp" />
            </a>
            <a href="#">
              <img src="../img/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="#">
              <img src="../img/x.png" alt="X" />
            </a>
            <a href="#">
              <img src="../img/Facebook.png" alt="Facebook" />
            </a>
            <a href="#">
              <img src="../img/YouTube.png" alt="YouTube" />
            </a>
            <a href="#">
              <img src="../img/Gmail.png" alt="Gmail" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
