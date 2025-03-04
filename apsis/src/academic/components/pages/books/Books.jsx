import { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
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

function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rightBarOpen, setRightBarOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const [isEditMode] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [givenGroup, setgivenGroup] = useState("");
  const [givenId, setgivenId] = useState("");

  const handleEditClick = (givenId, givenGroup) => {
    setgivenId(givenId);
    setgivenGroup(givenGroup);
    openRightBar();
  };

  const fetchData = async () => {
    setLoading(true);
    await refreshTheToken();

    try {
      const publicationTypeIds = [2, 3, 5];

      const requests = publicationTypeIds.map((id) =>
        axios.post(
          `${All_Url.api_base_url}/academic/get-publications`,
          { publicationTypeId: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
      );

      const responses = await Promise.all(requests);
      const mergedData = responses.flatMap((res) => res.data.data);

      setTableData(mergedData);
      setFilteredData(mergedData);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
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

  const saveToLocalStorage = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];

    const existingBook = savedBooks.find((bookItem) => bookItem.id === book.id);

    if (!existingBook) {
      savedBooks.push(book);
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
      showPopup("Ödül başarıyla kaydedildi!", "success");
    } else {
      const userConfirmed = confirm(
        "Bu kitap zaten kaydedilmiş. Silmek ister misiniz?"
      );
      if (userConfirmed) {
        const updateBooks = savedBooks.filter(
          (bookItem) => bookItem.id !== book.id
        );
        localStorage.setItem("savedBooks", JSON.stringify(updateBooks));
        showPopup("Kitap başarıyla silindi!", "success");
      } else {
        showPopup("Kitap silinmedi.", "info");
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
        from="books"
        refresh={fetchData}
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
                const savedBooks =
                  JSON.parse(localStorage.getItem("savedBooks")) || [];
                const isSaved = savedBooks.some((book) => book.id === item.id); // Kaydedildi mi kontrolü

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
                    <td className="item-group">
                      <div className="group-show">
                        {getPreferredGroupDisplay(item)}
                      </div>
                    </td>
                    <td>
                      <div className="group-show">
                        {getPreferredScoreDisplay(item)}
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
                                item.groupScoreInfo.groups.auto
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

export default Books;
