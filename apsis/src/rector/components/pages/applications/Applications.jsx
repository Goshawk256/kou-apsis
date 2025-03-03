import React, { useState, useEffect } from "react";
import "./Applications.css";
import user from "../../../../assets/user.png";
import check from "../../../../assets/check.png";
import previous from "../../../../assets/previous.png";
import { motion, AnimatePresence } from "framer-motion";
import ApplicationDetail from "./applicationdetail/ApplicationDetail";
import axios from "axios";

function Applications() {
  const [isSelected, setIsSelected] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.post(
          "https://apsis.kocaeli.edu.tr/api/rector/get-applications",
          {}, // Boş bir obje göndermek gerekiyor
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(response.data.data || []);
      } catch (error) {
        console.error("Başvuruları çekerken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const selectApplication = (id) => {
    setSelectedApplicationId(id);
    setIsSelected(!isSelected);
  };

  return (
    <div className="applications-main">
      <h2 className="applications-header">Başvurular</h2>
      {isSelected ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={isSelected}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="applications-content">
              <button onClick={selectApplication} className="previous-button">
                <img src={previous} alt="geri" />
              </button>
              <ApplicationDetail applicationId={selectedApplicationId} />
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={isSelected}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
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
              <div className="applications-content">
                <div className="content-column-1">
                  <div className="content-header"></div>
                  <div className="content">
                    {applications.map((app) => (
                      <li key={app._id}>
                        <img src={user} alt="" />
                        <span>
                          Başvuran Kişi: <br />
                          {app.username}
                        </span>
                        <span>
                          Başvurulan Kadro: <br /> {app.title}
                        </span>
                        <span>
                          Başvuru Durumu: <br />
                          {app.status.name}
                        </span>
                        <span>
                          Başvuru Türü: <br />
                          {app.applicationType === "Preliminary"
                            ? "Ön Değerlendirme"
                            : "Bilimsel"}
                        </span>
                        <button onClick={() => selectApplication(app._id)}>
                          <img src={check} alt="" />
                        </button>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Applications;
