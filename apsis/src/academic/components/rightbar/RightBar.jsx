import "./RightBar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
function RightBar({ isOpen, onClose, givenGroup, givenId, from, refresh }) {
  const [requestUrl, setRequestUrl] = useState("");
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [newGroup, setNewGroup] = useState("");
  const [idName, setIdName] = useState("");
  const [name, setName] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectRoleTypes, setProjectRoleTypes] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedConditionId, setSelectedConditionId] = useState(null);
  const conditions = [
    {
      id: 1,
      title:
        "Sadece akademik danışman ve danışmanlığındaki lisansüstü öğrencinin çalışmalar.",
    },
    {
      id: 2,
      title:
        "Sadece akademik danışman, eş danışman ve akademik danışmanın lisansüstüöğrencisinin yer aldığı çalışmalar.",
    },
    {
      id: 3,
      title:
        "Akademik danışman ve akademik danışmanın iki lisansüstü öğrencisinin yer aldığı çalışmalar.",
    },
    {
      id: 4,
      title:
        "Üniversite-Başka bir yurtiçi Üniversite veya Üniversite-Yurtdışı Üniversite/Kurum veya Üniversite-Sanayi Üniversite İşbirliği içeren çalışmalar.",
    },
    { id: 5, title: "Derleme Makalesi Olan çalışmalar" },
    { id: 6, title: "Beş ve üzeri kişi sayısı içeren çalışmalar." },
    {
      id: 7,
      title:
        "Yukarıdaki durumların dışında, beş ve üzeri kişi sayısı içeren çalışmalar.",
    },
  ];

  const handleSelectChange = (e) => {
    setSelectedConditionId(e.target.value);
  };

  const handleUpdateCondition = () => {
    const selected = conditions.find(
      (cond) => cond.id === Number(selectedConditionId)
    );
    if (!selected) {
      alert("Lütfen Condition Seçiniz");
      console.log("Seçilen Condition Bulunamadi");
    } else {
      const condition = {
        number: selectedConditionId,
        value: 1,
      };
      try {
        const response = axios.put(
          "https://apsis.kocaeli.edu.tr/api/academic/update-publication-special-case",
          {
            publicationId: givenId,
            condition: condition,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("Başarıyla güncellendi:", response.data);
      } catch (error) {
        console.error("Condition update error:", error);
      }
      refresh();
      onClose();
    }
  };
  useEffect(() => {
    switch (from) {
      case "projects":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-project-rank"
        );
        setUploadFileUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/add-project-file"
        );
        setIdName("projectId");
        setName("Proje Düzenleme");
        break;
      case "publications":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-publication-rank"
        );
        setUploadFileUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/add-publication-file"
        );
        setIdName("publicationId");
        setName("Yayın Düzenleme");
        break;
      case "books":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-publication-rank"
        );
        setUploadFileUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/add-publication-file"
        );
        setIdName("publicationId");
        setName("Kitap Düzenleme");
        break;
      case "lessons":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-lesson-ranks"
        );
        setUploadFileUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/add-lesson-file"
        );
        setIdName("lessonId");
        setName("Ders Düzenleme");
        break;
      case "awards":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-award-rank"
        );
        setUploadFileUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/add-award-file"
        );
        setIdName("awardId");
        setName("Ödül Düzenleme");
        break;
      case "thesis":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-advising-thesis-rank"
        );
        setUploadFileUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/add-advising-thesis-file"
        );
        setIdName("advisingThesisId");
        setName("Tez Düzenleme");
        break;
      default:
        setRequestUrl("#");
        setIdName("unknownId");
    }
  }, [from]);

  const updateProjectRole = async () => {
    if (!givenId || !selectedRoleId) {
      alert("Lütfen bir proje seçin ve rol belirleyin!");
      return;
    }

    try {
      const response = await axios.put(
        "https://apsis.kocaeli.edu.tr/api/academic/update-project-rank-by-type",
        {
          projectId: givenId,
          projectTypeId: selectedRoleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("Proje rolü başarıyla güncellendi!");
      console.log("Başarıyla güncellendi:", response.data);
    } catch (error) {
      console.error("Proje rol güncelleme hatası:", error);
      alert(
        "Güncelleme başarısız: " +
          (error.response?.data?.message || "Tekrar deneyin.")
      );
    } finally {
      refresh();
      onClose();
    }
  };
  const RenderedComponent = ({ from }) => {
    switch (from) {
      case "projects":
        return (
          <div className="right-bar-content">
            <h3>Proje Rolü Güncelle</h3>
            <label>Proje Rolü Seç:</label>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {Object.entries(projectRoleTypes).map(([id, roleName]) => (
                <option key={id} value={id}>
                  {roleName}
                </option>
              ))}
            </select>
            <button onClick={() => updateProjectRole()}>Güncelle</button>
          </div>
        );
      case "publications":
        return (
          <div className="right-bar-content">
            <h3>Özel Durum Güncelle</h3>
            <label>Özel Durum Seç:</label>
            <select value={selectedConditionId} onChange={handleSelectChange}>
              <option value="">Seçiniz</option>
              {conditions.map((condition) => (
                <option key={condition.id} value={condition.id}>
                  {condition.title}
                </option>
              ))}
            </select>

            <button onClick={handleUpdateCondition}>Güncelle</button>
          </div>
        );
      case "books":
        return <div className="right-bar-content">kitaplar</div>;
      case "lessons":
        return <div className="right-bar-content">dersler</div>;
      case "awards":
        return <div className="right-bar-content">ödüller</div>;
      case "thesis":
        return <div className="right-bar-content">tezler</div>;
      default:
        return null;
    }
  };

  const getProjectInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Giriş yapmalısınız!");
      return;
    }

    try {
      console.log("API isteği başlatılıyor...");

      const responseProjectTypes = await axios.get(
        "https://apsis.kocaeli.edu.tr/api/lookUp/get-project-types", // Fazladan '/' vardı, düzelttim.
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const responseProjectRoleTypes = await axios.get(
        "https://apsis.kocaeli.edu.tr/api/lookUp/get-project-role-types",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("API Yanıtı - Proje Türleri:", responseProjectTypes.data);
      console.log(
        "API Yanıtı - Proje Rol Türleri:",
        responseProjectRoleTypes.data
      );

      setProjectTypes(responseProjectTypes.data.data || []);
      setProjectRoleTypes(responseProjectRoleTypes.data.data || []);
    } catch (error) {
      console.error("API Hatası:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect Çalıştı! from:", from);
    if (from === "projects") {
      getProjectInfo();
    }
  }, [from]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    if (!pdfName || !selectedFile) {
      alert("Lütfen bir PDF adı girin ve bir dosya seçin.");
      return;
    }
    if (!givenId) {
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
    formData.append([idName], givenId);
    formData.append("name", pdfName);

    try {
      const response = await axios.post(uploadFileUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("PDF başarıyla yüklendi!");
      console.log("Yanıt:", response.data);
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert(
        "Yükleme başarısız: " +
          (error.response?.data?.message || "Bir hata oluştu, tekrar deneyin.")
      );
    }
  };
  const updateRank = async () => {
    if (!requestUrl || !idName || !newGroup) {
      console.error("Eksik bilgi! API çağrısı yapılamaz.");
      return;
    }
    try {
      const response = await axios.put(
        requestUrl,
        {
          [idName]: givenId,
          group: newGroup,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Başarıyla güncellendi:", response.data);
    } catch (error) {
      console.error("Rank update error:", error);
    } finally {
      refresh();
      onClose();
    }
  };

  return (
    <div className="right-bar-container">
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`right-bar ${isOpen ? "open" : ""} `}>
        <div className="right-bar-header">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <p>Kategori: {name}</p>
        <div className="right-bar-content">
          <div className="content-r-1">
            <div className="right-bar-content-header">
              <span>Sistemin Atadığı Grup: {givenGroup}</span>
            </div>
            <div className="right-bar-content-body">
              <div>
                <label>Yeni Grup:</label>
                <input
                  type="text"
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  placeholder="Grup"
                />
              </div>
              <button className="update-btn" onClick={updateRank}>
                <GrUpdate />
              </button>
            </div>
          </div>
          <div className="content-r-2">
            <h3>Dosya Yükle</h3>
            <div className="upload-content-div">
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
          </div>
          <div className="content-r-3">
            <RenderedComponent from={from} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
