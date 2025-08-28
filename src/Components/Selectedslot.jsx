import React from "react";

const Selectedslot = ({ selectedSlots }) => {
  // Group slots into Morning, Afternoon, Evening, Night
  const groupedSlots = {
    Morning: [],
    Afternoon: [],
    Evening: [],
    Night: [],
  };

  // Categorize slots into their respective groups
  selectedSlots.forEach((slot) => {
    if (slot.includes("morning")) {
      groupedSlots.Morning.push(slot.replace("morning - ", ""));
    } else if (slot.includes("afternoon")) {
      groupedSlots.Afternoon.push(slot.replace("afternoon - ", ""));
    } else if (slot.includes("evening")) {
      groupedSlots.Evening.push(slot.replace("evening - ", ""));
    } else if (slot.includes("night")) {
      groupedSlots.Night.push(slot.replace("night - ", ""));
    }
  });

  return (
    <div id="slecetctdata">
      {selectedSlots.length > 0 ? (
        <div className="mytime1" style={{ color: "black" }}>
          <div className="slot-group-container">
            {Object.keys(groupedSlots).map((group, index) =>
              groupedSlots[group].length > 0 ? (
                <div key={index} className="myslot">
                  <strong style={{ marginLeft: "50px" }}>{group}</strong>
                  <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
                    {groupedSlots[group].map((time, timeIndex) => (
                      <li key={timeIndex}>{time}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </div>
      ) : (
        <p className="headsslot">Select Slot</p>
      )}
    </div>
  );
};

export default Selectedslot;
