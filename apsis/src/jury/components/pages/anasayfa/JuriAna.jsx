import { useEffect, useState } from "react";
import user from "../../../../assets/user.png";
import document from "../../../../assets/document.png";
import check from "../../../../assets/check.png";
import All_Url from "../../../../url.js";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./JuriAna.css";
import PropTypes from "prop-types";

function JuriAna({ onSelect }) {
  const [isOndegerlendirme, setIsOndegerlendirme] = useState(true);
  const [preliminaryApplications, setPreliminaryApplications] = useState([]);
  const [scientificApplications, setScientificApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${All_Url.api_base_url}/jury/get-applications`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data?.data;
        if (data) {
          setPreliminaryApplications(data.preliminaryApplications || []);
          setScientificApplications(data.scientificApplications || []);
          setSelectedApplication(data.preliminaryApplications || []);
        }
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  const handleOndegerlendirme = (isPreliminary) => {
    setIsOndegerlendirme(isPreliminary);
    setSelectedApplication(
      isPreliminary ? preliminaryApplications : scientificApplications
    );
  };

  const categorizedApplications = {
    pending: (selectedApplication || []).filter(
      (app) => app.applicationStatus === "pending"
    ),
    applied: (selectedApplication || []).filter(
      (app) => app.applicationStatus === "applied"
    ),
    rejected: (selectedApplication || []).filter(
      (app) => app.applicationStatus === "reject"
    ),
  };

  const handleSelectApplication = (appId) => {
    onSelect("Basvurudetay");
    localStorage.setItem("selectedApplication", appId);
    localStorage.setItem("isPreliminary", isOndegerlendirme);
  };

  const renderApplications = (applications) => {
    return applications?.map((app) => (
      <div key={app.applicationId} className="application-card">
        <div className="a-c-r-1">
          <div className="a-c-r-1-1">
            <img src={user} alt="" />
          </div>
          <div className="a-c-r-1-2">
            <span className="username-span">{app.applicantUsername}</span>
            <span className="usermail-span">{app.userMail}</span>
          </div>
        </div>
        <div className="divider-horizontal"></div>
        <div className="a-c-r-2">
          <div className="a-c-r-2-1">
            <div className="usertitle">
              <span className="usertitle-span">
                Başvurulan Kadro: {app.title}
              </span>
            </div>
            <div className="user-department">
              <button>
                <img src={document} alt="" />
              </button>
              <button
                onClick={() => handleSelectApplication(app.applicationId)}
              >
                <img src={check} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isOndegerlendirme}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="main-juriana">
          <div className="juriana-content">
            <div className="basvurular-top-sections">
              <button
                onClick={() => handleOndegerlendirme(true)}
                className={`basvurular-degerlendirme-btn ${
                  isOndegerlendirme ? "active" : ""
                }`}
              >
                Ön Değerlendirme Başvuruları
              </button>
              <button
                onClick={() => handleOndegerlendirme(false)}
                className={`basvurular-degerlendirme-btn ${
                  !isOndegerlendirme ? "active" : ""
                }`}
              >
                Kadro Başvuruları
              </button>
            </div>
            <div className="juriana-columns">
              <div className="juriana-column">
                <div className="application-type-waiting">
                  <span>BEKLEYEN</span>
                  <button>{categorizedApplications?.pending?.length}</button>
                </div>
                <div className="application-content">
                  {renderApplications(categorizedApplications?.pending)}
                </div>
              </div>
              <div className="juriana-column">
                <div className="application-type-success">
                  <span>ONAYLANAN</span>
                  <button>{categorizedApplications?.applied?.length}</button>
                </div>
                <div className="application-content">
                  {renderApplications(categorizedApplications?.applied)}
                </div>
              </div>
              <div className="juriana-column">
                <div className="application-type-reject">
                  <span>REDDEDİLEN</span>
                  <button>{categorizedApplications?.rejected?.length}</button>
                </div>
                <div className="application-content">
                  {renderApplications(categorizedApplications?.rejected)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

JuriAna.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default JuriAna;
