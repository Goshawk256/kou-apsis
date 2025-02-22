import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./BasvuruDetay.css";
import previous from "../../../../assets/previous.png";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import All_Url from "../../../../url.js";

function BasvuruDetay({ onSelect }) {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("publications");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [reason, setReason] = useState("");
  const [warning, setWarning] = useState("");
  const itemsPerPage = 5;

  const showPopup = (type) => {
    setPopupType(type);
    setPopupVisible(true);
    setReason("");
    setWarning("");
  };

  const handlePopupConfirm = async () => {
    const token = localStorage.getItem("accessToken");
    const applicationId = selectedApplication?.applicationId;
    const decision = popupType === "approve" ? "accepted" : "rejected";
    const isOndegerlendirme = localStorage.getItem("isOndegerlendirme");
    try {
      await axios.post(
        `${All_Url.api_base_url}/jury${
          isOndegerlendirme === true
            ? "/add-preliminary-evaluation"
            : "/add-scientific-evaluation"
        }`,
        {
          applicationId,
          comment: reason,
          decision,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWarning(
        `${popupType === "approve" ? "Onaylama" : "Reddetme"} işlemi başarılı!`
      );
    } catch (error) {
      setWarning("İşlem sırasında hata oluştu.");
      console.error("Hata:", error);
    }

    setTimeout(() => {
      setPopupVisible(false);
    }, 2000);
  };

  const transformData = (categoryData) => {
    return categoryData.map((item) => ({
      title: item.title || item.projectName || item.course_name || "",
      score: item.score || 0,
      group: item.group || "",
      documentUrl: item.documentUrl || "#",
    }));
  };

  const categoryMap = {
    publications: "Yayınlar",
    lessons: "Dersler",
    advisingThesis: "Tezler",
    projects: "Projeler",
    awards: "Ödüller",
    artworks: "Sanat Eserleri",
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchData = async () => {
      try {
        const basvuruId = localStorage.getItem("selectedApplication");
        const response = await axios.post(
          `${All_Url.api_base_url}/jury/get-applications`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const applications = [
          ...response.data.data.preliminaryApplications,
          ...response.data.data.scientificApplications,
        ];
        const selectedApp = applications.find(
          (app) => app.applicationId === basvuruId
        );

        setSelectedApplication(selectedApp);
        console.log(selectedApp);
      } catch (error) {
        console.error("Hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedApplication) {
      const selectedData = selectedApplication[selectedCategory];
      if (selectedData) {
        setData(transformData(selectedData)); // Veriyi dönüştürüp state'e set et
      }
      setCurrentPage(1); // Sayfayı sıfırlıyoruz
    }
  }, [selectedApplication, selectedCategory]);

  // Arama ve sayfalama
  const filteredData = data.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return loading ? (
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
  ) : !selectedApplication ? (
    "Başvuru bulunamadı"
  ) : (
    <div className="main-basvurudetay">
      <button className="go-back-button" onClick={() => onSelect("Ana Sayfa")}>
        <img src={previous} alt="Geri" />
      </button>
      <div className="basvurudetay-content">
        <div className="basvurudetay-header">
          <span className="user-header">
            {selectedApplication.applicantUsername}
          </span>
          <span className="user-date">{selectedApplication.userMail}</span>
        </div>
        <div className="basvurudetay-inner">
          <div className="table-section">
            {Object.keys(categoryMap).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "active" : ""}
              >
                {categoryMap[category]} {/* Türkçe kategori ismi */}
              </button>
            ))}
          </div>
          <div className="basvurudetay-main-row-2">
            <input
              type="text"
              placeholder="Arama Sözcüğünüzü Giriniz..."
              className="basvurudetay-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="basvurudetay-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ‹
              </button>
              <span>
                {currentPage} / {totalPages || 1}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                ›
              </button>
            </div>
          </div>
          <div className="outer-table">
            <table className="basvurudetay-table">
              <thead>
                <tr>
                  <th>İçerik Adı</th>
                  <th>İçerik Grubu</th>
                  <th>İçerik Puanı</th>
                  <th>Yüklenen Belge</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.length > 0 ? (
                  displayedData.map((item) => (
                    <tr key={item.title}>
                      <td>{item.title}</td>
                      <td>{item.group}</td>
                      <td>{item.score}</td>
                      <td>
                        <a href={item.documentUrl}>Belge</a>
                      </td>
                      <td>
                        <button>
                          <FaPencilAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Veri bulunamadı</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="basvurudetay-buttons">
            <button
              className="basvurudetay-button-onayla"
              onClick={() => showPopup("approve")}
            >
              Başvuruyu Onayla
            </button>
            <button
              className="basvurudetay-button-reddet"
              onClick={() => showPopup("reject")}
            >
              Başvuruyu Reddet
            </button>
          </div>
          {popupVisible && (
            <div className="basvurudetay-popup">
              <div className="popup-content">
                <h3>
                  {popupType === "approve"
                    ? "Başvuruyu Onayla"
                    : "Başvuruyu Reddet"}
                </h3>
                <textarea
                  placeholder={
                    popupType === "approve"
                      ? "Onay açıklaması giriniz..."
                      : "Red açıklaması giriniz..."
                  }
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                <button onClick={handlePopupConfirm}>Tamamla</button>
                <button onClick={() => setPopupVisible(false)}>İptal</button>
                {warning && <p className="warning-message">{warning}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

BasvuruDetay.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default BasvuruDetay;
