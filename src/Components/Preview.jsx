import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Preview.css";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
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
  } = location.state || {};

  // Function to format place name and size for display
  const formatPlaceInfo = (placeFullName, index) => {
    if (!placeFullName) {
      return "";
    }
    const sizeInFeet =
      selectedSizesInFeet && selectedSizesInFeet.length > index
        ? selectedSizesInFeet[index]
        : "";
    const sizeDisplay = sizeInFeet ? ` (Screen size: ${sizeInFeet})` : "";
    return `${placeFullName}${sizeDisplay}`;
  };

  // Group places by state and district
  const groupPlaces = (places) => {
    if (!places || places.length === 0) return "No places selected.";

    const groupedPlaces = {};
    places.forEach((place) => {
      const [state, district, ...locationParts] = place.split(" - ");
      const stateDistrict = `${state} - ${district}`;
      const location = locationParts.join(" - ");
      if (!groupedPlaces[stateDistrict]) {
        groupedPlaces[stateDistrict] = [];
      }
      groupedPlaces[stateDistrict].push(location);
    });

    return Object.entries(groupedPlaces).map(
      ([stateDistrict, locations], index) => (
        <div key={index}>
          {stateDistrict} - {locations.join(", ")}
        </div>
      )
    );
  };

  // Group slots by time and format them
  const groupSlotsByTime = (slots) => {
    if (!slots || slots.length === 0) return "No slots selected.";

    const groupedSlots = {};
    slots.forEach((slot) => {
      const [time, group] = slot.split(", ");
      if (!groupedSlots[group]) {
        groupedSlots[group] = [];
      }
      groupedSlots[group].push(time);
    });

    return Object.entries(groupedSlots).map(([group, times], groupIndex) => {
      const formattedTimes = times.map((time) => {
        const [hour, minute] = time.split(":");
        const period = minute.includes("PM") ? "pm" : "am";
        const cleanMinute = minute.replace(/AM|PM/, "").trim();
        return `${hour}:${cleanMinute}${period}`;
      });

      const timeRanges = [];
      for (let i = 0; i < formattedTimes.length; i += 2) {
        if (i + 1 < formattedTimes.length) {
          timeRanges.push(`${formattedTimes[i]} – ${formattedTimes[i + 1]}`);
        } else {
          timeRanges.push(formattedTimes[i]);
        }
      }

      return (
        <div key={groupIndex} className="slot-group">
          <span className="slot-group-title">{group}</span>
          <ul className="slot-times">
            {timeRanges.map((range, index) => (
              <li key={index} className="slot-time-item">
                {range}
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  // Format dates into ranges and calculate total days
  const formatDates = (dates) => {
    if (!dates || dates.length === 0)
      return { formatted: "No dates selected.", totalDays: 0 };

    const parsedDates = dates
      .map((dateStr) => {
        const date = new Date(dateStr);
        return {
          date,
          formatted: `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
          ).padStart(2, "0")}/${date.getFullYear()}`,
        };
      })
      .sort((a, b) => a.date - b.date);

    const ranges = [];
    let start = parsedDates[0];
    let prev = start;

    for (let i = 1; i < parsedDates.length; i++) {
      const current = parsedDates[i];
      const prevDate = new Date(prev.date);
      prevDate.setDate(prevDate.getDate() + 1);

      if (new Date(current.date).toDateString() === prevDate.toDateString()) {
        prev = current;
      } else {
        if (start === prev) {
          ranges.push(start.formatted);
        } else {
          ranges.push(`${start.formatted} – ${prev.formatted}`);
        }
        start = current;
        prev = current;
      }
    }

    if (start === prev) {
      ranges.push(start.formatted);
    } else {
      ranges.push(`${start.formatted} – ${prev.formatted}`);
    }

    const totalDays = parsedDates.length;
    return { formatted: ranges.join(", "), totalDays };
  };

  // Render media preview
  const renderMediaPreview = (media) => {
    if (!media) return "No media uploaded.";

    const mediaUrl =
      typeof media === "string" ? media : URL.createObjectURL(media);
    const isVideo =
      media.type?.startsWith("video") || mediaUrl.match(/\.(mp4|webm|ogg)$/i);

    return (
      <div className="media-preview">
        {isVideo ? (
          <video width="70" height="50" controls>
            <source src={mediaUrl} type={media.type || "video/mp4"} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={mediaUrl} alt="Uploaded Media" width="70" height="50" />
        )}
      </div>
    );
  };

  // Handle error if state is not passed
  if (!location.state) {
    return (
      <div className="preview-error">
        <h2>Error</h2>
        <p>Booking details not found. Please go back and try again.</p>
        <Link to="/book" className="back-button">
          BACK
        </Link>
      </div>
    );
  }

  const { formatted: formattedDates, totalDays } = formatDates(selectedDates);

  // Handle PAY button click
  const handlePayClick = () => {
    if (!location.state) {
      alert("Booking details are missing. Please go back and try again.");
      navigate("/book");
      return;
    }
    navigate("/payment", { state: location.state });
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>Booking Preview</h1>
        <p>Review your booking details before PAY.</p>
      </div>

      {/* Booking Details Table */}
      <div className="preview-section">
        <h2>Booking Details</h2>
        <table className="booking-table">
          <tbody>
            <tr>
              <th>
                Company Name<span> : </span>
              </th>
              <td>{formData?.companyName || "N/A"}</td>
            </tr>
            <tr>
              <th>
                Email<span> : </span>
              </th>
              <td>{formData?.email || "N/A"}</td>
            </tr>
            <tr>
              <th>
                Mobile<span> : </span>
              </th>
              <td>{formData?.mobile || "N/A"}</td>
            </tr>
            <tr>
              <th>
                Selected Places<span> : </span>
              </th>
              <td>{groupPlaces(selectedPlaces)}</td>
            </tr>
            <tr>
              <th>
                Selected Slots<span> : </span>
              </th>
              <td>{groupSlotsByTime(selectedSlots)}</td>
            </tr>
            <tr>
              <th>
                Selected Dates<span> : </span>
              </th>
              <td>
                {formattedDates}
                {totalDays > 0 && (
                  <div className="total-days">
                    *Total number of days: {totalDays}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th>
                Uploaded Media<span> : </span>
              </th>
              <td>{renderMediaPreview(uploadedMedia)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Price Details Table */}
      <div className="preview-section">
        <h2 className="price-heading">Price Details</h2>
        <table className="price-table">
          <tbody>
            <tr>
              <th>
                Total Price (Before Discount)<span> : </span>
              </th>
              <td>₹{totalPrice?.toFixed(2) || "0.00"}</td>
            </tr>
            <tr>
              <th>
                Discount<span> : </span>
              </th>
              <td>
                {discount > 0 ? (
                  `₹${discount.toFixed(2)}`
                ) : (
                  <p
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    *If your price is ₹10,000 or more, you will get a discount
                    of 5%, 10%, or 15% based on the total price.
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <th>
                GST (18%)<span> : </span>
              </th>
              <td>₹{gst?.toFixed(2) || "0.00"}</td>
            </tr>
            <tr className="total-amount-row">
              <th>
                Total Payable Amount<span> : </span>
              </th>
              <td>₹{totalAmount?.toFixed(2) || "0.00"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="preview-actions">
        <Link to="/book" className="back-button">
          BACK
        </Link>
        <button onClick={handlePayClick} className="pay-button">
          PAY
        </button>
      </div>
    </div>
  );
};

export default Preview;
