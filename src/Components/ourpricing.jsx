import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./Ourpricing.css";
import { SlotPriceData } from "./SlotPriceData.jsx";

// राज्य, जिला और स्थान का डेटा (Area.jsx से लिया गया)
const locationData = {
  Rajasthan: {
    Jodhpur: [
      {
        value: "Station Road",
        label: "Station marg",
        frameSize: { width: "800px", height: "350px" },
        sizeInFeet: "20*10",
      },
      {
        value: "Clock Tower",
        label: "Clock tower",
        frameSize: { width: "800px", height: "350px" },
        sizeInFeet: "20*10",
      },
    ],
    Jaipur: [
      {
        value: "Hawa Mahal",
        label: "Hawa Mahal",
        frameSize: { width: "1000px", height: "400px" },
        sizeInFeet: "15*8",
      },
      {
        value: "Amber Fort",
        label: "Amber Fort",
        frameSize: { width: "950px", height: "350px" },
        sizeInFeet: "18*12",
      },
    ],
  },
  Maharashtra: {
    Mumbai: [
      {
        value: "Marine Drive",
        label: "Marine Drive",
        frameSize: { width: "1200px", height: "450px" },
        sizeInFeet: "25*15",
      },
      {
        value: "Gateway of India",
        label: "Gateway of India",
        frameSize: { width: "1100px", height: "400px" },
        sizeInFeet: "22*10",
      },
    ],
    Pune: [
      {
        value: "Shaniwar Wada",
        label: "Shaniwar Wada",
        frameSize: { width: "800px", height: "300px" },
        sizeInFeet: "20*8",
      },
      {
        value: "Aga Khan Palace",
        label: "Aga Khan Palace",
        frameSize: { width: "850px", height: "350px" },
        sizeInFeet: "18*10",
      },
    ],
  },
};

function Ourpricing() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const stateOptions = Object.keys(locationData).map((state) => ({
    value: state,
    label: state,
  }));

  const districtOptions = selectedState
    ? Object.keys(locationData[selectedState]).map((district) => ({
        value: district,
        label: district,
      }))
    : [];

  const placeOptions = selectedDistrict
    ? locationData[selectedState][selectedDistrict]
    : [];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allPlaces = placeOptions.map((place) => place.label);
      setSelectedPlaces(allPlaces);
    } else {
      setSelectedPlaces([]);
    }
  };

  const handleSelectPlace = (e, placeLabel) => {
    if (e.target.checked) {
      setSelectedPlaces((prev) => [...prev, placeLabel]);
    } else {
      setSelectedPlaces((prev) => prev.filter((p) => p !== placeLabel));
    }
  };

  return (
    <div className="pricing-page">
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
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/ourpricing">OUR PRICING</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="pricing-header">
        <h2>Our Pricing</h2>
        <p>Select a location to view pricing details for advertising slots.</p>
      </div>
      <div className="areacontainer" style={{ color: "black" }}>
        {/* State Selection */}
        <Select
          className="areaselect"
          placeholder="Select State"
          value={
            selectedState
              ? { value: selectedState, label: selectedState }
              : null
          }
          options={stateOptions}
          onChange={(option) => {
            const stateValue = option.value;
            setSelectedState(stateValue);
            setSelectedDistrict(null);
            setSelectedPlaces([]);
          }}
        />

        {/* District Selection */}
        {selectedState && (
          <Select
            className="areaselect"
            placeholder="Select District"
            value={
              selectedDistrict
                ? { value: selectedDistrict, label: selectedDistrict }
                : null
            }
            options={districtOptions}
            onChange={(option) => {
              const districtValue = option.value;
              setSelectedDistrict(districtValue);
              setSelectedPlaces([]);
            }}
          />
        )}

        {/* Place Selection */}
        {selectedDistrict && (
          <div>
            <div className="place-box">
              <label htmlFor="select-all" style={{ marginRight: "10px" }}>
                Select all
              </label>
              <input
                type="checkbox"
                id="select-all"
                className="custom-checkbox"
                onChange={handleSelectAll}
                checked={selectedPlaces.length === placeOptions.length}
              />
            </div>
            {placeOptions.map((place) => (
              <div key={place.value} className="place-box">
                <label htmlFor={place.value} style={{ marginRight: "10px" }}>
                  {place.label}
                </label>
                <input
                  type="checkbox"
                  id={place.value}
                  className="custom-checkbox"
                  checked={selectedPlaces.includes(place.label)}
                  onChange={(e) => handleSelectPlace(e, place.label)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Table - Moved to left side */}
      <div
        className="pricing-container"
        style={{ marginLeft: "0", textAlign: "left", width: "auto" }}
      >
        {selectedPlaces.length > 0 &&
          selectedPlaces.map((place) => (
            <div key={place} className="place-section">
              <h3>{place}</h3>
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Time Slot</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(SlotPriceData[place]).map(([slot, price]) => (
                    <tr key={slot}>
                      <td>{slot}</td>
                      <td>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>

      {/* Book Now Button - Show only if places are selected */}
      {selectedPlaces.length > 0 && (
        <div className="book-now-btn">
          <Link to="/book" className="book-now-link">
            Book Now
          </Link>
        </div>
      )}
    </div>
  );
}

export default Ourpricing;
