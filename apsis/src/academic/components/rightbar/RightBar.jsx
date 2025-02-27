import "./RightBar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
function RightBar({ isOpen, onClose, givenGroup, givenId, from, refresh }) {
  const [requestUrl, setRequestUrl] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [idName, setIdName] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    switch (from) {
      case "projects":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-project-rank"
        );
        setIdName("projectId");
        setName("Proje Düzenleme");
        break;
      case "publications":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-publication-rank"
        );
        setIdName("publicationId");
        setName("Yayın Düzenleme");
        break;
      case "lessons":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-lesson-ranks"
        );
        setIdName("lessonId");
        setName("Ders Düzenleme");
        break;
      case "awards":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-award-rank"
        );
        setIdName("awardId");
        setName("Ödül Düzenleme");
        break;
      case "thesis":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-advising-thesis-rank"
        );
        setIdName("advisingThesisId");
        setName("Tez Düzenleme");
        break;
      default:
        setRequestUrl("#");
        setIdName("unknownId");
    }
  }, [from]);

  const updateRank = async () => {
    if (!requestUrl || !idName || !newGroup) {
      console.error("Eksik bilgi! API çağrısı yapılamaz.");
      return;
    }
    try {
      const response = await axios.put(
        requestUrl,
        {
          [idName]: givenId,
          group: newGroup,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Başarıyla güncellendi:", response.data);
    } catch (error) {
      console.error("Rank update error:", error);
    } finally {
      refresh();
      onClose();
    }
  };

  return (
    <>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`right-bar ${isOpen ? "open" : ""} `}>
        <div className="right-bar-header">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <p>Kategori: {name}</p>
        <div className="right-bar-content">
          <div className="content-r-1">
            <div className="right-bar-content-header">
              <span>Sistemin Atadığı Grup: {givenGroup}</span>
            </div>
            <div className="right-bar-content-body">
              <div>
                <label>Yeni Grup:</label>
                <input
                  type="text"
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  placeholder="Grup"
                />
              </div>
              <button className="update-btn" onClick={updateRank}>
                <GrUpdate />
              </button>
            </div>
          </div>
          <div className="content-r-2"></div>
        </div>
      </div>
    </>
  );
}

export default RightBar;
