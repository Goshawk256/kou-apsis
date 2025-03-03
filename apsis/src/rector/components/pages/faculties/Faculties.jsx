import React from "react";
import "./Faculties.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
function Faculties() {
  const [faculties, setFaculties] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFaculties = async () => {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      if (!accessToken) {
        alert("Erişim tokeni bulunamadı!");
        return;
      }
      try {
        const response = await axios.get(
          "https://apsis.kocaeli.edu.tr/api//lookUp/get-faculties",

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFaculties(response.data.data);
      } catch (error) {
        alert("Jüriler getirilirken hata oluştu!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);
  return (
    <div className="faculties-main">
      <h2 className="faculties-header">Fakülteler</h2>
      {/* <button className="add-faculty-button">Fakülte Ekle</button> */}

      {loading ? (
        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>
      ) : (
        <div className="juries-content">
          {Object.entries(faculties).map(([key, facultyName]) => (
            <li key={key}>
              <span>
                <b>Fakülte Adı:</b> <br /> {facultyName}
              </span>
              <div className="jury-buttons">
                <button className="edit-jury">
                  <FaPencilAlt />
                </button>
                <button className="delete-jury">
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Faculties;
