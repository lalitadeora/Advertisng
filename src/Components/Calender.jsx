import { useState, useEffect } from "react";

const Calender = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();
  const minSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 2
  );
  const maxSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth() + 12,
    today.getDate()
  );
  const [activeRange, setActiveRange] = useState(null);

  // New states for the custom date selection
  const [customDate, setCustomDate] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [customRange, setCustomRange] = useState("");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isRangeDropdownOpen, setIsRangeDropdownOpen] = useState(false);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (clickedDate >= minSelectableDate && clickedDate <= maxSelectableDate) {
      let updatedDates;
      if (
        selectedDates.some((date) => date.getTime() === clickedDate.getTime())
      ) {
        updatedDates = selectedDates.filter(
          (date) => date.getTime() !== clickedDate.getTime()
        );
      } else {
        updatedDates = [...selectedDates, clickedDate];
      }

      setSelectedDates(updatedDates);
      onDateSelect(updatedDates);
    }
  };

  const toggleRange = (days) => {
    if (activeRange === days) {
      setSelectedDates([]);
      setActiveRange(null);
      onDateSelect([]);
    } else {
      const rangeStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2
      );
      const rangeEnd = new Date(
        rangeStart.getFullYear(),
        rangeStart.getMonth(),
        rangeStart.getDate() + (days - 1)
      );

      const newSelectedDates = [];
      let currentDate = new Date(rangeStart);
      while (currentDate <= rangeEnd && currentDate <= maxSelectableDate) {
        newSelectedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setSelectedDates(newSelectedDates);
      setActiveRange(days);
      onDateSelect(newSelectedDates);
    }
  };

  const handleCustomRangeSelection = () => {
    if (customDate && customMonth && customRange) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const selectedMonthIndex = monthNames.indexOf(customMonth);
      const selectedYear =
        today.getFullYear() + (selectedMonthIndex < today.getMonth() ? 1 : 0);
      const startDate = new Date(
        selectedYear,
        selectedMonthIndex,
        parseInt(customDate)
      );

      if (startDate >= minSelectableDate && startDate <= maxSelectableDate) {
        const rangeDays = {
          "1 WEEK": 7,
          "15 DAYS": 15,
          "1 MONTH": 30,
          "2 MONTH": 60,
          "3 MONTH": 90,
          "4 MONTH": 120,
          "5 MONTH": 150,
          "6 MONTH": 180,
        }[customRange];

        const rangeEnd = new Date(startDate);
        rangeEnd.setDate(startDate.getDate() + (rangeDays - 1));

        const newSelectedDates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= rangeEnd && currentDate <= maxSelectableDate) {
          newSelectedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setSelectedDates(newSelectedDates);
        setActiveRange(rangeDays);
        onDateSelect(newSelectedDates);
      }
    }
  };

  // Use useEffect to trigger handleCustomRangeSelection whenever customDate, customMonth, or customRange changes
  useEffect(() => {
    handleCustomRangeSelection();
  }, [customDate, customMonth, customRange]);

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const weeks = [];
    let days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`blank-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(year, month, day);
      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day;

      const isSelected = selectedDates.some(
        (date) =>
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
      );

      const isSelectable =
        currentDate >= minSelectableDate && currentDate <= maxSelectableDate;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""} ${
            isSelected ? "selected" : ""
          } ${isSelectable ? "" : "unselectable"}`}
          onClick={() => handleDateClick(day)}
        >
          {day.toString().padStart(2, "0")}
        </div>
      );

      if ((firstDay + day) % 7 === 0 || day === totalDays) {
        weeks.push(
          <div key={`week - ${weeks.length}`} className="calendar-week">
            {days}
          </div>
        );
        days = [];
      }
    }

    return weeks;
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const formatSelectedDates = (dates) => {
    if (dates.length === 0) return "Select dates";

    const sortedDates = [...dates].sort((a, b) => a - b);

    const ranges = [];
    let start = sortedDates[0];
    let end = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = sortedDates[i];
      const previousDate = sortedDates[i - 1];

      const nextDay = new Date(previousDate);
      nextDay.setDate(previousDate.getDate() + 1);

      if (currentDate.getTime() === nextDay.getTime()) {
        end = currentDate;
      } else {
        ranges.push({ start, end });
        start = currentDate;
        end = currentDate;
      }
    }
    ranges.push({ start, end });

    const formatDate = (date) => {
      if (!(date instanceof Date) || isNaN(date)) {
        return "Invalid Date";
      }
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    };

    return ranges
      .map(({ start, end }) =>
        start.getTime() === end.getTime()
          ? formatDate(start)
          : `${formatDate(start)} - ${formatDate(end)}`
      )
      .join(", ");
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = today.getMonth();
  const availableMonths = [];
  for (let i = 0; i < 7; i++) {
    const monthIndex = (currentMonthIndex + i) % 12;
    availableMonths.push(monthNames[monthIndex]);
  }

  const rangeOptions = [
    "1 WEEK",
    "15 DAYS",
    "1 MONTH",
    "2 MONTH",
    "3 MONTH",
    "4 MONTH",
    "5 MONTH",
    "6 MONTH",
  ];

  return (
    <div className="timep" style={{ width: "100%" }}>
      <div className={`calendar-input-box ${isCalendarOpen ? "open" : ""}`}>
        <div className="calendar-header-section">
          <div className="selected-dates-display">
            {formatSelectedDates(selectedDates)}
          </div>
          <div className="calendar-icon" onClick={toggleCalendar}>
            📅
          </div>
        </div>
        {isCalendarOpen && (
          <div className="calendar-content-wrapper">
            <div className="custom-date-selection">
              <div className="custom-date-boxes">
                <div className="custom-date-box">
                  <input
                    type="number"
                    placeholder="Write a date"
                    value={customDate}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 1 && value <= 31) {
                        setCustomDate(value);
                      }
                    }}
                    style={{ width: "100%", padding: "5px", color: "#000" }}
                  />
                </div>
                <div className="custom-date-box">
                  <div
                    className="dropdown-header"
                    onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                  >
                    {customMonth || "Select a month"}
                  </div>
                  {isMonthDropdownOpen && (
                    <div className="dropdown-content">
                      {availableMonths.map((month) => (
                        <div
                          key={month}
                          onClick={() => {
                            setCustomMonth(month);
                            setIsMonthDropdownOpen(false);
                          }}
                        >
                          {month}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="custom-date-box">
                  <div
                    className="dropdown-header"
                    onClick={() => setIsRangeDropdownOpen(!isRangeDropdownOpen)}
                  >
                    {customRange || "Select time period"}
                  </div>
                  {isRangeDropdownOpen && (
                    <div className="dropdown-content">
                      {rangeOptions.map((range) => (
                        <div
                          key={range}
                          onClick={() => {
                            setCustomRange(range);
                            setIsRangeDropdownOpen(false);
                          }}
                        >
                          {range}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="calendar-content">
              <div className="calendar-header">
                <div onClick={handlePreviousMonth}>{"<"}</div>
                <div>
                  {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                  {currentMonth.getFullYear()}
                </div>
                <div onClick={handleNextMonth}>{">"}</div>
              </div>
              <div className="calendar-options">
                <div onClick={() => toggleRange(7)}>1 WEEK</div>
                <div onClick={() => toggleRange(15)}>15 DAYS</div>
                <div onClick={() => toggleRange(30)}>1 MONTH</div>
                <div onClick={() => toggleRange(60)}>2 MONTH</div>
                <div onClick={() => toggleRange(90)}>3 MONTH</div>
                <div onClick={() => toggleRange(120)}>4 MONTH</div>
                <div onClick={() => toggleRange(150)}>5 MONTH</div>
                <div onClick={() => toggleRange(180)}>6 MONTH</div>
              </div>
              <div className="calendar-body">{renderCalendar()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calender;
