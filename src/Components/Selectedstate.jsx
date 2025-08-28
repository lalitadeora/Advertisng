import React from "react";
const Selectedstate = ({ selectedstates }) => {
  return (
    <>
      <div id="slecetctdata">
        {selectedstates.length > 0 ? (
          <div className="mytime" style={{ color: "black" }}>
            {selectedstates.map((slot, index) => (
              <div className="myslot" key={index} style={{ color: "black" }}>
                {slot}
              </div>
            ))}
          </div>
        ) : (
          <p className="headslot">Select Slot</p>
        )}
      </div>
    </>
  );
};
export default Selectedstate;
