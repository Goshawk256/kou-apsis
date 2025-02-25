import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import All_Url from "../../../../../url.js";
import NotFound from "../../../errorstacks/NotFound.jsx";
import "./MyApplications.css";
import { motion, AnimatePresence } from "framer-motion";

function MyApplications({ onSelect }) {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const setBavuru = (text) => {
    localStorage.setItem("bavuruTipi", text);
  };
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${All_Url.api_base_url}/academic/get-applications`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.data.success) {
          setApplications(response.data.data.applications);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="myapplications-main">
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
        <>
          <h1 className="myapplications-header">Başvurularım</h1>

          <div className="myapplications-content">
            <div className="myapplications-table">
              <AnimatePresence mode="wait">
                <motion.table
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <thead>
                    <tr>
                      <th>Başvuru Tarihi</th>
                      <th>Başvurulan Kadro</th>
                      <th>Başvuru Tipi</th>
                      <th>Başvuru Durumu</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="myapplications-table-body">
                    {applications.length > 0 ? (
                      applications.map((app) => (
                        <tr key={app.applicationId}>
                          <td>{new Date().toLocaleDateString()}</td>
                          <td>{app.title}</td>
                          <td>
                            {app.userType === "Academic"
                              ? "Kurum İçi"
                              : "Kurum Dışı"}
                          </td>
                          <td>{app.applicationStatus}</td>
                          <td>
                            <button className="myapplications-button">
                              PDF indir
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">
                          <NotFound />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </motion.table>
              </AnimatePresence>
            </div>
          </div>
          <div className="myapplication-buttons">
            <button
              onClick={() => {
                onSelect();
                setBavuru("Preliminary");
              }}
            >
              Yeni Başvuru
            </button>
            <button
              onClick={() => {
                onSelect();
                setBavuru("Preliminary");
              }}
            >
              Yeni Kadro Başvurusu
            </button>
          </div>
        </>
      )}
      {selectedApplication && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Başvuru Detayları</h2>
            <div className="first-row">
              <p>
                <strong>Başvurulan Kadro:</strong> {selectedApplication.title}
              </p>
              <p>
                <strong>Başvuru Tipi:</strong>{" "}
                {selectedApplication.userType === "Academic"
                  ? "Kurum İçi"
                  : "Kurum Dışı"}
              </p>
            </div>
            {[
              "publications",
              "projects",
              "thesis",
              "books",
              "awards",
              "lessons",
              "citations",
              "artworks",
              "",
            ].map(
              (category) =>
                selectedApplication[category] &&
                selectedApplication[category].length > 0 && (
                  <div key={category}>
                    <h3>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <ul>
                      {selectedApplication[category].map((item) => (
                        <li key={item.id}>
                          {item.title ||
                            item.projectName ||
                            item.bookName ||
                            item.awardName ||
                            item.thesisTitle}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
            <button onClick={() => setSelectedApplication(null)}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
}
MyApplications.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default MyApplications;
