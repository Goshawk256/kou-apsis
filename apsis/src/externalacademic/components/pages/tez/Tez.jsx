import React, { useEffect, useState } from "react";
import All_Url from "../../../../url";
import axios from "axios";
import "./Tez.css";
import { FaRegSquare } from "react-icons/fa";
const languages = ["Uluslararası", "Ulusal"];

function Tez() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [articleTypes, setArticleTypes] = useState({});
  const [roleTypes, setRoleTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setId] = useState("empty");
  const [articleFiles, setArticleFiles] = useState([]);
  const handleUploadClick = (articleId) => {
    setId(articleId);
    const selectedArticle = articles.find(
      (article) => article.id === articleId
    );
    setArticleFiles(selectedArticle?.files || []); // Dosyaları state'e kaydet
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
    title: "",
    approvalDate: "",
    corparateName: "",
    educationDegreeId: 1,
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
          `${All_Url.api_base_url}/lookUp/get-advising-thesis-education-types`,
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
    const fetchRoleTypes = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Yetkilendirme hatası: Token bulunamadı.", "error");
          return;
        }

        const response = await axios.get(
          `${All_Url.api_base_url}/lookUp/get-advising-thesis-role-types`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setRoleTypes(response.data.data);
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
          `${All_Url.api_base_url}/external-academic/get-advising-thesis`,
          {}, // Body kısmı burada boş olabilir, çünkü sadece header gönderiyorsunuz.
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setArticles(response.data.data.advisingThesis);
      } catch (error) {
        console.log("Makaleler getirilirken bir hata oluştu.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
    fetchRoleTypes();
    fetchArticleTypes();
  }, []);

  const handleModalSubmit = async () => {
    if (newArticle.title && newArticle.approvalDate) {
      const formattedArticle = {
        title: newArticle.title,
        approvalDate: newArticle.approvalDate.split("-").reverse().join("/"), // "YYYY-MM-DD" → "DD/MM/YYYY"
        corparateName: newArticle.corparateName,
        educationDegreeId: newArticle.educationDegreeId,
        roleId: newArticle.roleId,
      };
      console.log(formattedArticle);
      setArticles((prev) => [
        ...prev,
        { id: prev.length + 1, ...formattedArticle },
      ]);
      setNewArticle({
        title: "",
        approvalDate: "",
        corparateName: "",
        educationDegreeId: 1,
        roleId: 1,
      });

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Yetkilendirme hatası: Token bulunamadı.", "error");
          return;
        }

        const response = await axios.post(
          `${All_Url.api_base_url}/external-academic/add-advising-thesis`,
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
    if (text?.length > 40) {
      return text.slice(0, 40) + "...";
    }
    return text;
  };

  return (
    <div className="makale-container">
      <div className="makale-top-bar">
        <input
          type="text"
          className="makale-search"
          placeholder="Tez Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="makale-add-button" onClick={handleAddArticle}>
          Tez Ekle
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
            <th className="makale-header">Tez Adı</th>
            <th className="makale-header">Onaylanma Tarihi</th>
            <th className="makale-header">Kurum Adı</th>
            <th className="makale-header">Tez Türü</th>
            <th className="makale-header">Grup</th>
            <th className="makale-header">Puan</th>
            <th className="makale-header">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => (
            <tr key={article.id} className="makale-row">
              <td className="makale-cell">{article.title}</td>
              <td className="makale-cell">{article.approvalDate}</td>

              <td className="makale-cell">{article.corparateName}</td>
              <td className="makale-cell">
                {sliceText(article?.educationDegree)}
              </td>
              <td className="makale-cell">{article.group}</td>
              <td className="makale-cell">{article.score}</td>
              <td className="makale-cell">
                <button>
                  <FaRegSquare />{" "}
                </button>
                <button onClick={() => handleUploadClick(article.id)}>
                  <FaFileUpload />
                </button>
              </td>
            </tr>
          ))}
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
                      href={`https://apsis.kocaeli.edu.tr/api/file/${file.fileUrl}?downloadAs=${file.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name}
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
              placeholder="Tez Adı"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />

            <span
              style={{ color: "gray", textAlign: "start", fontSize: "12px" }}
            >
              Onaylanma Tarihi:
            </span>
            <input
              type="date"
              value={newArticle.approvalDate || ""}
              onChange={(e) =>
                setNewArticle({ ...newArticle, approvalDate: e.target.value })
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
              value={newArticle.educationDegreeId}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  educationDegreeId: Number(e.target.value),
                })
              }
            >
              {Object.entries(articleTypes).map(([id, type]) => (
                <option key={id} value={id}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={newArticle.roleId}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  articleTypeId: Number(e.target.value),
                })
              }
            >
              {Object.entries(roleTypes).map(([id, type]) => (
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

export default Tez;
