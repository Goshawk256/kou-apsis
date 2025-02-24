import React, { useEffect, useState } from "react";
import All_Url from "../../../../url";
import axios from "axios";
import "./Proje.css";
import { FaRegSquare } from "react-icons/fa";
const languages = ["Uluslararası", "Ulusal"];

function Proje() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [articleTypes, setArticleTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const [newArticle, setNewArticle] = useState({
    title: "",
    beginDate: "",
    endDate: "",
    corparateName: "",
    projectTypeId: 1,
    roleId: 1,
  });

  const articlesPerPage = 5;
  const filteredArticles = articles.filter((article) =>
    article?.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
          `${All_Url.api_base_url}/lookUp/get-award-types`,
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
    const fetchArticles = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Yetkilendirme hatası: Token bulunamadı.", "error");
          return;
        }

        const response = await axios.post(
          `${All_Url.api_base_url}/external-academic/get-awards`,
          {}, // Body kısmı burada boş olabilir, çünkü sadece header gönderiyorsunuz.
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setArticles(response.data.data.awards);
        console.log(articles);
      } catch (error) {
        console.log("Makaleler getirilirken bir hata oluştu.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();

    fetchArticleTypes();
  }, []);

  const handleModalSubmit = async () => {
    if (newArticle.name && newArticle.date) {
      const formattedArticle = {
        title: newArticle.name,
        eventDate: newArticle.date.split("-").reverse().join("/"), // "YYYY-MM-DD" → "DD/MM/YYYY"
        corparateName: newArticle.corparateName,
        awardTypeId: newArticle.articleTypeId,
      };
      console.log(formattedArticle);
      setArticles((prev) => [
        ...prev,
        { id: prev.length + 1, ...formattedArticle },
      ]);
      setNewArticle({
        title: "",
        eventDate: "",
        corparateName: "yok",
        awardTypeId: 1,
      });

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Yetkilendirme hatası: Token bulunamadı.", "error");
          return;
        }

        console.log(formattedArticle);
        const response = await axios.post(
          `${All_Url.api_base_url}/external-academic/add-award`,
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

  const sliceText = (text) => {
    if (text.length > 50) {
      return text.slice(0, 50) + "...";
    }
    return text;
  };

  return (
    <div className="makale-container">
      <div className="makale-top-bar">
        <input
          type="text"
          className="makale-search"
          placeholder="Proje Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="makale-add-button" onClick={handleAddArticle}>
          Proje Ekle
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
            <th className="makale-header">Ödül Adı</th>
            <th className="makale-header">Alınma Tarihi</th>
            <th className="makale-header">Kurum Adı</th>
            <th className="makale-header">Ödül Türü</th>
            <th className="makale-header">Grup</th>
            <th className="makale-header">Puan</th>
            <th className="makale-header">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => (
            <tr key={article.id} className="makale-row">
              <td className="makale-cell">{article.title}</td>
              <td className="makale-cell">{article.eventDate}</td>
              <td className="makale-cell">{article.corparateName}</td>
              <td className="makale-cell">
                {sliceText(article.awardTypeName)}
              </td>
              <td className="makale-cell">{article.group}</td>
              <td className="makale-cell">{article.score}</td>
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
              placeholder="Ödül Adı"
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
              type="text"
              placeholder="Kurum Adı"
              value={newArticle.corparateName}
              onChange={(e) =>
                setNewArticle({ ...newArticle, corparateName: e.target.value })
              }
            />

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

export default Proje;
