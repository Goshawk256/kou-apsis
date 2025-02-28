import { useState, useEffect } from "react";
import "./Yayinlar.css";
import {
  FaSync,
  FaPencilAlt,
  FaCheckSquare,
  FaInfo,
  FaRegSquare,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";
import All_Url from "../../../../url";
import NotFound from "../../errorstacks/NotFound";
import { refreshTheToken } from "../../../../middlewares/authMiddleware";
import click from "../../../../assets/click.png";
import { motion, AnimatePresence } from "framer-motion";
import RightBar from "../../rightbar/RightBar";
function Yayinlar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [publicationTypeId, setPublicationTypeId] = useState(1);
  const [popupMessage, setPopupMessage] = useState(null);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode] = useState(false);
  const [storageKey, setStorageKey] = useState("savedPublications");
  const [allPublications, setAllPublications] = useState({});
  const [givenGroup, setgivenGroup] = useState("");
  const [givenId, setgivenId] = useState("");
  const [givenPublicationTypeId, setgivenPublicationTypeId] = useState("");
  useEffect(() => {
    updateAllPublications();
  }, []);
  const updateAllPublications = () => {
    const keys = ["savedArticles", "savedBooks", "savedConferencePapers"];
    let combinedPublications = {};

    keys.forEach((key) => {
      const savedItems = JSON.parse(localStorage.getItem(key)) || [];
      savedItems.forEach((item) => {
        combinedPublications[item.id] = item;
      });
    });

    setAllPublications(combinedPublications);
  };

  const handleEditClick = (id, grup, publicationTypeId) => {
    openRightBar();
    setgivenGroup(grup);
    setgivenId(id);
    setgivenPublicationTypeId(publicationTypeId);
  };

  const username = localStorage.getItem("username");

  useEffect(() => {
    refreshTheToken();
    if (username) {
      if (publicationTypeId === 2) {
        fetchPublications();
      } else {
        fetchPublications();
      }
    } else {
      console.error("Kullanıcı adı localStorage'da bulunamadı.");
    }
  }, [publicationTypeId]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, publicationTypeId]);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        showPopup("Yetkilendirme hatası: Token bulunamadı.", "error");
        return;
      }

      const response = await axios.post(
        `${All_Url.api_base_url}/academic/get-publications`,
        { publicationTypeId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.data.success) {
        setTableData(
          response.data.data.sort(
            (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
          )
        );
      } else {
        showPopup(response.data.message || "Veri çekme başarısız.", "error");
      }
    } catch (error) {
      showPopup("Veri çekerken bir hata oluştu.", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = tableData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const saveToLocalStorage = (publication) => {
    let key;
    switch (publication.publicationTypeId) {
      case 1:
        key = "savedArticles";
        break;
      case 2:
        key = "savedBooks";
        break;
      case 4:
        key = "savedConferencePapers";
        break;
      default:
        showPopup("Geçersiz yayın türü!", "error");
        return;
    }

    let savedPublications = JSON.parse(localStorage.getItem(key)) || [];
    const isAlreadySaved = savedPublications.some(
      (pub) => pub.id === publication.id
    );

    if (isAlreadySaved) {
      const confirmDelete = window.confirm(
        "Bu yayın zaten kaydedilmiş, kaldırmak ister misiniz?"
      );
      if (confirmDelete) {
        savedPublications = savedPublications.filter(
          (pub) => pub.id !== publication.id
        );
        showPopup("Yayın kaldırıldı.", "success");
      }
    } else {
      savedPublications.push(publication);
      showPopup("Yayın kaydedildi.", "success");
    }

    localStorage.setItem(key, JSON.stringify(savedPublications));

    updateAllPublications();
  };

  const showPopup = (message, type) => {
    setPopupMessage({ message, type });
    setTimeout(() => setPopupMessage(null), 1500);
  };

  const itemsPerPage = 4;
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const getPreferredGroupDisplay = (item) => {
    if (item.groupJuryEdited !== "-") {
      return (
        <div className="preffered-group">
          <s>{item.groupAuto}</s> / <s>{item.groupEdited}</s> /{" "}
          <span>{item.groupJuryEdited}</span>
        </div>
      );
    } else if (item.groupEdited !== "-") {
      return (
        <div className="preffered-group">
          <s>{item.groupAuto}</s> / <span>{item.groupEdited}</span>
        </div>
      );
    } else {
      return (
        <div className="preffered-group">
          <span>{item.groupAuto}</span>
        </div>
      );
    }
  };
  const getPrerredScoreDisplay = (item) => {
    if (item.groupJuryEdited !== "-") {
      return (
        <div className="preffered-group">
          <s>{item.scoreAuto}</s> / <s>{item.scoreEdited}</s> /{" "}
          <span>{item.scoreJuryEdited}</span>
        </div>
      );
    } else if (item.groupEdited !== "-") {
      return (
        <div className="preffered-group">
          <s>{item.scoreAuto}</s> / <span>{item.scoreEdited}</span>
        </div>
      );
    } else {
      return (
        <div className="preffered-group">
          <span>{item.scoreAuto}</span>
        </div>
      );
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const openRightBar = () => setRightBarOpen(true);
  const closeRightBar = () => setRightBarOpen(false);
  return (
    <div className={`yayinlar-main`}>
      <RightBar
        isOpen={rightBarOpen}
        onClose={closeRightBar}
        givenGroup={givenGroup}
        givenId={givenId}
        givenPublicationTypeId={givenPublicationTypeId}
        from="publications"
        refresh={fetchPublications}
      />

      {popupMessage && (
        <div className={`already-popup ${popupMessage.type}`}>
          {popupMessage.message}
        </div>
      )}

      {/* Row 1 - Butonlar */}
      <div className="yayinlar-main-row-1">
        <button
          className={`yayinlar-btn ${publicationTypeId === 1 ? "active" : ""}`}
          onClick={() => {
            setPublicationTypeId(1);
          }}
        >
          Makaleler
        </button>

        <button
          className={`yayinlar-btn ${publicationTypeId === 4 ? "active" : ""}`}
          onClick={() => {
            setPublicationTypeId(4);
          }}
        >
          Bildiriler
        </button>
      </div>

      <div className="yayinlar-main-row-2">
        <input
          style={{ color: "gray" }}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Arama Sözcüğünüzü Giriniz..."
          className="yayinlar-search-input"
        />
        <button className="yayinlar-refresh-btn" onClick={fetchPublications}>
          <FaSync />
        </button>

        <div className="yayinlar-pagination">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            ‹
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * itemsPerPage >= filteredData.length}
          >
            ›
          </button>
        </div>
      </div>

      <div className="yayinlar-main-row-3">
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
          <AnimatePresence mode="wait">
            {totalPages <= 0 ? (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <NotFound />
              </motion.div>
            ) : (
              <motion.table
                key={publicationTypeId}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <thead>
                  <tr>
                    <th>Yayın Adı</th>
                    <th>Grup</th>
                    <th>Puan</th>
                    <th>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => {
                    const savedPublications =
                      JSON.parse(localStorage.getItem(storageKey)) || [];
                    const isSaved = !!allPublications[item.id];

                    return publicationTypeId === 2 ? (
                      ""
                    ) : (
                      <tr
                        key={item.id}
                        className={isEditMode ? "edit-mode-row" : ""}
                      >
                        <td>
                          {item.title.length > 50
                            ? `${item.title.slice(0, 60)}...`
                            : item.title}
                          <br />
                          <p style={{ color: "#5d8c6a", fontSize: "10px" }}>
                            {" "}
                            {item.authors ? item.authors.join(", ") : "-"}
                          </p>
                          <p style={{ color: "#5d8c6a", fontSize: "10px" }}>
                            {new Date(item.publishDate).toLocaleDateString(
                              "tr-TR",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </td>

                        <td className="item-group">
                          <div className="group-show">
                            {getPreferredGroupDisplay(item)}
                          </div>
                        </td>
                        <td>
                          <div className="group-show">
                            {getPrerredScoreDisplay(item)}
                          </div>
                        </td>
                        <td>
                          {isEditMode ? (
                            <div className="choose-publication">
                              <img src={click} alt="" />
                            </div>
                          ) : (
                            <div>
                              <button
                                className="yayinlar-btn"
                                onClick={() =>
                                  handleEditClick(
                                    item.id,
                                    item.groupAuto,
                                    publicationTypeId
                                  )
                                }
                              >
                                <FaPencilAlt />
                              </button>

                              <button
                                className="yayinlar-btn"
                                onClick={() => saveToLocalStorage(item)}
                              >
                                {allPublications[item.id] ? (
                                  <FaCheckSquare />
                                ) : (
                                  <FaRegSquare />
                                )}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </motion.table>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default Yayinlar;
