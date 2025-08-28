import React from "react";

const DaySlots = ({ selectedSlots, handleSelectSlot }) => {
  const dayslots = [
    {
      Slot: "Morning",
      T1: "04:00 AM - 05:00 AM",
      T2: "05:00 AM - 06:00 AM",
      T3: "06:00 AM - 07:00 AM",
      T4: "07:00 AM - 08:00 AM",
      T5: "08:00 AM - 09:00 AM",
      T6: "09:00 AM - 10:00 AM",
    },
    {
      Slot: "Afternoon",
      T1: "10:00 AM - 11:00 AM",
      T2: "11:00 AM - 12:00 PM",
      T3: "12:00 PM - 01:00 PM",
      T4: "01:00 PM - 02:00 PM",
      T5: "02:00 PM - 03:00 PM",
      T6: "03:00 PM - 04:00 PM",
    },
    {
      Slot: "Evening",
      T1: "04:00 PM - 05:00 PM",
      T2: "05:00 PM - 06:00 PM",
      T3: "06:00 PM - 07:00 PM",
      T4: "07:00 PM - 08:00 PM",
      T5: "08:00 PM - 09:00 PM",
      T6: "09:00 PM - 10:00 PM",
    },
    {
      Slot: "Night",
      T1: "10:00 PM - 11:00 PM",
      T2: "11:00 PM - 12:00 AM",
      T3: "12:00 AM - 01:00 AM",
      T4: "01:00 AM - 02:00 AM",
      T5: "02:00 AM - 03:00 AM",
      T6: "03:00 AM - 04:00 AM",
    },
  ];

  const handleCheckboxChange = (slot, time = null) => {
    const selected = time ? `${slot.toLowerCase()} - ${time}` : null;

    if (time) {
      const updatedSlots = selectedSlots.includes(selected)
        ? selectedSlots.filter((item) => item !== selected)
        : [...selectedSlots, selected];

      handleSelectSlot(updatedSlots);
    } else {
      const slotTimes = Object.values(
        dayslots.find((day) => day.Slot === slot)
      ).slice(1);
      const selectedTimes = slotTimes.map(
        (time) => `${slot.toLowerCase()} - ${time}`
      );
      const isSelected = selectedTimes.every((time) =>
        selectedSlots.includes(time)
      );

      const updatedSlots = isSelected
        ? selectedSlots.filter((time) => !selectedTimes.includes(time))
        : [
            ...selectedSlots,
            ...selectedTimes.filter((time) => !selectedSlots.includes(time)),
          ];

      handleSelectSlot(updatedSlots);
    }
  };

  const formatTimeLabel = (time) => {
    return time
      .replace(/AM/g, '<span class="time-period">AM</span>')
      .replace(/PM/g, '<span class="time-period">PM</span>')
      .replace(/AM/g, '<span class="time-period">AM</span>');
  };

  return (
    <div className="timep">
      <div className="dayss" style={{ color: "black" }}>
        {dayslots.map((day, index) => (
          <div key={index} className="day">
            <div className="slot">
              <h4>{day.Slot}</h4>
              <div className="select-all-row">
                <label className="select-all-label">Select All</label>
                <div
                  className="checkbox-container"
                  style={{ marginRight: "10px" }}
                >
                  <input
                    className="dayslot select-all-checkbox"
                    style={{ color: "black" }}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(day.Slot)}
                    checked={Object.values(day)
                      .slice(1)
                      .map((time) => `${day.Slot.toLowerCase()} - ${time}`)
                      .every((time) => selectedSlots.includes(time))}
                  />
                </div>
              </div>
            </div>

            {Object.keys(day).map((key) => {
              if (key !== "Slot") {
                return (
                  <div key={key} className="slot-row">
                    <label
                      className="time-label"
                      dangerouslySetInnerHTML={{
                        __html: formatTimeLabel(day[key]),
                      }}
                    />
                    <div className="checkbox-container">
                      <input
                        className="dayslot time-checkbox"
                        style={{ color: "black" }}
                        type="checkbox"
                        onChange={() =>
                          handleCheckboxChange(day.Slot, day[key])
                        }
                        checked={selectedSlots.includes(
                          `${day.Slot.toLowerCase()} - ${day[key]}`
                        )}
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaySlots;
