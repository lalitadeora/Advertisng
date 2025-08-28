import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function Home() {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sliderRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [forceSlideChange, setForceSlideChange] = useState(false);

  const slides = [
    { img: "", alt: "", title: "", price: "", tax: "" },
    {
      img: "../img/place1.jpg",
      alt: "Jodhpur",
      title: "Jodhpur, Rajasthan",
      price: "₹ 500 per slot",
      tax: "+ Applicable-Tax",
    },
    {
      img: "../img/place1.jpg",
      alt: "Jaipur",
      title: "Jaipur, Rajasthan",
      price: "₹ 700 per slot",
      tax: "+ Applicable-Tax",
    },
    {
      img: "../img/place2.jpg",
      alt: "Jaipur",
      title: "Jaipur, Rajasthan",
      price: "₹ 700 per slot",
      tax: "+ Applicable-Tax",
    },
    {
      img: "../img/place2.jpg",
      alt: "Jaipur",
      title: "Jaipur, Rajasthan",
      price: "₹ 700 per slot",
      tax: "+ Applicable-Tax",
    },
    {
      img: "../img/place2.jpg",
      alt: "choti chopad, jaipur",
      title: "Jaipur, Rajasthan",
      price: "₹ 700 per slot",
      tax: "+ Applicable-Tax",
    },
    {
      img: "../img/place3.jpg",
      alt: "MUMBAI",
      title: "Jaipur, Rajasthan",
      price: "₹ 700 per slot",
      tax: "+ Applicable-Tax",
    },
    {
      img: "../img/place3.jpg",
      alt: "Delhi",
      title: "Delhi",
      price: "₹ 900 per slot",
      tax: "+ Applicable-Tax",
    },
    { img: "", alt: "", title: "", price: "", tax: "" },
  ];

  const scrollLeft = () => {
    setCurrentIndex((prev) => {
      if (prev <= 1) {
        return slides.length - 2;
      }
      return prev - 1;
    });
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => {
      if (prev >= slides.length - 2) {
        return 1;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    let interval;
    if (!isPaused && !forceSlideChange) {
      interval = setInterval(() => {
        scrollRight();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPaused, forceSlideChange]);

  useEffect(() => {
    if (forceSlideChange) {
      const timeout = setTimeout(() => {
        if (!isPaused) {
          scrollRight();
          setForceSlideChange(false);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [forceSlideChange]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: (currentIndex - 1) * 320,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setForceSlideChange(true);
  };

  const clientSlides = [
    { img: "../img/suzuki.png", alt: "Suzuki" },
    { img: "../img/nestle.png", alt: "Nestle" },
    { img: "../img/nike.png", alt: "Nike" },
    { img: "../img/tata.png", alt: "Tata" },
    { img: "../img/suzuki.png", alt: "Suzuki" },
    { img: "../img/nestle.png", alt: "Nestle" },
    { img: "../img/nike.png", alt: "Nike" },
    { img: "../img/tata.png", alt: "Tata" },
    { img: "../img/suzuki.png", alt: "Suzuki" },
    { img: "../img/nestle.png", alt: "Nestle" },
    { img: "../img/nike.png", alt: "Nike" },
    { img: "../img/tata.png", alt: "Tata" },
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="hero" style={{ width: "40%" }}>
          <h1 className="text-container">
            <span className="line1">BOOK YOUR DIGITAL</span>
            <span className="line2">
              BILLBOARD <span className="highlight1">WITH US</span>!
            </span>
          </h1>
          <h2 className="qualities-heading">Our qualities:</h2>
          <div className="qualities">
            <div className="quality-box">
              <span className="text-white">Best service with </span>
              <span className="highlight-text">premiumness</span>
            </div>
            <div className="quality-box">
              <span className="text-white">at </span>
              <span className="highlight-text">Affordable price</span>
            </div>
            <div className="quality-box">
              <span className="highlight-text">Good service</span>
              <span className="text-white"> after selling</span>
            </div>
          </div>
        </section>

        <section className="what-we-do-section" style={{ width: "40%" }}>
          <div className="left-container">
            <h2 className="wwd-heading">What We Do?</h2>
            <p className="wwd-description">
              At <strong>Deora Advertising Company</strong>, we provide
              <span className="highlight">
                {" "}
                digital billboard advertising services{" "}
              </span>
              to take your business to new heights. With
              <span className="highlight">
                {" "}
                affordable prices and attractive packages{" "}
              </span>
              , we promote your business at the right time and place. We
              strengthen your brand identity by delivering your advertisements
              to the right audience.
              <a href="about.html" className="read-more-btn">
                (Read more)
              </a>
            </p>
          </div>
        </section>
        <section className="dashboard" style={{ width: "55%" }}>
          <div className="dashboard-header-bar">
            <strong>DASHBOARD : </strong> You can{" "}
            <span style={{ color: "yellow" }}>
              Book your digital billboard from here{" "}
            </span>
            and access more features
          </div>
          <div className="dashboard-grid">
            <Link to="/book" style={{ textDecoration: "none" }}>
              {" "}
              <button className="dash-btn">
                <img
                  src="../img/bookyourscreen.png"
                  className="dash-btn-icon"
                />
                <span className="dash-btn-text">BOOK YOUR SCREEN</span>
              </button>
            </Link>

            <Link to="/ourprice" style={{ textDecoration: "none" }}>
              <button className="dash-btn">
                <img src="../img/ourpricing.png" className="dash-btn-icon" />
                <span className="dash-btn-text">OUR PRICING</span>
              </button>
            </Link>
            <Link to="/queries" style={{ textDecoration: "none" }}>
              <button className="dash-btn">
                <img src="../img/yourqueries.png" className="dash-btn-icon" />
                <span className="dash-btn-text">YOUR QUERIES</span>
              </button>
            </Link>
            <button className="dash-btn">
              <img src="../img/currentbooking.png" className="dash-btn-icon" />
              <span className="dash-btn-text">CURRENT BOOKING</span>
            </button>
            <Link to="/bigclients" style={{ textDecoration: "none" }}>
              <button className="dash-btn">
                <img src="../img/ourbigclients.png" className="dash-btn-icon" />
                <span className="dash-btn-text">OUR BIG CLIENTS</span>
              </button>
            </Link>
            <button className="dash-btn">
              <img src="../img/feedback.png" className="dash-btn-icon" />
              <span className="dash-btn-text">FEEDBACK</span>
            </button>
            <button className="dash-btn">
              <img src="../img/previousbooking.png" className="dash-btn-icon" />
              <span className="dash-btn-text">PREVIOUS BOOKING</span>
            </button>
            <button className="dash-btn hot-booking">
              <img src="../img/hotbooking.png" className="dash-btn-icon" />
              <span className="dash-btn-text">HOT BOOKING</span>
            </button>

            <Link to="/privacypolicy" style={{ textDecoration: "none" }}>
              {" "}
              <button className="dash-btn">
                <img src="../img/privacypolicy.png" className="dash-btn-icon" />
                <span className="dash-btn-text">PRIVACY POLICY</span>
              </button>
            </Link>

            <button className="dash-btn">
              <img
                src="../img/bookingmorefeatures.png"
                className="dash-btn-icon"
              />
              <span className="dash-btn-text">BOOKING MORE FEATURES</span>
            </button>
            <button className="dash-btn">
              <img src="../img/paymenthistory.png" className="dash-btn-icon" />
              <span className="dash-btn-text">PAYMENT HISTORY</span>
            </button>
            <Link to="/employeelogin" style={{ textDecoration: "none" }}>
              <button className="dash-btn">
                <img src="../img/employelogin.png" className="dash-btn-icon" />
                <span className="dash-btn-text">EMPLOYE LOGIN</span>
              </button>
            </Link>
          </div>
        </section>

        <section className="places-section" style={{ width: "55%" }}>
          <h2 className="places-heading">
            <strong>OUR SOME PLACES : </strong> Where your{" "}
            <span style={{ color: "yellow" }}>Brand stands out</span>
          </h2>
          <div className="slider-wrapper">
            <button className="slider-btn left" onClick={scrollLeft}>
              {"<"}
            </button>
            <div className="slider-container" ref={sliderRef}>
              {slides.map((slide, index) => (
                <div
                  className={`place-card ${
                    index === currentIndex
                      ? "active"
                      : index ===
                          (currentIndex - 1 < 0
                            ? slides.length - 1
                            : currentIndex - 1) ||
                        index ===
                          (currentIndex + 1 >= slides.length
                            ? 0
                            : currentIndex + 1)
                      ? "visible"
                      : "hidden"
                  }`}
                  key={index}
                >
                  {slide.img ? (
                    <>
                      <img
                        src={slide.img}
                        alt={slide.alt}
                        className="place-image"
                      />
                      <div className="place-content">
                        <h3 className="place-title">{slide.title}</h3>
                        <p className="place-price">{slide.price}</p>
                        <p className="place-tax">{slide.tax}</p>
                        <button
                          className="view-details-btn"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          View Details
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="empty-slide"></div>
                  )}
                </div>
              ))}
            </div>
            <button className="slider-btn right" onClick={scrollRight}>
              {">"}
            </button>
          </div>
        </section>

        <section className="clients" style={{ width: "55%" }}>
          <h2 className="clients-heading">
            Our big clients <span className="arrow">➜</span>
          </h2>
          <div className="client-slider-wrapper">
            <div className="client-slider-container">
              {clientSlides.map((client, index) => (
                <div className="client-logo-card" key={index}>
                  <img
                    src={client.img}
                    alt={client.alt}
                    className="client-logo-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
