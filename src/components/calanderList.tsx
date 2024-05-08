// Kalendoriaus sąrašo rodymas ir slėpimas
// Darė: Ernestas Palinauskas

import React from "react";

const CalendarList = ({
  showList,
  setShowList,
  currentDate: propCurrentDate,
  setCurrentDate,
}: {
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const currentDate = propCurrentDate;
  const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const isSelectedDate = (day: number) =>
    new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() === currentDate.toDateString();

  const handleDateClick = (p0: Date) => {
    // Handle date click logic
  };

  return (
    <>
      <button
        className="m-1 mr-2 ml-2 mb-5 border-solid border-2 rounded p-1 hover:border-black hover:bg -[#e4e4e4]"
        onClick={() => setShowList(!showList)}
      >
        {showList ? "Slėpti Sąrašą" : "Sąrašas"}
      </button>

      {showList && (
        <ul>
          {Array.from({ length: daysInCurrentMonth }, (_, i) => {
            const day = i + 1;
            const selectedDate = isSelectedDate(day);
            return (
              <li
                key={i + 1}
                style={{
                  cursor: "pointer",
                  padding: "1rem",
                  border: "1px solid black",
                  backgroundColor: selectedDate ? "#223a86" : "white",
                  color: selectedDate ? "white" : "black",
                }}
                onClick={() => handleDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                onMouseOver={(e) => {
                  if (!selectedDate) {
                    e.currentTarget.style.backgroundColor = "#223a86";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseOut={(e) => {
                  if (!selectedDate) {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "black";
                  }
                }}
              >
                {day}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CalendarList;
