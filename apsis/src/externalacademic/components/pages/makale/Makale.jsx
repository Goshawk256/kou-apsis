import React, { useEffect, useState } from "react";
import All_Url from "../../../../url";
import "./Makale.css";
import { FaRegSquare, FaFileUpload, FaCheckSquare } from "react-icons/fa";
import saveToLocalStorage from "../../../../helperfunctions/Savetolocal.js";
const languages = ["Uluslararası", "Ulusal"];
import axios from "axios";
function Makale() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [articleTypes, setArticleTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setId] = useState("empty");
  const [articleFiles, setArticleFiles] = useState([]);

  const [savedArticles, setSavedArticles] = useState(
    JSON.parse(localStorage.getItem("externalArticles")) || []
  );

  const isSaved = (articleId) => {
    return savedArticles.some((item) => item.id === articleId);
  };

  const handleSave = (article) => {
    saveToLocalStorage(article, "externalArticles");

    const updatedSavedArticles =
      JSON.parse(localStorage.getItem("externalArticles")) || [];
    setSavedArticles(updatedSavedArticles);
  };

  const handleUploadClick = (articleId) => {
    setId(articleId);
    const selectedArticle = articles.find(
      (article) => article.id === articleId
    );
    setArticleFiles(selectedArticle?.files || []);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setId("empty");
    setShowPopup(false);
    setPdfName("");
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    if (!pdfName || !selectedFile) {
      alert("Lütfen bir PDF adı girin ve bir dosya seçin.");
      return;
    }
    if (id === "empty") {
      alert("Lütfen bir makale seçin.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Giriş yapmalısınız!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("articleId", id);
    formData.append("name", pdfName);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await axios.post(
        "https://apsis.kocaeli.edu.tr/api/external-academic/add-article-file",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("PDF başarıyla yüklendi!");
      console.log("Yanıt:", response.data);
      handleClosePopup();
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert(
        "Yükleme başarısız: " +
          (error.response?.data?.message || "Bir hata oluştu, tekrar deneyin.")
      );
    }
  };
  const [newArticle, setNewArticle] = useState({
    name: "",
    date: "",
    authors: "",
    isInternational: false,
    articleTypeId: 1,
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
    const fetchArticles = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Yetkilendirme hatası: Token bulunamadı.", "error");
          return;
        }

        const response = await axios.post(
          `${All_Url.api_base_url}/external-academic/get-articles`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setArticles(response.data.data);
        console.log(response.data.data);
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
    if (newArticle.name && newArticle.date && newArticle.authors) {
      const formattedArticle = {
        title: newArticle.name,
        publishDate: newArticle.date.split("-").reverse().join("/"), // "YYYY-MM-DD" → "DD/MM/YYYY"
        authorCount: Number(newArticle.authors),
        isInternational: newArticle.language === "Uluslararası", // "Uluslararası" → true, "Ulusal" → false
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
            <th className="makale-header">Dil</th>
            <th className="makale-header">Makale Türü</th>
            <th className="makale-header">Grup</th>
            <th className="makale-header">Puan</th>
            <th className="makale-header">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => {
            return (
              <tr key={article.id} className="makale-row">
                <td className="makale-cell">{article.title}</td>
                <td className="makale-cell">{article.publishDate}</td>
                <td className="makale-cell">
                  {article.isInternational ? "Uluslararası" : "Ulusal"}
                </td>
                <td className="makale-cell">{article.articleType}</td>
                <td className="makale-cell">{article.group}</td>
                <td className="makale-cell">{article.score}</td>
                <td className="makale-cell">
                  <div className="makale-buttons">
                    <button onClick={() => handleSave(article)}>
                      {isSaved(article.id) ? (
                        <FaCheckSquare />
                      ) : (
                        <FaRegSquare />
                      )}
                    </button>
                    <button onClick={() => handleUploadClick(article.id)}>
                      <FaFileUpload />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPopup && (
        <div className="uploadfile-popup">
          <div className="uploadfile-popup-content">
            <h3>Dosya Yükle</h3>
            <div className="upload-file-div">
              <input
                type="text"
                placeholder="PDF Adı"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
              />
              <input type="file" accept=".pdf" onChange={handleFileChange} />
              <button className="apply-upload-file" onClick={handleUpload}>
                Yükle
              </button>
            </div>
            <div className="upload-file-content">
              {articleFiles.length > 0 ? (
                articleFiles.map((file, index) => (
                  <li key={index}>
                    <a
                      href={`https://apsis.kocaeli.edu.tr/api/file/${file.fileToken}?downloadAs=${file.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.fileName}
                    </a>
                  </li>
                ))
              ) : (
                <li>Henüz dosya yüklenmemiş.</li>
              )}
            </div>

            <button className="cancel-upload-file" onClick={handleClosePopup}>
              X
            </button>
          </div>
        </div>
      )}
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
            <span
              style={{ color: "gray", textAlign: "start", fontSize: "12px" }}
            >
              Yayınlanma Tarihi:
            </span>
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
              className="ders-select"
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
              className="ders-select"
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
