import React, { useState, useEffect } from "react";
import Area from "./Area.jsx";
import DaySlots from "./DaySlots.jsx";
import Selectedslot from "./Selectedslot.jsx";
import Vid from "./Vid.jsx";
import Calender from "./Calender.jsx";
import { useNavigate, Link } from "react-router-dom"; // Ensure Link is imported
import "./Booknow.css";
import { SlotPriceData } from "./SlotPriceData.jsx";

function Booknow() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    console.log("Toggle clicked, isMobileMenuOpen:", !isMobileMenuOpen);
  };

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          companyName: "",
          email: "",
          mobile: "",
          fromDate: "",
          toDate: "",
          places: "",
        };
  });

  const [selectedPlaces, setSelectedPlaces] = useState(() => {
    const savedPlaces = localStorage.getItem("selectedPlaces");
    return savedPlaces ? JSON.parse(savedPlaces) : [];
  });

  const [show, setShow] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState(() => {
    const savedSlots = localStorage.getItem("selectedSlots");
    return savedSlots ? JSON.parse(savedSlots) : [];
  });

  const [selectedDates, setSelectedDates] = useState(() => {
    const savedDates = localStorage.getItem("selectedDates");
    return savedDates ? JSON.parse(savedDates) : [];
  });

  const [mediaMultiplier, setMediaMultiplier] = useState(1);
  const [gst, setGst] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState(() => {
    const savedMedia = localStorage.getItem("uploadedMedia");
    return savedMedia ? JSON.parse(savedMedia) : null;
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
      setFormData({
        companyName: "",
        email: "",
        mobile: "",
        fromDate: "",
        toDate: "",
        places: "",
      });
      setSelectedPlaces([]);
      setSelectedSlots([]);
      setSelectedDates([]);
      setMediaMultiplier(1);
      setUploadedMedia(null);
    };

    const savedFormData = localStorage.getItem("formData");
    const savedPlaces = localStorage.getItem("selectedPlaces");
    const savedSlots = localStorage.getItem("selectedSlots");
    const savedDates = localStorage.getItem("selectedDates");
    const savedMediaMultiplier = localStorage.getItem("mediaMultiplier");
    const savedMedia = localStorage.getItem("uploadedMedia");

    if (savedFormData) setFormData(JSON.parse(savedFormData));
    if (savedPlaces) setSelectedPlaces(JSON.parse(savedPlaces));
    if (savedSlots) setSelectedSlots(JSON.parse(savedSlots));
    if (savedDates) setSelectedDates(JSON.parse(savedDates));
    if (savedMediaMultiplier)
      setMediaMultiplier(parseFloat(savedMediaMultiplier));
    if (savedMedia) setUploadedMedia(JSON.parse(savedMedia));

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("selectedPlaces", JSON.stringify(selectedPlaces));
    localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
    localStorage.setItem("mediaMultiplier", mediaMultiplier.toString());
    localStorage.setItem("uploadedMedia", JSON.stringify(uploadedMedia));
  }, [
    formData,
    selectedPlaces,
    selectedSlots,
    selectedDates,
    mediaMultiplier,
    uploadedMedia,
  ]);

  const calculatePrice = (
    selectedPlaces,
    selectedSlots,
    selectedDates,
    multiplier
  ) => {
    if (
      !selectedPlaces.length ||
      !selectedSlots.length ||
      !selectedDates.length
    ) {
      return { totalPrice: 0, discount: 0, gst: 0, totalAmount: 0 };
    }

    let basePrice = 0;

    selectedPlaces.forEach((place) => {
      let placeName = place;
      if (typeof place === "string" && place.includes(" - ")) {
        placeName = place.split(" - ")[2]?.split(", ")[0];
      }

      const placeSlots = SlotPriceData[placeName] || {};

      selectedSlots.forEach((slot) => {
        const slotPrice = placeSlots[slot] || 0;
        basePrice += slotPrice;
      });
    });

    basePrice *= selectedDates.length;
    const totalPrice = basePrice * multiplier;

    let discount = 0;
    if (totalPrice >= 10000000) {
      discount = totalPrice * 0.15;
    } else if (totalPrice >= 100000) {
      discount = totalPrice * 0.1;
    } else if (totalPrice >= 10000) {
      discount = totalPrice * 0.05;
    }

    const discountedPrice = totalPrice - discount;
    const gstAmount = discountedPrice * 0.18;
    const totalPayable = discountedPrice + gstAmount;

    return {
      totalPrice: totalPrice || 0,
      discount: discount || 0,
      gst: gstAmount || 0,
      totalAmount: totalPayable || 0,
    };
  };

  const [selectedFrameSizes, setSelectedFrameSizes] = useState([]);
  const [selectedSizesInFeet, setSelectedSizesInFeet] = useState([]);

  const handleSelectPlace = (
    selectedPlacesString,
    selectedPlaceFrames,
    selectedPlaceSizesInFeet
  ) => {
    let placesArray = selectedPlacesString;
    if (typeof selectedPlacesString === "string") {
      placesArray = selectedPlacesString.split(", ");
    }
    setSelectedPlaces(placesArray);
    setFormData({ ...formData, places: selectedPlacesString });

    if (selectedPlaceFrames.length > 0) {
      setSelectedFrameSizes(selectedPlaceFrames);
      setSelectedSizesInFeet(selectedPlaceSizesInFeet);
    } else {
      setSelectedFrameSizes([]);
      setSelectedSizesInFeet([]);
    }
    setShowPriceDetails(false);
  };

  const handleSelectSlot = (newSlot) => {
    setSelectedSlots(newSlot);
    setShowPriceDetails(false);
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log("Selected Dates:", dates);
    setShowPriceDetails(false);
  };

  const handleMediaUpload = (file, multiplier) => {
    setUploadedMedia(file);
    setMediaMultiplier(multiplier);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.companyName) {
      alert("Please enter the Company Name.");
      return;
    }
    if (!formData.email) {
      alert("Please enter your Email.");
      return;
    }
    if (!formData.mobile) {
      alert("Please enter your Mobile Number.");
      return;
    }
    if (!selectedPlaces.length) {
      alert("Please select at least one place for advertisement.");
      return;
    }
    if (!selectedSlots.length) {
      alert("Please select at least one time slot.");
      return;
    }
    if (!selectedDates.length) {
      alert("Please select the dates for your advertisement.");
      return;
    }
    if (!uploadedMedia) {
      alert("Please upload an image or video for the advertisement.");
      return;
    }

    const { totalPrice, discount, gst, totalAmount } = calculatePrice(
      selectedPlaces,
      selectedSlots,
      selectedDates,
      mediaMultiplier
    );

    console.log("Selected Places:", selectedPlaces);
    console.log(
      "Base Price (before multiplier):",
      totalPrice / mediaMultiplier
    );
    console.log("Multiplier:", mediaMultiplier);
    console.log("Total Price:", totalPrice);
    console.log("Discount:", discount);
    console.log("GST:", gst);
    console.log("Total Amount:", totalAmount);
    console.log("Uploaded Media:", uploadedMedia);

    setTotalPrice(totalPrice);
    setDiscount(discount);
    setGst(gst);
    setTotalAmount(totalAmount);
    setShowPriceDetails(true);

    const bookingDetails = {
      formData,
      selectedPlaces,
      selectedSlots,
      selectedDates,
      totalPrice,
      discount,
      gst,
      totalAmount,
      uploadedMedia,
      selectedSizesInFeet,
    };

    navigate("/preview", { state: bookingDetails });
  };

  return (
    <>
      <div className="form-body">
        <nav className="navbar" style={{ backgroundColor: "#22b5d6" }}>
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
                <Link
                  to={{ pathname: "/ourpricing", state: { selectedPlaces } }}
                >
                  OUR PRICING
                </Link>
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
                Sign out
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
        <div className="booking-from-header">
          <h2>Digital Billboard Booking Form</h2>
          <p>
            If you want to book your digital billboard for advertisement, you
            can fill this form <br /> and easily book your billboard.
          </p>
        </div>
        <div className="form-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                placeholder="Company Name"
                className="form-input"
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="E-Mail"
                className="form-input"
              />
            </div>
            <div className="input-box">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                placeholder="Mobile Number"
                className="form-input"
              />
            </div>
            <div className="timetoggle">
              <div
                className="a1"
                style={{ width: "900px", border: "1px solid #0b010f36" }}
              >
                <Area onSelectPlace={handleSelectPlace} />
              </div>
            </div>
            <div className="timetoggle">
              <div className="a1">
                <p className="locationicon" onClick={() => setShow(!show)}>
                  {show ? "∧" : "∨"}
                </p>
                {show ? (
                  <DaySlots
                    selectedSlots={selectedSlots}
                    handleSelectSlot={handleSelectSlot}
                  />
                ) : (
                  <Selectedslot selectedSlots={selectedSlots} />
                )}
              </div>
            </div>
            <div
              className="timetoggle"
              style={{ width: "100%", marginRight: "10px" }}
            >
              <Calender onDateSelect={handleDateSelect} />
            </div>
            <div className="file" style={{ backgroundColor: "#fff" }}>
              <Vid
                onMultiplierChange={(multiplier) =>
                  setMediaMultiplier(multiplier)
                }
                onFileChange={handleMediaUpload}
                selectedFrameSizes={selectedFrameSizes}
                selectedPlaces={selectedPlaces}
                selectedSizesInFeet={selectedSizesInFeet}
              />
            </div>
            <div className="terms-section">
              <hr className="terms-line" />
              <label className="terms-checkbox">
                <input type="checkbox" required className="custom-checkbox" />I
                agree to the Terms and Conditions
              </label>
            </div>
            <button type="submit" className="next-button">
              NEXT
            </button>
            {/* Add a button or link to view pricing */}
            <Link
              to={{ pathname: "/ourpricing", state: { selectedPlaces } }}
              className="view-pricing-button"
              style={{ display: "block", marginTop: "10px" }}
            >
              View Pricing for Selected Places
            </Link>
          </form>
        </div>
        {showPriceDetails && (
          <div className="price-details">
            <h3>Price Details:</h3>
            <div>
              <strong>Total Price (Before Discount): </strong>₹
              {totalPrice.toFixed(2)}
            </div>
            <div>
              <strong>Discount: </strong>₹{discount.toFixed(2)}
            </div>
            <div>
              <strong>GST (18%): </strong>₹{gst.toFixed(2)}
            </div>
            <div>
              <strong>Total Payable Amount: </strong>₹{totalAmount.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Booknow;
