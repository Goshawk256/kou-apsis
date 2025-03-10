import "./RightBar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import {
  projectGroups,
  publicationGroups,
  thesisGroups,
  awardGroups,
  artGroups,
  bookGroups,
  citationGroups,
  declarationGroups,
  lessonGroups,
} from "../../../middlewares/groupSchemeMiddleware.js";
function RightBar({
  isOpen,
  onClose,
  givenGroup,
  givenManualGroup,
  givenId,
  givenPublicationTypeId,
  from,
  refresh,
  previousCondition,
  projectRole,
  d1Cnt,
  d2Cnt,
  d3Cnt,
  d4Cnt,
  citationScore,
}) {
  const [requestUrl, setRequestUrl] = useState("");
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [newGroup, setNewGroup] = useState("");
  const [idName, setIdName] = useState("");
  const [name, setName] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectTypes, setProjectTypes] = useState([]);
  const [awardTypes, setAwardTypes] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedConditionId, setSelectedConditionId] = useState(null);
  const [validGroups, setValidGroups] = useState([]);
  const [citationValues, setCitationValues] = useState({});

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();

    if (value.length === 1) {
      const validLetters = [...new Set(validGroups.map((group) => group[0]))];
      if (!validLetters.includes(value)) {
        return;
      }
    } else {
      const matchingGroups = validGroups.filter((group) =>
        group.startsWith(value[0])
      );
      const validNumbers = matchingGroups.map((group) => group.slice(1));

      if (!validNumbers.some((num) => num.startsWith(value.slice(1)))) {
        return;
      }
    }

    setNewGroup(value);
  };
  const handleCitationValueChange = (e) => {
    const { name, value } = e.target;
    setCitationValues((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleUpdateCitationRank = () => {
    axios
      .put(
        "https://apsis.kocaeli.edu.tr/api/academic/update-citation-rank",
        {
          publicationId: givenId,
          d1: citationValues.d1,
          d2: citationValues.d2,
          d3: citationValues.d3,
          d4: citationValues.d4,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("Başarıyla güncellendi:", response.data);
        alert("Atıf puanları başarıyla güncellendi!");
      })
      .catch((error) => {
        console.error("Atıf puanları güncelleme hatası:", error);
        alert(
          "Atıf puanları güncelleme başarısız: " +
            (error.response?.data?.message || "Tekrar deneyin.")
        );
      })
      .finally(() => {
        refresh();
        onClose();
      });
  };
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

  useEffect(() => {
    setNewGroup("");
    setCitationValues({});
  }, [onClose]);
  useEffect(() => {
    setSelectedConditionId(previousCondition);
    setSelectedRoleId(previousCondition);
    setCitationValues({
      d1: d1Cnt,
      d2: d2Cnt,
      d3: d3Cnt,
      d4: d4Cnt,
    });
  }, [isOpen]);

  useEffect(() => {
    let groups = [];
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
        groups = projectGroups();
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
        groups = publicationGroups();
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
        groups = bookGroups();
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
        groups = lessonGroups();
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
        groups = awardGroups();
        break;
      case "citations":
        setRequestUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/update-citation-rank"
        );
        setUploadFileUrl(
          "https://apsis.kocaeli.edu.tr/api/academic/add-citation-file"
        );
        setIdName("citationId");
        setName("Atıf Düzenleme");
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
        groups = thesisGroups();
        break;

      default:
        setRequestUrl("#");
        setIdName("unknownId");
    }
    setValidGroups(groups);
  }, [from]);

  const updateAwardRole = async () => {
    if (!givenId || !selectedRoleId) {
      alert("Lütfen bir proje seçin ve rol belirleyin!");
      return;
    }

    try {
      const response = await axios.put(
        "https://apsis.kocaeli.edu.tr/api/academic/update-award-rank",
        {
          awardId: givenId,
          awardTypeId: selectedRoleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("Ödül rolü başarıyla güncellendi!");
      console.log("Başarıyla güncellendi:", response.data);
    } catch (error) {
      console.error("Ödül rol güncelleme hatası:", error);
      alert(
        "Güncelleme başarısız: " +
          (error.response?.data?.message || "Tekrar deneyin.")
      );
    } finally {
      refresh();
      onClose();
      setSelectedRoleId("");
    }
  };
  const updateProjectRole = async () => {
    if (!givenId || !selectedRoleId) {
      alert("Lütfen bir proje seçin ve rol belirleyin!");
      return;
    }

    try {
      const response = await axios.put(
        "https://apsis.kocaeli.edu.tr/api/academic/update-project-rank",
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
      setSelectedRoleId("");
    }
  };
  const RenderedComponent = ({ from }) => {
    switch (from) {
      case "projects":
        return (
          <div className="right-bar-content">
            <h3 style={{ color: "gray", fontSize: "14px", fontWeight: "bold" }}>
              Proje Güncelle
            </h3>
            <span style={{ color: "gray", fontSize: "14px" }}>
              <span
                style={{ color: "gray", fontSize: "12px", fontWeight: "bold" }}
              >
                Bu Projedeki Rolünüz:
              </span>{" "}
              {projectRole ? projectRole : "Belirtilmedi"}
            </span>

            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {Object.entries(projectTypes).map(([id, roleName]) => (
                <option key={id} value={id}>
                  {roleName}
                </option>
              ))}
            </select>
            <button onClick={() => updateProjectRole()}>Güncelle</button>
          </div>
        );
      case "publications":
        return givenPublicationTypeId === 1 ? (
          <div className="right-bar-content">
            <h3 style={{ color: "gray", fontWeight: "500", fontSize: "14px" }}>
              Özel Durum Güncelleme
            </h3>

            <select value={selectedConditionId} onChange={handleSelectChange}>
              <option value="">Özel Durum Yok</option>
              {conditions.map((condition) => (
                <option key={condition.id} value={condition.id}>
                  {condition.title}
                </option>
              ))}
            </select>

            <button onClick={updateRank}>Güncelle</button>
          </div>
        ) : (
          ""
        );
      case "books":
        return <div className="right-bar-content"></div>;
      case "lessons":
        return <div className="right-bar-content"></div>;
      case "awards":
        return (
          <div className="right-bar-content">
            <div className="right-bar-content">
              <h3
                style={{ color: "gray", fontSize: "14px", fontWeight: "bold" }}
              >
                Ödül Güncelle
              </h3>

              <label style={{ color: "gray", fontSize: "12px" }}>
                <span
                  style={{
                    color: "gray",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Aktif Ödül Türü:
                </span>
                {Object.entries(awardTypes)[previousCondition - 1]?.[1] ||
                  "Belirtilmedi"}
              </label>
              <select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {Object.entries(awardTypes).map(([id, roleName]) => (
                  <option key={id} value={id}>
                    {roleName}
                  </option>
                ))}
              </select>
              <button onClick={() => updateAwardRole()}>Güncelle</button>
            </div>
          </div>
        );
      case "thesis":
        return <div className="right-bar-content"></div>;
      case "citations":
        return (
          <div className="right-bar-content">
            <div className="input-container">
              {Object.keys(citationValues).map((key) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={key}
                  className="input-group"
                >
                  <label
                    style={{
                      color: "gray",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                    htmlFor={key}
                  >
                    {key.toUpperCase()}:
                  </label>
                  <input
                    style={{
                      width: "50px",
                      outline: "none",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                    type="number"
                    id={key}
                    name={key}
                    value={citationValues[key]}
                    onChange={handleCitationValueChange}
                  />
                </div>
              ))}
              <button
                style={{ marginTop: "10px" }}
                onClick={handleUpdateCitationRank}
                className="submit-button"
              >
                Güncelle
              </button>
            </div>
          </div>
        );
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
      const responseProjectTypes = await axios.get(
        "https://apsis.kocaeli.edu.tr/api/lookUp/get-project-types",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProjectTypes(responseProjectTypes.data.data || []);
    } catch (error) {
      console.error("API Hatası:", error);
    }
  };
  const getAwardInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Giriş yapmalısınız!");
      return;
    }

    try {
      const responseAwardTypes = await axios.get(
        "https://apsis.kocaeli.edu.tr/api/lookUp/get-award-types",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setAwardTypes(responseAwardTypes.data.data || []);
    } catch (error) {
      console.error("API Hatası:", error);
    }
  };

  useEffect(() => {
    if (from === "projects") {
      getProjectInfo();
    } else if (from === "awards") {
      getAwardInfo();
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
    if (!requestUrl || !idName) {
      console.error("Eksik bilgi! API çağrısı yapılamaz.");
      return;
    }
    if (from === "publications" && givenPublicationTypeId === 1) {
      const selected = conditions.find(
        (cond) => cond.id === Number(selectedConditionId)
      );

      const condition = {
        number: Number(selectedConditionId),
        value: 1,
      };
      try {
        const response = axios.put(
          "https://apsis.kocaeli.edu.tr/api/academic/update-publication-rank",
          {
            [idName]: givenId,
            group: newGroup || givenManualGroup || givenGroup,
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
      } finally {
        setNewGroup("");
        refresh();
        onClose();
        setSelectedConditionId(null);
      }
    } else {
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
      }
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
            {from === "citations" ? (
              <div className="right-bar-content-header">
                <span
                  style={{ color: "gray", fontWeight: "500", fontSize: "14px" }}
                >
                  Sistemin Atadığı Puan: {citationScore}
                </span>
              </div>
            ) : (
              <div className="right-bar-content-header">
                <span
                  style={{ color: "gray", fontWeight: "500", fontSize: "14px" }}
                >
                  Sistemin Atadığı Grup: {givenGroup}
                </span>
              </div>
            )}
            {from === "projects" ||
            from === "awards" ||
            from === "citations" ? (
              ""
            ) : (
              <div className="right-bar-content-body">
                <div>
                  <label
                    style={{
                      color: "gray",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    Yeni Grup:
                  </label>
                  <input
                    type="text"
                    value={newGroup}
                    onChange={handleInputChange}
                    placeholder="Grup"
                  />
                </div>
                {from === "publications" && givenPublicationTypeId === 1 ? (
                  ""
                ) : (
                  <button className="update-btn" onClick={updateRank}>
                    <GrUpdate />
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="content-r-3">
            <RenderedComponent from={from} />
          </div>
          <div className="content-r-2">
            <h3 style={{ fontWeight: "500", color: "gray", fontSize: "12px" }}>
              Dosya Yükle:
            </h3>
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
        </div>
      </div>
    </div>
  );
}

export default RightBar;
