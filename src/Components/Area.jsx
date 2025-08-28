import React, { useState } from "react";
import Select from "react-select";

const data = {
  Rajasthan: {
    Jodhpur: [
      {
        value: "Station Road",
        label: "Station marg",
        mapUrl:
          "https://kuula.co/share/h0xvD?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
        frameSize: { width: "800px", height: "350px" },
        sizeInFeet: "20*10",
      },
      {
        value: "Clock Tower",
        label: "Clock tower",
        mapUrl:
          "https://photos.google.com/share/AF1QipPfFkkeVfcMy2tLyE1xVo-M31ryrhXNpkXmSvvdW29_3rdxkT-aTvkC-WOV8clWcQ/photo/AF1QipNxYwCmOQ1Or3QxVIIl6E07S83wkczpFFv_Jkxr?key=OFRHTDVJbXZjcHppTDFESzhlTWE2ZElCNkdRSXhR",
        frameSize: { width: "800px", height: "350px" },
        sizeInFeet: "20*10",
      },
    ],
    Jaipur: [
      {
        value: "Hawa Mahal",
        label: "Hawa Mahal",
        mapUrl: "https://www.google.com/maps?q=Hawa+Mahal+Jaipur",
        frameSize: { width: "1000px", height: "400px" },
        sizeInFeet: "15*8",
      },
      {
        value: "Amber Fort",
        label: "Amber Fort",
        mapUrl: "https://www.google.com/maps?q=Amber+Fort+Jaipur",
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
        mapUrl: "https://www.google.com/maps?q=Marine+Drive+Mumbai",
        frameSize: { width: "1200px", height: "450px" },
        sizeInFeet: "25*15",
      },
      {
        value: "Gateway of India",
        label: "Gateway of India",
        mapUrl: "https://www.google.com/maps?q=Gateway+of+India+Mumbai",
        frameSize: { width: "1100px", height: "400px" },
        sizeInFeet: "22*10",
      },
    ],
    Pune: [
      {
        value: "Shaniwar Wada",
        label: "Shaniwar Wada",
        mapUrl: "https://www.google.com/maps?q=Shaniwar+Wada+Pune",
        frameSize: { width: "800px", height: "300px" },
        sizeInFeet: "20*8",
      },
      {
        value: "Aga Khan Palace",
        label: "Aga Khan Palace",
        mapUrl: "https://www.google.com/maps?q=Aga+Khan+Palace+Pune",
        frameSize: { width: "850px", height: "350px" },
        sizeInFeet: "18*10",
      },
    ],
  },
};

const Area = ({ onSelectPlace }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const stateOptions = Object.keys(data).map((state) => ({
    value: state,
    label: state,
  }));

  const districtOptions = selectedState
    ? Object.keys(data[selectedState]).map((district) => ({
        value: district,
        label: district,
      }))
    : [];

  const placeOptions = selectedDistrict
    ? data[selectedState][selectedDistrict]
    : [];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allPlaces = placeOptions.map((place) => place.value);
      setSelectedPlaces(allPlaces);
      if (onSelectPlace) {
        const selectedPlaceFrames = allPlaces.map(
          (placeValue) =>
            placeOptions.find((p) => p.value === placeValue).frameSize
        );
        const selectedPlaceSizesInFeet = allPlaces.map(
          (placeValue) =>
            placeOptions.find((p) => p.value === placeValue).sizeInFeet
        );
        const fullPlaceNames = allPlaces.map(
          (placeValue) =>
            `${selectedState.toUpperCase()} - ${selectedDistrict.toUpperCase()} - ${
              placeOptions.find((p) => p.value === placeValue).label
            }`
        );
        onSelectPlace(
          fullPlaceNames.join(", "),
          selectedPlaceFrames,
          selectedPlaceSizesInFeet
        );
      }
    } else {
      setSelectedPlaces([]);
      if (onSelectPlace) onSelectPlace("", [], []);
    }
  };

  const handleSelectPlace = (e, placeValue) => {
    if (e.target.checked) {
      setSelectedPlaces((prev) => {
        const newSelection = [...prev, placeValue];
        if (onSelectPlace) {
          const selectedPlaceFrames = newSelection.map(
            (p) => placeOptions.find((po) => po.value === p).frameSize
          );
          const selectedPlaceSizesInFeet = newSelection.map(
            (p) => placeOptions.find((po) => po.value === p).sizeInFeet
          );
          const fullPlaceNames = newSelection.map(
            (placeValue) =>
              `${selectedState.toUpperCase()} - ${selectedDistrict.toUpperCase()} - ${
                placeOptions.find((p) => p.value === placeValue).label
              }`
          );
          onSelectPlace(
            fullPlaceNames.join(", "),
            selectedPlaceFrames,
            selectedPlaceSizesInFeet
          );
        }
        return newSelection;
      });
    } else {
      setSelectedPlaces((prev) => {
        const newSelection = prev.filter((p) => p !== placeValue);
        if (onSelectPlace) {
          const selectedPlaceFrames = newSelection.map(
            (p) => placeOptions.find((po) => po.value === p).frameSize
          );
          const selectedPlaceSizesInFeet = newSelection.map(
            (p) => placeOptions.find((po) => po.value === p).sizeInFeet
          );
          const fullPlaceNames = newSelection.map(
            (placeValue) =>
              `${selectedState.toUpperCase()} - ${selectedDistrict.toUpperCase()} - ${
                placeOptions.find((p) => p.value === placeValue).label
              }`
          );
          onSelectPlace(
            newSelection.length > 0 ? fullPlaceNames.join(", ") : "",
            selectedPlaceFrames,
            selectedPlaceSizesInFeet
          );
        }
        return newSelection;
      });
    }
  };

  // Function to format the display of selected places
  const formatSelectedPlaces = () => {
    if (!selectedState || !selectedDistrict || selectedPlaces.length === 0) {
      return null;
    }
    // Map selected places to their labels
    const placeLabels = selectedPlaces.map((placeValue) => {
      const place = placeOptions.find((p) => p.value === placeValue);
      return place ? place.label : placeValue;
    });
    // Combine state, district, and places into the desired format
    return `${selectedState.toUpperCase()} - ${selectedDistrict.toUpperCase()} - ${placeLabels.join(
      ", "
    )}`;
  };

  return (
    <div className="areacontainer" style={{ color: "black" }}>
      {/* Toggle Dropdown */}
      <div
        className="locationicon"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {isDropdownOpen ? "∧" : "∨"}
      </div>

      {isDropdownOpen && (
        <div>
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
                  <span
                    style={{ margin: "0 10px", cursor: "pointer" }}
                    onClick={() => window.open(place.mapUrl, "_blank")}
                  >
                    🎦
                  </span>
                  <input
                    type="checkbox"
                    id={place.value}
                    className="custom-checkbox"
                    checked={selectedPlaces.includes(place.value)}
                    onChange={(e) => handleSelectPlace(e, place.value)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Areas Box */}
      <div className="selected-areas-box" style={{ width: "800px" }}>
        {selectedPlaces.length > 0 ? (
          <ul>
            <li>{formatSelectedPlaces()}</li>
          </ul>
        ) : (
          <p className="headslot" style={{ marginTop: "-10px" }}>
            Select place where you want to advertisiment
          </p>
        )}
      </div>
    </div>
  );
};

export default Area;
