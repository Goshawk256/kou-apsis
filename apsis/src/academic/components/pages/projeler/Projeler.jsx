import { useEffect, useState } from "react";
import "./Projeler.css";
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

function Projeler() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rightBarOpen, setRightBarOpen] = useState(false); // Sağ panelin açık/kapalı durumu
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı
  const [isEditMode] = useState(false);
  const [givenGroup, setgivenGroup] = useState("");
  const [givenId, setgivenId] = useState("");
  const [previousCondition, setPreviousCondition] = useState(-1);

  const handleEditClick = (givenId, givenGroup, lastSelectedCondition) => {
    setgivenId(givenId);
    setgivenGroup(givenGroup);
    setPreviousCondition(lastSelectedCondition);
    openRightBar();
  };

  const fetchProjects = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${All_Url.api_base_url}/academic/get-projects`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data.data);
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

    fetchProjects();
  }, []);

  useEffect(() => {
    // Arama ve filtreleme işlemi
    const filtered = tableData.filter((item) =>
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, tableData]);

  const saveToLocalStorage = (project) => {
    const savedProjects =
      JSON.parse(localStorage.getItem("savedProjects")) || [];

    const existingProject = savedProjects.find(
      (proj) => proj.id === project.id
    );

    if (!existingProject) {
      savedProjects.push(project);
      localStorage.setItem("savedProjects", JSON.stringify(savedProjects));
      showPopup("Proje başarıyla kaydedildi!", "success");
    } else {
      const userConfirmed = confirm(
        "Bu proje zaten kaydedilmiş. Silmek ister misiniz?"
      );
      if (userConfirmed) {
        const updatedProjects = savedProjects.filter(
          (proj) => proj.id !== project.id
        );
        localStorage.setItem("savedProjects", JSON.stringify(updatedProjects));
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
    const { auto, appeal, manual, jury } = item.groupScoreInfo.groups;

    if (jury) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span className="showed">{jury}</span>
        </div>
      );
    } else if (appeal && auto && !manual) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span className="showed">{appeal}</span>
        </div>
      );
    } else if (auto && appeal && manual) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span className="showed">{manual}</span>
        </div>
      );
    } else {
      return (
        <div className="preferred-group">
          <span className="showed">{auto}</span>
        </div>
      );
    }
  };

  const getPreferredScoreDisplay = (item) => {
    const { auto, appeal, manual, jury } = item.groupScoreInfo.scores;

    if (jury) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span className="showed">{jury}</span>
        </div>
      );
    } else if (appeal && auto && !manual) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span className="showed">{appeal}</span>
        </div>
      );
    } else if (auto && appeal && manual) {
      return (
        <div className="preferred-group">
          <s>{auto}</s> / <span className="showed">{manual}</span>
        </div>
      );
    } else {
      return (
        <div className="preferred-group">
          <span className="showed">{auto}</span>
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
        from="projects"
        refresh={fetchProjects}
        previousCondition={previousCondition}
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

      {/* Row 3 - Tablo */}
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
                <th>Proje Adı</th>
                <th>Grup</th>
                <th>Puan</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => {
                const savedProjects =
                  JSON.parse(localStorage.getItem("savedProjects")) || [];
                const isSaved = savedProjects.some(
                  (proj) => proj.id === item.id
                );
                return (
                  <tr
                    key={item.id}
                    className={isEditMode ? "edit-mode-row" : ""}
                  >
                    <td>
                      {item.projectName.length > 50
                        ? `${item.projectName.slice(0, 60)}...`
                        : item.projectName}
                      <br />
                      <p style={{ color: "#5d8c6a", fontSize: "10px" }}>
                        {" "}
                        {item.corporateName}
                      </p>
                      <p style={{ color: "#5d8c6a", fontSize: "10px" }}>
                        {new Date(item.begin).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </td>

                    <td className="item-group">
                      <div className="group-show">
                        {getPreferredGroupDisplay(item)}
                      </div>
                    </td>

                    {item.status === "Devam Ediyor" ? (
                      <td>{0}</td>
                    ) : (
                      <td>
                        <div className="group-show">
                          {getPreferredScoreDisplay(item)}
                        </div>
                      </td>
                    )}
                    <td>{item.status}</td>
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
                                item.groupScoreInfo.groups.auto,
                                item.userEdits?.lastSelectedProjectId
                              )
                            }
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

export default Projeler;
