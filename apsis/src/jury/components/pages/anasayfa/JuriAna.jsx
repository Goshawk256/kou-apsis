import { useEffect, useState } from "react";
import user from "../../../../assets/user.png";
import document from "../../../../assets/document.png";
import check from "../../../../assets/check.png";
import All_Url from "../../../../url.js";
import { motion, AnimatePresence } from "framer-motion";
import { IoFilterOutline } from "react-icons/io5";
import axios from "axios";
import "./JuriAna.css";
import PropTypes from "prop-types";

function JuriAna({ onSelect }) {
  const [isOndegerlendirme, setIsOndegerlendirme] = useState(true);
  const [preliminaryApplications, setPreliminaryApplications] = useState([]);
  const [scientificApplications, setScientificApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const responsePrimarly = await axios.post(
          `${All_Url.api_base_url}/jury/get-applications?statusId=1`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseScientific = await axios.post(
          `${All_Url.api_base_url}/jury/get-applications?statusId=4`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataScientific = responseScientific.data?.data;

        const dataPreliminary = responsePrimarly.data?.data;
        if (dataPreliminary) {
          setPreliminaryApplications(
            dataPreliminary.preliminaryApplications || []
          );
          setScientificApplications(
            dataScientific.scientificApplications || []
          );
          setSelectedApplication(dataPreliminary.preliminaryApplications || []);
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
    all: selectedApplication || [],
  };

  const handleSelectApplication = (appId) => {
    onSelect("Basvurudetay");
    localStorage.setItem("selectedApplication", appId);
    localStorage.setItem("isPreliminary", isOndegerlendirme);
  };

  const renderedButtons = () => {
    return (
      <>
        <button>Ön Değerlendirmede</button>
        <button>Bilimsel Değerlendirmede</button>
      </>
    );
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
                Bilimsel Başvurular
              </button>
            </div>
            <div className="juriana-columns">
              <div className="juriana-column">
                <div className="application-type-success">
                  <span>Başvurular</span>
                  <div className="application-count">
                    {/* {isOndegerlendirme ? (
                      ""
                    ) : (
                      <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <IoFilterOutline />
                      </button>
                    )}
                    {isFilterOpen && (
                      <div className="filter-dropdown">{renderedButtons()}</div>
                    )} */}
                    <button>{categorizedApplications?.all?.length}</button>
                  </div>
                </div>
                <div className="application-content">
                  {renderApplications(categorizedApplications?.all)}
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
