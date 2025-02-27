import { useState, useEffect } from "react";
import axios from "axios";
import "./Oduller.css";
import {
  FaSync,
  FaPencilAlt,
  FaCheckSquare,
  FaRegSquare,
} from "react-icons/fa";
import All_Url from "../../../../url";
import RightBar from "../../rightbar/RightBar";
import NotFound from "../../errorstacks/NotFound";
import { refreshTheToken } from "../../../../middlewares/authMiddleware";
import click from "../../../../assets/click.png";

function Oduller() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rightBarOpen, setRightBarOpen] = useState(false); // Sağ panelin açık/kapalı durumu
  const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempGroups, setTempGroups] = useState({}); // Yalnızca eklenen kısmı saklayan nesne
  const [isEditMode] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [givenGroup, setgivenGroup] = useState("");
  const [givenId, setgivenId] = useState("");

  const handleEditClick = (givenId, givenGroup) => {
    setgivenId(givenId);
    setgivenGroup(givenGroup);
    openRightBar();
    console.log(givenId, givenGroup);
  };

  const handleGroupChange = (id, newValue) => {
    setTempGroups((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };
  const username = localStorage.getItem("username");

  const fetchData = async () => {
    setLoading(true);
    await refreshTheToken();

    try {
      const response = await axios.post(
        `${All_Url.api_base_url}/academic/get-awards`,
        {
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTableData(response.data.data);

      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = tableData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.corporateName.toLowerCase().includes(query.toLowerCase()) ||
        item.group.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const saveToLocalStorage = (award) => {
    const savedAwards = JSON.parse(localStorage.getItem("savedAwards")) || [];

    const existingAward = savedAwards.find(
      (awardItem) => awardItem.id === award.id
    );

    if (!existingAward) {
      savedAwards.push(award);
      localStorage.setItem("savedAwards", JSON.stringify(savedAwards));
      showPopup("Ödül başarıyla kaydedildi!", "success");
    } else {
      const userConfirmed = confirm(
        "Bu ödül zaten kaydedilmiş. Silmek ister misiniz?"
      );
      if (userConfirmed) {
        const updatedAwards = savedAwards.filter(
          (awardItem) => awardItem.id !== award.id
        );
        localStorage.setItem("savedAwards", JSON.stringify(updatedAwards));
        showPopup("Ödül başarıyla silindi!", "success");
      } else {
        showPopup("Ödül silinmedi.", "info");
      }
    }
  };

  const showPopup = (message, type) => {
    setPopupMessage({ message, type });
    setTimeout(() => setPopupMessage(null), 1500); // Pop-up mesajını birkaç saniye sonra kapatıyoruz
  };

  const itemsPerPage = 4;
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  console.log(filteredData);
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
        from="awards"
      />

      {/* Row 2 - Arama, Filtreleme, Yenileme */}
      <div className="yayinlar-main-row-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Dinamik arama yapın..."
          className="yayinlar-search-input"
        />
        <button
          className="yayinlar-refresh-btn"
          onClick={fetchData}
          disabled={loading}
        >
          <FaSync />
        </button>

        <div className="yayinlar-pagination">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            ‹
          </button>
          <span>
            {page}/{totalPages}{" "}
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
                <th>Ad</th>
                <th>Grup</th>
                <th>Puan</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => {
                const savedAwards =
                  JSON.parse(localStorage.getItem("savedAwards")) || [];
                const isSaved = savedAwards.some(
                  (award) => award.id === item.id
                ); // Kaydedildi mi kontrolü

                return (
                  <tr
                    key={item.id}
                    className={isEditMode ? "edit-mode-row" : ""}
                  >
                    <td>{item.title}</td>
                    <td className="item-group">
                      <div className="group-show">
                        {getPreferredGroupDisplay(item)}
                      </div>
                    </td>
                    <td>{item.scoreAuto}</td>
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
                              handleEditClick(item.id, item.groupAuto)
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

export default Oduller;
