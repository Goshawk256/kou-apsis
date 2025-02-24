import React, { useEffect, useState } from "react";
import All_Url from "../../../../url";
import axios from "axios";
import "./Makale.css";
import { FaRegSquare } from "react-icons/fa";
const initialArticles = [
  {
    id: 1,
    name: "Makale 1",
    date: "2024-01-10",
    authors: 2,
    language: "Uluslararası",
    type: "Araştırma",
  },
  {
    id: 2,
    name: "Makale 2",
    date: "2023-12-05",
    authors: 1,
    language: "Ulusal",
    type: "İnceleme",
  },
  {
    id: 3,
    name: "Makale 3",
    date: "2022-06-15",
    authors: 3,
    language: "Uluslararası",
    type: "Deneysel",
  },
  {
    id: 4,
    name: "Makale 4",
    date: "2021-08-20",
    authors: 4,
    language: "Ulusal",
    type: "Teorik",
  },
  {
    id: 5,
    name: "Makale 5",
    date: "2020-02-11",
    authors: 2,
    language: "Uluslararası",
    type: "Derleme",
  },
  {
    id: 6,
    name: "Makale 6",
    date: "2019-09-30",
    authors: 1,
    language: "Ulusal",
    type: "Araştırma",
  },
];
const languages = ["Uluslararası", "Ulusal"];

function Makale() {
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [typeId, setTypeId] = useState(0);
  const [articleTypes, setArticleTypes] = useState({});
  const [newArticle, setNewArticle] = useState({
    name: "",
    date: "",
    authors: "",
    isInternational: false,
    articleTypeId: 1,
  });

  const articlesPerPage = 5;
  const filteredArticles = articles.filter((article) =>
    article?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleAddArticle = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchArticleTypes = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Yetkilendirme hatası: Token bulunamadı.", "error");
          return;
        }

        const response = await axios.get(
          `${All_Url.api_base_url}/lookUp/get-article-types`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setArticleTypes(response.data.data);
      } catch (error) {
        console.log("Makaleler getirilirken bir hata oluştu.", "error");
      }
    };

    fetchArticleTypes();
  }, []);

  const handleModalSubmit = async () => {
    if (newArticle.name && newArticle.date && newArticle.authors) {
      const formattedArticle = {
        title: newArticle.name,
        publishDate: newArticle.date.split("-").reverse().join("/"), // "YYYY-MM-DD" → "DD/MM/YYYY"
        authorCount: Number(newArticle.authors),
        isInternatinal: newArticle.language === "Uluslararası", // "Uluslararası" → true, "Ulusal" → false
        articleTypeId: newArticle.articleTypeId,
      };

      setArticles((prev) => [
        ...prev,
        { id: prev.length + 1, ...formattedArticle },
      ]);
      setNewArticle({
        name: "",
        date: "",
        authors: "",
        language: "Uluslararası",
        type: "Araştırma",
      });

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Yetkilendirme hatası: Token bulunamadı.", "error");
          return;
        }

        console.log(formattedArticle);
        const response = await axios.post(
          `${All_Url.api_base_url}/external-academic/add-article`,
          formattedArticle,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log("Makale eklerken bir hata oluştu.", error);
      } finally {
        setShowModal(false);
      }
    }
  };

  return (
    <div className="makale-container">
      <div className="makale-top-bar">
        <input
          type="text"
          className="makale-search"
          placeholder="Makale Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="makale-add-button" onClick={handleAddArticle}>
          Makale Ekle
        </button>
        <div className="makale-pagination">
          <button
            className="makale-page-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <span className="makale-page-number">{currentPage}</span>
          <button
            className="makale-page-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
      <table className="makale-table">
        <thead>
          <tr>
            <th className="makale-header">Makale Adı</th>
            <th className="makale-header">Yayınlanma Tarihi</th>
            <th className="makale-header">Yazar Sayısı</th>
            <th className="makale-header">Dil</th>
            <th className="makale-header">Tip</th>
            <th className="makale-header">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => (
            <tr key={article.id} className="makale-row">
              <td className="makale-cell">{article.name}</td>
              <td className="makale-cell">{article.date}</td>
              <td className="makale-cell">{article.authors}</td>
              <td className="makale-cell">{article.language}</td>
              <td className="makale-cell">{article.type}</td>
              <td className="makale-cell">
                <button>
                  <FaRegSquare />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Yeni Makale Ekle</h2>

            <input
              type="text"
              placeholder="Makale Adı"
              value={newArticle.name}
              onChange={(e) =>
                setNewArticle({ ...newArticle, name: e.target.value })
              }
            />

            <input
              type="date"
              value={newArticle.date || ""}
              onChange={(e) =>
                setNewArticle({ ...newArticle, date: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Yazar Sayısı"
              value={newArticle.authors}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  authors: Number(e.target.value),
                })
              }
            />

            <select
              value={newArticle.language}
              onChange={(e) =>
                setNewArticle({ ...newArticle, language: e.target.value })
              }
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <select
              value={newArticle.articleTypeId}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  articleTypeId: Number(e.target.value),
                })
              }
            >
              {Object.entries(articleTypes).map(([id, type]) => (
                <option key={id} value={id}>
                  {type}
                </option>
              ))}
            </select>

            <button onClick={handleModalSubmit}>Ekle</button>
            <button onClick={() => setShowModal(false)}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Makale;
