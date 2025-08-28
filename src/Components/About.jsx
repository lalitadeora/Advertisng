import React, { useState } from "react";
import "./AboutUs.css"; // CSS फाइल इंपोर्ट करें
import Footer from "./Footer";
import { Link } from "react-router-dom";
const AboutUs = () => {
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
        <nav className="navbar" style={{ backgroundColor: "#e9e766" }}>
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
      <div className="about-container">
        {/* Yellow Header Section */}
        <div className="about-header">
          <h2>About us</h2>
          <p>
            Display your advertisement on our digital billboards and <br />
            reach thousands of people.
          </p>
        </div>

        {/* Content Section */}
        <div className="about-content">
          {/* Images Section */}
          <div className="about-images">
            <img src="/img/place1.jpg" alt="Billboard 1" />
            <img src="/img/place5.png" alt="Billboard 2" />
            <img src="/img/place3.jpg" alt="Billboard 3" />
          </div>

          {/* Text Section */}
          <div className="about-text">
            <p>
              At <b>Deora Advertising Company</b>, we provide digital
              advertising services to take your business to new heights. Display
              your advertisement on our <b>digital billboards</b> and reach
              thousands of people. With affordable prices and attractive
              packages, we promote your business at the right time and place. We
              strengthen your brand identity by delivering your advertisements
              to the right audience.
            </p>
            <b>More information:</b>
            <p>
              We are Deora Advertising Company, a leading provider of digital
              billboard advertising solutions. Our mission is to connect your
              brand and services to the right audience using advanced
              technologies. Our services include displaying your advertisements
              on prime digital billboards at key locations. Our platform allows
              you to choose locations, time slots, and dates as per your
              convenience. Additionally, we offer affordable pricing and a
              transparent pricing system to make your advertising experience
              simple and effective. With cutting-edge technology, we ensure your
              ad reaches the right audience at the right time. With Deora
              Advertising Company, your business can reach new heights.
            </p>
          </div>

          {/* Left-aligned text with right-side images */}
          <div className="about-section">
            <div className="about-left-text">
              <p>
                <b>Our Services :</b>
              </p>
              <p>
                Digital Billboard Advertising : We display high-quality
                advertisements on digital billboards at prime locations.
              </p>
              <p>
                Customization Options : Our platform allows you to choose
                locations, time slots, and dates as per your convenience.
              </p>
              <p>
                Affordable Pricing : We offer competitive and transparent
                pricing, including options for video and poster advertisements.
              </p>
              <p>
                Advanced Technology : Our system uses modern technology to
                ensure your advertisement reaches the right audience at the
                right time and place.
              </p>
            </div>
            <div className="about-right-image">
              <img src="/img/aboutimg1.png" alt="More Information" />
            </div>
          </div>

          {/* Right-aligned text with left-side image */}
          <div className="about-section reverse">
            <div className="about-left-image">
              <img src="/img/aboutimg2.png" alt="Our Mission" />
            </div>
            <div className="about-right-text">
              <p>
                <b>Our Mission:</b>
              </p>
              <p>
                Our mission is to empower businesses, both small and large, with
                the strength of digital advertising. We believe that effective
                advertising is the cornerstone of building brand identity and
                expanding your reach.
              </p>
              <p>
                Our mission is to connect your business, brand, and services
                with the right audience who value your offerings the most. At
                Deora Advertising Company, we aim to make digital advertising
                not only effective but also accessible to businesses of all
                sizes.
              </p>
            </div>
          </div>

          {/* Goals Section */}
          <div className="about-text">
            <p>
              <b>Our Goals Include:</b>
            </p>
            <p>
              Promoting Business Growth : Enhancing your brand visibility and
              connecting your business to new potential customers.
            </p>
            <p>
              Driving the Digital Revolution : Helping your business embrace
              modern technologies through digital billboard advertising.
            </p>
            <p>
              Flexibility and Customization : Offering the freedom to select
              locations, time slots, and advertisement types based on your
              unique needs.
            </p>
            <p>
              Cost-Effective Solutions : Providing affordable and transparent
              pricing to ensure maximum return on investment.
            </p>

            <b>Our Features:</b>
            <p>
              Simple and hassle - free ad booking process. Real-time updates on
              availability and booking. Options to display ads across multiple
              locations simultaneously. Custom pricing based on video ad
              duration and design. Our mission is not just to display ads but to
              provide strategies that ensure long-term success and recognition
              for your business.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
