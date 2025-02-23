import React from "react";
import "./ApplicationDetail.css";
import user from "../../../../../assets/user.png";
import { useState, useEffect } from "react";
import axios from "axios";

import { GiClick } from "react-icons/gi";

function ApplicationDetail({ applicationId }) {
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allJuries, setAllJuries] = useState([]);
  const [selectedJury, setSelectedJury] = useState(null);
  const [popup, setOpenPopup] = useState(false);
  const [juryName, setJuryName] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.post(
          "https://apsis.kocaeli.edu.tr/api/rector/get-applications",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const applications = response.data.data || [];

        const matchedApplication = applications.find(
          (app) => app._id === applicationId
        );

        if (matchedApplication) {
          const updatedPreliminaryJuries = (
            matchedApplication.preliminaryJuries || []
          ).map((jury) => ({
            ...jury,
            type: "Ön Değerlendirme",
          }));

          const updatedScientificJuries = (
            matchedApplication.scientificJuries || []
          ).map((jury) => ({
            ...jury,
            type: "Bilimsel Değerlendirme",
          }));

          setApplication({
            ...matchedApplication,
            preliminaryJuries: updatedPreliminaryJuries,
            scientificJuries: updatedScientificJuries,
          });
          console.log("application", application);
          setAllJuries([
            ...(updatedPreliminaryJuries || []),
            ...(updatedScientificJuries || []),
          ]);
        } else {
          console.warn(
            "Belirtilen applicationId ile eşleşen başvuru bulunamadı."
          );
        }
      } catch (error) {
        console.error("Başvuruları çekerken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [applicationId]);

  const truncateText = (text) => {
    return text.length > 25 ? text.substring(0, 22) + "..." : text;
  };

  useEffect(() => {
    console.log("selected Jury", selectedJury);
  }, [selectedJury]);

  const handleSelectJury = (jury) => {
    if (jury.type === "Ön Değerlendirme") {
      const ev = application.preliminaryEvaluations.find(
        (pe) => pe.juryName === jury.juryName
      );
      setSelectedJury(ev);
    } else {
      const ev = application.scientificEvaluations.find(
        (se) => se.juryName === jury.juryName
      );
      setSelectedJury(ev);
    }
  };
  const handleAssignJury = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Yetkilendirme hatası: Lütfen tekrar giriş yapın.");
      return;
    }

    try {
      const response = await axios.post(
        "https://apsis.kocaeli.edu.tr/api/rector/add-scientific-jury",
        {
          juryName: juryName,
          applicationId: applicationId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Jüri başarıyla atandı.");
        setOpenPopup(false);
        setJuryName("");
      } else {
        alert("Jüri atama başarısız oldu.");
      }
    } catch (error) {
      console.error("Jüri atama sırasında hata oluştu:", error);
      alert("Jüri atama işlemi başarısız oldu.");
    }
  };

  return loading ? (
    <div>
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
    </div>
  ) : (
    <div className="applicationdetail-main">
      <div className="detail-content">
        <div className="detail-column-1">
          <span>
            <b>İlan Adı:</b> <br />
            {application.positionAnnouncement.title}
          </span>
          <span>
            <b>İlan Kadrosu:</b> <br />{" "}
            {application.positionAnnouncement.position}
          </span>
          <span>
            <b>Fakülte:</b> <br />
            {application.positionAnnouncement.faculty}
          </span>
          <span>
            <b>Bitiş Tarihi:</b> <br />
            {application.positionAnnouncement.deadLine}
          </span>
          <span>
            <b>İlan Açıklaması:</b> <br />
            {application.positionAnnouncement.description}
          </span>
        </div>
        <div className="header-content">
          <span className="detail-header-1">Juri Bilgileri:</span>
          <span className="detail-header-2">Başvuru Bilgileri:</span>
        </div>
        <div className="detail-colum-2">
          <div className="detail-column-2-r-1">
            <div className="li-area">
              {allJuries.map((jury, index) => (
                <li key={index}>
                  <img src={user} alt="" />
                  <span>
                    <b>Jüri Adı:</b> <br />
                    {jury.juryName}
                  </span>
                  <span>
                    <b>Jüri Türü:</b> <br />
                    {jury.type}
                  </span>
                  <span>
                    <b>Juri Durumu:</b> <br />
                    {jury.status}
                  </span>

                  <button onClick={() => handleSelectJury(jury)}>
                    <GiClick />
                  </button>
                </li>
              ))}
            </div>
            <span className="detail-header-2">Juri Kararı:</span>
            <div className="message-area">
              {selectedJury ? (
                <>
                  <span className="message-span">
                    Mesaj: {selectedJury.comment}
                  </span>
                  <span
                    className={`vote-span ${
                      selectedJury.decision === "accepted" ? "accepted" : ""
                    }`}
                  >
                    {selectedJury.decision === "accepted"
                      ? "Juri tarafından kabul edildi."
                      : "Juri tarafından reddedildi."}
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="detail-column-2-r-2">
            <span className="information-header">Kullanıcı Bilgileri: </span>
            <div className="info-div">
              <span className="info-header">Kullanıcı Adı:</span>
              <span className="info-itself">{application.username}</span>
              <span className="info-header">Mail:</span>
              <span className="info-itself">
                {application.username}@kocaeli.edu.tr
              </span>
            </div>
            <span className="information-header">Başvuru Bilgileri:</span>
            <div className="info-div">
              <span className="info-header">Başvuru Türü:</span>
              <span className="info-itself">{application.applicationType}</span>
              <span className="info-header">Başvuru Durumu:</span>
              <span className="info-itself">{application.status.name}</span>
            </div>
            {application.applicationType === "Scientific" ? (
              <button
                onClick={() => {
                  setOpenPopup(true);
                }}
                className="add-jury-button"
              >
                Juri Ata
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {popup && (
        <div className="addjurypopup">
          <div className="addjurypopup-inner">
            <button
              onClick={() => setOpenPopup(false)}
              className="close-button"
            >
              X
            </button>
            <div className="addjurypopup-content">
              <span className="addjurypopup-header">Juri Atama</span>
              <span className="addjurypopup-span">Juri Adı:</span>
              <input
                type="text"
                className="addjurypopup-input"
                value={juryName}
                onChange={(e) => setJuryName(e.target.value)}
              />
              <button
                className="addjurypopup-button"
                onClick={handleAssignJury}
              >
                Juri Ata
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationDetail;
