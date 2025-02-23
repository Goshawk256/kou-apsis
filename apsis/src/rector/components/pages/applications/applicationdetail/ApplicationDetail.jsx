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

          setAllJuries([
            ...(updatedPreliminaryJuries || []),
            ...(updatedScientificJuries || []),
          ]);

          console.log("app", application);
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
  }, [applicationId]); // applicationId değiştiğinde useEffect tetiklenecek

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
        <span className="detail-header">
          Başvuran Kişi: {application.username} / Başvuru Türü:{" "}
          {application.applicationType}
        </span>
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
          <span className="detail-header-2">Başvuru İçeriği:</span>
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
                  <span className="vote-span">
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
          <div className="detail-column-2-r-2"></div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
