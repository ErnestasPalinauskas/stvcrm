// Kalendorius
// Dare Ernestas Palinauskas

// @jsxImportSource @react // Ši eilutė leidžia naudoti React JSX sintaksę
"use client"; // Nurodo, kad šis komponentas yra kliento komponentas

import React, { ReactNode, useEffect, useState } from "react"; // Import React library and useState, useEffect hooks
import CalanderList from "./calanderList";
import { table } from "console";
import AddDarboBilietasForm from "@/app/kalendorius/@addDarboBilietasForma/page";
import axios from "axios";

// Mėnesių pavadinimai lietuviškai
const LITHUANIAN_MONTHS = [
  "Sausis",
  "Vasaris",
  "Kovas",
  "Balandis",
  "Gegužė",
  "Birželis",
  "Liepa",
  "Rugpjūtis",
  "Rugsėjis",
  "Spalis",
  "Lapkritis",
  "Gruodis",
];

// Savaitės dienų pavadinimai lietuviškai
const LITHUANIAN_WEEKDAYS = ["Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"];

type DarboBilietas = {
  [x: string]: ReactNode;
  id: number;
  SukureID: number;
  Pavadinimas: string;
  Nuo: string;
  Iki: string;
};

// Kalendoriaus komponentas
const Calendar = () => {
  const [showList, setShowList] = useState(false); // Add this line
  const [currentDate, setCurrentDate] = useState(new Date()); // Būsimoji ir dabartinės datos būsenos
  // Initial state of selectedDate
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set initial value to the current date // Būsimoji ir pasirinktos datos būsenos

  // Darbų bilietų sąrašas
  const [darbobilietai, setDarbobilietai] = useState<DarboBilietas[]>([]);

  const CalendarList = ({ selectedDate }: { selectedDate: Date }) => {
    const [comments, setComments] = useState({});

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComments({
        ...comments,
        [selectedDate.toDateString()]: event.target.value,
      });
    };

    // Rest of your code...
  };
  // Your existing state variables...

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<DarboBilietas | null>(null);

  const formatDateToMySQL = (date: any) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const fetchDarbobilietas = async () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const res = await axios.get("api/darbobilietas", {
      params: {
        Nuo: formatDateToMySQL(firstDayOfMonth),
        Iki: formatDateToMySQL(lastDayOfMonth),
        SukureID: userData.id,
      },
    });

    setDarbobilietai(res.data);
    console.log(res.data, {
      Nuo: formatDateToMySQL(firstDayOfMonth),
      Iki: formatDateToMySQL(lastDayOfMonth),
      SukureID: userData.id,
    });
  };

  // Funkcija, kuri paspaudus ant datos nustato ją kaip pasirinktą datą ir atidaryja sąrašą darbui bilietams
  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    email: "",
    Role: "",
  });

  const toLocalISOString = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);
    return localISOTime;
  };

  const addData = async (newData: DarboBilietas) => {
    const adjustedData = {
      ...newData,
      Nuo: toLocalISOString(new Date(newData.Nuo)),
      Iki: toLocalISOString(new Date(newData.Iki)),
    };

    const res = await axios.post("/api/darbobilietas", adjustedData);

    if (res.status === 200) {
      const returnedDarbobilietas = {
        ...res.data,
        Nuo: toLocalISOString(new Date(res.data.Nuo)),
        Iki: toLocalISOString(new Date(res.data.Iki)),
      };
      setDarbobilietai([...darbobilietai, returnedDarbobilietas]);
    }
  };

  const UpdateUserData = async () => {
    const res = await axios.get("api/users/data");
    setUserData(res.data.data);
  };

  useEffect(() => {
    UpdateUserData();
  }, []);

  useEffect(() => {
    fetchDarbobilietas();
  }, [userData.id, currentDate]);

  // Funkcija, kuri paspaudus ant datos nustato ją kaip pasirinktą
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // Find the DarboBilietas for the selected date
    const darboBilietas = darbobilietai.find((db) => new Date(db.Nuo).getDate() === date.getDate());

    if (darboBilietas) {
      setModalData(darboBilietas); // Set the modal data
      setIsModalOpen(true); // Open the modal
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalData(null); // Clear the modal data
  };

  // Gauna mėnesio dienų skaičių
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Gauna pirmą mėnesio dieną
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Kito mėnesio mygtuko funkcija
  function handleNextMonth() {
    // Get the next month and year
    const nextMonth = currentDate.getMonth() + 1;
    const nextYear = currentDate.getFullYear() + (nextMonth === 12 ? 1 : 0);

    // Update the currentDate state variable to the first day of the next month
    setCurrentDate(new Date(nextYear, nextMonth % 12, 1));
  }

  // Praito menesio mygtuko funkcija
  function handlePreviousMonth() {
    // Get the previous month and year
    const previousMonth = currentDate.getMonth() - 1;
    const previousYear = currentDate.getFullYear() - (previousMonth === -1 ? 1 : 0);

    // If the previous month is the current month, update the currentDate state variable to the current date
    const now = new Date();
    if (previousMonth === now.getMonth() && previousYear === now.getFullYear()) {
      setCurrentDate(now);
    } else {
      // Update the currentDate state variable to the first day of the previous month
      setCurrentDate(new Date(previousYear, previousMonth === -1 ? 11 : previousMonth, 1));
    }
  }

  // Mėnesio dienų ir savaitės pradžios
  const daysInCurrentMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfCurrentMonth = (getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) + 6) % 7;

  // Savaitės dienų stulpeliai
  const daysOfWeek = LITHUANIAN_WEEKDAYS.map((weekday) => (
    <th
      key={weekday}
      style={{ margin: "2rem", backgroundColor: "#223a86", color: "white", border: "1px solid black", padding: "2rem", textAlign: "center" }}
    >
      {weekday}
    </th>
  ));

  // Duomenų trinimas

  async function handleDelete() {
    try {
      // Check if modalData is not null
      if (modalData) {
        console.log("Deleting item with ID: ", modalData.ID); // Log the ID

        // Make a DELETE request to your API endpoint
        const response = await axios.delete(`/api/darbobilietas/${modalData.ID}/${modalData.SukureID}`);
        console.log(response);

        console.log("Sėkmingas ištrinimas");

        // Close the modal and refresh the data
        setIsModalOpen(false);
        fetchData(); // Refresh the data
      }
    } catch (error) {
      console.error("Failed to delete data: ", error);
    }
  }
  // Grąžina JSX elementus su kalendoriumi
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", height: "100vh", margin: "2rem" }}>
      <div style={{ border: "2px solid black", borderRadius: "10px", padding: "20px" }}>
        {/* Prieš tai esančio mėnesio mygtukas */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* Prieš tai esančio mėnesio mygtukas */}
          <button
            style={{ lineHeight: "1.5" }}
            className="m-1 mr-2 ml-2 mb-5 border-solid border-2 rounded p-1 hover:border-black hover:bg -[#e4e4e4]"
            onClick={handlePreviousMonth}
          >
            Ankstesnis
          </button>

          {/* Mėnesio pavadinimas */}
          <div style={{ display: "flex", alignItems: "center", margin: "0 10px", paddingBottom: "15px" }}>
            <span style={{ fontSize: "30px", fontWeight: "bold" }}>{LITHUANIAN_MONTHS[currentDate.getMonth()]}</span>
          </div>

          {/* Sekančio mėnesio mygtukas */}
          <button
            style={{ lineHeight: "1.5 " }}
            className="m-1 mr-2 ml-2 mb-5 border-solid border-2 rounded p-1 hover:border-black hover:bg -[#e4e4e4]"
            onClick={handleNextMonth}
          >
            Kitas
          </button>

          {/* Mygtukas, kuris rodo arba slepia dienų sąrašą */}
          <CalanderList showList={showList} setShowList={setShowList} currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </div>
        {!showList && (
          <>
            {/* Kalendoriaus lentelė */}
            <table style={{ backgroundColor: "light-grey", borderCollapse: "collapse" }}>
              <thead>
                <tr>{daysOfWeek}</tr>
              </thead>
              <tbody>
                {/* Sukuria dienų lentelę */}
                {Array.from({ length: Math.ceil((daysInCurrentMonth + firstDayOfCurrentMonth) / 7) }, (_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }, (_, j) => {
                      const day = i * 7 + j - firstDayOfCurrentMonth + 1;
                      if (day > 0 && day <= daysInCurrentMonth) {
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 12); // Add 12 to create the date at noon
                        return (
                          <td
                            key={j}
                            onClick={() => handleDateClick(date)}
                            style={{
                              position: "relative",
                              overflow: "auto",
                              border: "1px solid black",
                              backgroundColor:
                                day === currentDate.getDate() &&
                                selectedDate.getMonth() === currentDate.getMonth() &&
                                selectedDate.getFullYear() === currentDate.getFullYear()
                                  ? "#223a86"
                                  : "white",
                              textAlign: "right",
                              padding: "3rem",
                              transition: "background-color 0.3s",
                              cursor: "pointer",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#223a86")}
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                day === currentDate.getDate() &&
                                selectedDate.getMonth() === currentDate.getMonth() &&
                                selectedDate.getFullYear() === currentDate.getFullYear()
                                  ? "#223a86"
                                  : "white")
                            }
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                fontWeight: "bold",
                                color: day === currentDate.getDate() && selectedDate.getMonth() === currentDate.getMonth() ? "white" : "black",
                              }}
                            >
                              {day}
                            </div>
                            {darbobilietai.map((darbobilietas) => {
                              const nuoDate = new Date(darbobilietas.Nuo);
                              const ikiDate = new Date(darbobilietas.Iki);

                              const isSameOrAfterNuo =
                                date.getFullYear() > nuoDate.getFullYear() ||
                                (date.getFullYear() === nuoDate.getFullYear() && date.getMonth() > nuoDate.getMonth()) ||
                                (date.getFullYear() === nuoDate.getFullYear() &&
                                  date.getMonth() === nuoDate.getMonth() &&
                                  date.getDate() >= nuoDate.getDate());

                              const isSameOrBeforeIki =
                                date.getFullYear() < ikiDate.getFullYear() ||
                                (date.getFullYear() === ikiDate.getFullYear() && date.getMonth() < ikiDate.getMonth()) ||
                                (date.getFullYear() === ikiDate.getFullYear() &&
                                  date.getMonth() === ikiDate.getMonth() &&
                                  date.getDate() <= ikiDate.getDate());

                              if (isSameOrAfterNuo && isSameOrBeforeIki) {
                                return (
                                  <div
                                    key={darbobilietas.id}
                                    style={{
                                      backgroundColor: "#f8f9fa",
                                      border: "1px solid #dee2e6",
                                      borderRadius: "5px",
                                      padding: "5px",
                                      margin: "5px 0",
                                      fontSize: "0.8rem",
                                      cursor: "pointer",
                                      transition: "background-color 0.3s",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "yellow")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent the cell's click handler from being triggered
                                      setModalData(darbobilietas); // Set the modal data
                                      setIsModalOpen(true); // Open the modal
                                    }}
                                  >
                                    {darbobilietas.Pavadinimas}
                                  </div>
                                );
                              }
                            })}
                          </td>
                        );
                      } else {
                        return <td key={j} style={{ border: "1px solid black" }} />;
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pasirinktos datos rodymas */}
            <h2>
              Pasirinkta data: {selectedDate.getFullYear()} {LITHUANIAN_MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()}
            </h2>
          </>
        )}
        {/* POP UP Konfiguracijos */}
        {isModalOpen && modalData && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "30%", // Set the width to 50% of the parent
                height: "50%", // Set the height to 50% of the parent
                // Align items to the start of the main axis (which is vertical in this case because flexDirection is set to "column")
              }}
            >
              {/* Darbo bilieto pavadinimas */}
              <div
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
              >
                <h1>Darbo bilietas</h1>
              </div>

              {/* Darbo  bilieto informacija */}
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start", // Align items to the start of the main axis (which is vertical in this case because flexDirection is set to "column")
                  alignItems: "flex-start", // Align items to the start of the cross axis (which is horizontal in this case because flexDirection is set to "column")
                  textAlign: "left", // Align text to the left
                }}
              >
                <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Pavadinimas: </h2>
                <p style={{ fontSize: "18px" }}>{modalData.Pavadinimas}</p>
                <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Aprasymas: </h2>
                <p style={{ fontSize: "18px" }}>{modalData.Aprasymas}</p>
                <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Nuo: </h2>
                <p style={{ fontSize: "18px" }}>{modalData.Nuo}</p>
                <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Iki: </h2>
                <p style={{ fontSize: "18px" }}>{modalData.Iki}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <div style={{ alignSelf: "flex-end" }}>
                  <button
                    onClick={closeModal}
                    style={{
                      backgroundColor: "#223a86",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                  >
                    Uždaryti
                  </button>
                  <button
                    onClick={handleDelete}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                  >
                    Ištrinti
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar; // Eksportuojamas kalendoriaus komponentas

function fetchData() {
  throw new Error("Function not implemented.");
}
