import { useEffect, useState } from "react";
import "./Citations.css";
import {
  FaSync,
  FaPencilAlt,
  FaCheckSquare,
  FaRegSquare,
} from "react-icons/fa";
import axios from "axios";
import RightBar from "../../rightbar/RightBar";
import All_Url from "../../../../url";
import NotFound from "../../errorstacks/NotFound";
import { refreshTheToken } from "../../../../middlewares/authMiddleware";
import click from "../../../../assets/click.png";

function Citations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  const [isEditMode] = useState(false);

  const [givenGroup, setgivenGroup] = useState("");
  const [givenId, setgivenId] = useState("");

  const handleEditClick = (givenId, givenGroup) => {
    setgivenId(givenId);
    setgivenGroup(givenGroup);
    console.log(givenId, givenGroup);
    openRightBar();
  };

  const fetchCitations = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${All_Url.api_base_url}/academic/get-citations`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTableData(response.data.data || []);
      setFilteredData(response.data.data || []);
    } catch (error) {
      console.error("Projeler alınırken bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshTheToken();

    fetchCitations();
  }, []);

  useEffect(() => {
    const filtered = tableData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, tableData]);

  const saveToLocalStorage = (citation) => {
    const savedCitations =
      JSON.parse(localStorage.getItem("savedCitations")) || [];

    const existingCitation = savedCitations.find(
      (proj) => proj.id === citation.id
    );

    if (!existingCitation) {
      savedCitations.push(citation);
      localStorage.setItem("savedCitations", JSON.stringify(savedCitations));
      showPopup("Proje başarıyla kaydedildi!", "success");
    } else {
      const userConfirmed = confirm(
        "Bu proje zaten kaydedilmiş. Silmek ister misiniz?"
      );
      if (userConfirmed) {
        const updatedCitations = savedCitations.filter(
          (proj) => proj.id !== citation.id
        );
        localStorage.setItem(
          "savedCitations",
          JSON.stringify(updatedCitations)
        );
        showPopup("Proje başarıyla silindi!", "success");
      } else {
        showPopup("Proje silinmedi.", "info");
      }
    }
  };

  const showPopup = (message, type) => {
    setPopupMessage({ message, type });
    setTimeout(() => setPopupMessage(null), 1500);
  };
  const getPreferredGroupDisplay = (item) => {
    const { auto, appeal, manuel, jury } = item.groupScoreInfo.group;

    if (jury) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span>{jury}</span>
        </div>
      );
    } else if (appeal && auto && !manuel) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span>{appeal}</span>
        </div>
      );
    } else if (auto && appeal && manuel) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span>{manuel}</span>
        </div>
      );
    } else {
      return (
        <div className="preferred-group">
          <span>{auto}</span>
        </div>
      );
    }
  };

  const getPreferredScoreDisplay = (item) => {
    const { auto, appeal, manuel, jury } = item.groupScoreInfo.score;

    if (jury) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span>{jury}</span>
        </div>
      );
    } else if (appeal && auto && !manuel) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span>{appeal}</span>
        </div>
      );
    } else if (auto && appeal && manuel) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span>{manuel}</span>
        </div>
      );
    } else {
      return (
        <div className="preferred-group">
          <span>{auto}</span>
        </div>
      );
    }
  };

  const itemsPerPage = 4; // Sayfa başına gösterilecek proje sayısı
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const openRightBar = () => setRightBarOpen(true);
  const closeRightBar = () => setRightBarOpen(false);

  return (
    <div className="yayinlar-main">
      {/* Pop-up mesaj */}
      {popupMessage && (
        <div className={`already-popup ${popupMessage.type}`}>
          {popupMessage.message}
        </div>
      )}

      {/* Sağ panel */}
      <RightBar
        isOpen={rightBarOpen}
        onClose={closeRightBar}
        givenGroup={givenGroup}
        givenId={givenId}
        from="citations"
        refresh={fetchCitations}
      />

      {/* Row 2 - Arama, Filtreleme, Yenileme */}
      <div className="yayinlar-main-row-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Dinamik arama yapın..."
          className="yayinlar-search-input"
        />
        <button
          className="yayinlar-refresh-btn"
          onClick={() => window.location.reload()}
        >
          <FaSync />
        </button>

        <div className="yayinlar-pagination">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            ‹
          </button>
          <span>
            {page}/ {totalPages}{" "}
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
        ) : totalPages <= 0 ? (
          <NotFound />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Adı</th>
                <th>Türü</th>
                <th>Atıf Bilgileri</th>
                <th>Puan</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => {
                const savedCitations =
                  JSON.parse(localStorage.getItem("savedCitations")) || [];
                const isSaved = savedCitations.some(
                  (atif) => atif.id === item.id
                );

                return (
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
                    <td> {item.publicationType} </td>
                    <td>
                      {item.citations.d1Cnt > 0 &&
                        `${item.citations.d1Cnt}xD1 /`}{" "}
                      {item.citations.d2Cnt > 0 &&
                        `${item.citations.d2Cnt}xD2 /`}{" "}
                      {item.citations.d3Cnt > 0 &&
                        `${item.citations.d3Cnt}xD3 /`}{" "}
                      {item.citations.d4Cnt > 0 &&
                        `${item.citations.d4Cnt}xD4 `}
                    </td>

                    <td>{item.citations.score}</td>

                    <td>
                      {isEditMode ? (
                        <div className="choose-publication">
                          <img src={click} alt="" />
                        </div>
                      ) : (
                        <div>
                          <button
                            className="yayinlar-btn"
                            // onClick={() =>
                            //   handleEditClick(item.id, item.groupAuto)
                            // }
                          >
                            <FaPencilAlt />
                          </button>

                          <button
                            className="yayinlar-btn"
                            onClick={() => saveToLocalStorage(item)}
                          >
                            {isSaved ? <FaCheckSquare /> : <FaRegSquare />}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Citations;
