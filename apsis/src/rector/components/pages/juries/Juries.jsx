import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Juries.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const facultyOptions = [
  "Mühendislik Fakültesi",
  "Fen-Edebiyat Fakültesi",
  "İktisadi ve İdari Bilimler Fakültesi",
  "Hukuk Fakültesi",
  "İletişim Fakültesi",
];

function Juries() {
  const [showPopup, setShowPopup] = useState(false);
  const [juryName, setJuryName] = useState("");
  const [facultyName, setFacultyName] = useState(facultyOptions[0]);
  const [juries, setJuries] = useState([]);

  useEffect(() => {
    const fetchJuries = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Erişim tokeni bulunamadı!");
        return;
      }
      try {
        const response = await axios.post(
          "https://apsis.kocaeli.edu.tr/api/rector/get-faculty-juries",
          {
            facultyName: "Mühendislik Fakültesi",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setJuries(response.data.data);
      } catch (error) {
        alert("Jüriler getirilirken hata oluştu!");
        console.error(error);
      }
    };

    fetchJuries();
  }, []);

  const handleAddJury = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Erişim tokeni bulunamadı!");
      return;
    }

    try {
      await axios.post(
        "https://apsis.kocaeli.edu.tr/api/rector/add-preliminary-jury",
        {
          juryName,
          facultyName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Jüri başarıyla eklendi!");
      setShowPopup(false);
    } catch (error) {
      alert("Jüri eklenirken hata oluştu!");
      console.error(error);
    }
  };

  return (
    <div className="juries-main">
      <h2 className="juries-header">Ön Değerlendirme Jürileri</h2>
      <button
        className="juries-add-jury-button"
        onClick={() => setShowPopup(true)}
      >
        Jüri Ekle
      </button>
      {showPopup && (
        <div className="addpopup-overlay">
          <div className="addpopup">
            <h3>Jüri Ekle</h3>
            <label>
              Jüri Adı:
              <input
                type="text"
                value={juryName}
                onChange={(e) => setJuryName(e.target.value)}
              />
            </label>
            <label>
              Atanacağı Fakülte:
              <select
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              >
                {facultyOptions.map((faculty, index) => (
                  <option key={index} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </label>
            <div className="addpopup-buttons">
              <button
                onClick={handleAddJury}
                className="addpopup-button confirm"
              >
                Tamam
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="addpopup-button cancel"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="juries-content">
        {juries.map((jury) => (
          <li key={jury._id}>
            <span>
              <b>Jüri Adı:</b> <br /> {jury.juryName}
            </span>
            <span>
              <b>Atandığı Fakülte:</b> <br /> {jury.facultyName.toUpperCase()}
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
    </div>
  );
}

export default Juries;
