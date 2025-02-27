import "./RightBar.css";
import { useState, useEffect } from "react";
import axios from "axios";

function RightBar({ isOpen, onClose, givenGroup, givenId, from }) {
  const [requestUrl, setRequestUrl] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [idName, setIdName] = useState("");

  useEffect(() => {
    switch (from) {
      case "projects":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-project-rank"
        );
        setIdName("projectId");
        break;
      case "publications":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-publication-rank"
        );
        setIdName("publicationId");
        break;
      case "lessons":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-lesson-ranks"
        );
        setIdName("lessonId");
        break;
      case "awards":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-award-rank"
        );
        setIdName("awardId");
        break;
      case "thesis":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-advising-thesis-rank"
        );
        setIdName("advisingThesisId");
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
        <div className="right-bar-content">
          <div className="right-bar-content-header">
            <h1>{givenGroup}</h1>
          </div>
          <div className="right-bar-content-body">
            <p>ID: {givenId}</p>
            <p>Kategori: {from}</p>
          </div>
          <div className="right-bar-content-body">
            <label>Yeni Grup:</label>
            <input
              type="text"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              placeholder="Yeni grup giriniz"
            />
          </div>
          <button className="update-btn" onClick={updateRank}>
            Grubu Güncelle
          </button>
        </div>
      </div>
    </>
  );
}

export default RightBar;
