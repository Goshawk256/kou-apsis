import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lists.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

// Tarih formatlama fonksiyonu
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  // Tarihi gg/aa/yyyy formatında döndürmek için / ile ayırıyoruz
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Ay 0'dan başlar, 1 ekliyoruz
  const year = d.getFullYear();
  return `${day}/${month}/${year}`; // Slash ile ayırıyoruz
};

function Lists() {
  const [announcements, setAnnouncements] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    faculty: "",
    postingDate: formatDate(new Date()), // Bugünün tarihi gg/aa/yyyy formatında
    deadLine: "",
    position: "",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "https://apsis.kocaeli.edu.tr/api/position-annoucement/get-position-anouncements",
        {
          title: "",
          description: "",
          faculty: "",
          postingDate: "",
          deadLine: "",
          position: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const formattedData = response.data.data.map((item) => ({
        ...item,
        postingDate: formatDate(item.postingDate),
        deadLine: formatDate(item.deadLine),
      }));
      setAnnouncements(formattedData || []);
    } catch (error) {
      console.error("İlanları çekerken hata oluştu:", error);
    }
  };

  const handleAddAnnouncement = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const formattedAnnouncement = {
        ...newAnnouncement,
        postingDate: formatDate(new Date()), // Bugünün tarihini gg/aa/yyyy formatında ayarla
        deadLine: formatDate(newAnnouncement.deadLine), // Kullanıcının seçtiği tarihi gg/aa/yyyy yap
      };
      console.log(formattedAnnouncement);
      await axios.post(
        "https://apsis.kocaeli.edu.tr/api/rector/add-position-announcement",
        formattedAnnouncement,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowPopup(false);
      fetchAnnouncements();
    } catch (error) {
      console.error("İlan eklerken hata oluştu:", error);
    }
  };

  return (
    <div className="lists-main">
      <h2 className="lists-header">İlanlar</h2>
      <button className="add-list-button" onClick={() => setShowPopup(true)}>
        Yeni İlan
      </button>
      <div className="lists-content">
        {announcements.map((item, index) => (
          <li key={index}>
            <span>
              <b>İlan Adı:</b> <br />
              {item.title}
            </span>
            <span>
              <b>İlan Kadrosu:</b> <br />
              {item.position}
            </span>
            <span>
              <b>Fakülte:</b> <br />
              {item.faculty}
            </span>
            <span>
              <b>İlan Tarihi:</b> <br />
              {item.postingDate}
            </span>
            <span>
              <b>Bitiş Tarihi:</b> <br />
              {item.deadLine}
            </span>
            <span>
              <b>İlan Açıklaması:</b> <br />
              {item.description}
            </span>
            <div className="list-buttons">
              <button className="edit-list">
                <FaPencilAlt />
              </button>
              <button className="delete-list">
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </div>

      {showPopup && (
        <div className="listpopup-overlay" onClick={() => setShowPopup(false)}>
          <div className="listpopup" onClick={(e) => e.stopPropagation()}>
            <h3>Yeni İlan Ekle</h3>
            <input
              type="text"
              placeholder="İlan Adı"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  title: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Kadrosu"
              value={newAnnouncement.position}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  position: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Fakülte"
              value={newAnnouncement.faculty}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  faculty: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={newAnnouncement.deadLine}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  deadLine: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Açıklama"
              value={newAnnouncement.description}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  description: e.target.value,
                })
              }
            ></textarea>
            <div className="listpopup-buttons">
              <button
                onClick={handleAddAnnouncement}
                className="confirm-button"
              >
                Ekle
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="cancel-button"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lists;
