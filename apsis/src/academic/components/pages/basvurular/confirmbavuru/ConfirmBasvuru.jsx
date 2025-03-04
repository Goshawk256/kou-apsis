import { useState } from "react";
import PropTypes from "prop-types";
import "./ConfirmBasvuru.css";
import "dayjs/locale/tr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useEffect } from "react";
import axios from "axios";
import All_Url from "../../../../../url";
import MyApplications from "../basvurularim/MyApplications";
import previous from "../../../../../assets/previous.png";
import click from "../../../../../assets/click.png";

function ConfirmBasvuru({ setShowTable }) {
  const [selected, setSelected] = useState("");
  const [isMyApplications, setIsMyApplications] = useState(true);
  const applicationType = localStorage.getItem("basvuruTipi");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    // Tarihi gg/aa/yyyy formatında döndürmek için / ile ayırıyoruz
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Ay 0'dan başlar, 1 ekliyoruz
    const year = d.getFullYear();
    return `${day}/${month}/${year}`; // Slash ile ayırıyoruz
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "https://apsis.kocaeli.edu.tr/api/position-annoucement/get-position-anouncements",
        {
          title: "",
          description: "",
          faculty: "",
          postingDate: "",
          deadLine: "",
          position: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const formattedData = response.data.data.map((item) => ({
        ...item,
        postingDate: formatDate(item.postingDate),
        deadLine: formatDate(item.deadLine),
      }));
      setAnnouncements(formattedData || []);
    } catch (error) {
      console.error("İlanları çekerken hata oluştu:", error);
    }
  };

  const handleSaveToLocalStorage = async () => {
    if (applicationType === "Scientific") {
      if (selectedAnnouncement === "") {
        alert("Lütfen bir İlan seçin!");
        return;
      } else {
        localStorage.setItem("secilmisIlan", selectedAnnouncement);
      }
    } else if (applicationType === "Preliminary") {
      if (selected === "") {
        alert("Lütfen bir Birim seçin!");
        return;
      }
    }

    localStorage.setItem("selectedOption", selected);

    setShowTable(true);
  };

  return (
    <div className="confirm-basvuru">
      {isMyApplications ? (
        <MyApplications
          onSelect={() => {
            setIsMyApplications(false);
          }}
        />
      ) : applicationType === "Preliminary" ? (
        <div className="confirm-content">
          <h1 className="confirm-title">Başvuru Kaydı Oluşturma</h1>
          <h5 className="birim-title">Başvurulacak Birim:</h5>
          <div className="radio-input">
            {["Dr.Öğr.Ü", "Doç. Dr.", "Prof. Dr."].map((role) => {
              return (
                <label
                  key={role}
                  className={`label ${selected === role ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="value-radio"
                    value={role}
                    checked={selected === role}
                    onChange={() => setSelected(role)}
                  />
                  <p className="text">{role}</p>
                </label>
              );
            })}
          </div>
          <h5 className="atama-title">Son Atama Tarihi:</h5>
          <div className="confirm-bottom-content">
            <div className="date-picker">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="tr"
              >
                <StaticDatePicker
                  orientation="landscape"
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: "#1FA54E !important",
                      color: "#fff !important",
                    },
                    "& .MuiPickersDay-root": {
                      borderRadius: "10px",
                      transition: "background-color 0.5s ease",
                    },
                    "& .MuiPickersDay-root:hover": {
                      backgroundColor: "#40be4b",
                      color: "#fff",
                    },
                    "& .MuiDatePickerToolbar-title": {
                      color: "#1FA54E !important",
                      fontWeight: "bold",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <button
              className="confirm-ileri-button"
              onClick={handleSaveToLocalStorage}
            >
              İleri
            </button>
          </div>
          <button
            onClick={() => {
              setIsMyApplications(true);
            }}
            className="confirm-geri-button"
          >
            <img src={previous} alt="" />
          </button>
        </div>
      ) : (
        <div className="academicconfirm-basvuru">
          <div className="academicconfirm-content">
            <div className="academic-radio-input">
              <div className="academic-list-content">
                {announcements.map((item, index) => (
                  <li
                    onClick={() => {
                      setSelectedAnnouncement(item.id);
                      setSelected(item.position);
                    }}
                    key={index}
                    className={
                      selectedAnnouncement === item.id ? "selected-li" : ""
                    }
                  >
                    <span>
                      <b>İlan Adı:</b> <br />
                      {item.title}
                    </span>
                    <span>
                      <b>İlan Kadrosu:</b> <br />
                      {item.position}
                    </span>
                    <span>
                      <b>Fakülte:</b> <br />
                      {item.faculty}
                    </span>

                    <span>
                      <b>Bitiş Tarihi:</b> <br />
                      {item.deadLine}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedAnnouncement(item.id);
                        setSelected(item.position);
                      }}
                    >
                      <img src={click} alt="" />
                    </button>
                  </li>
                ))}
              </div>
            </div>

            <div className="academicconfirm-bottom-content">
              <div className="academicconfirm-bottom-description">
                <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Önceki Atama Tarihini Seçin:
                </span>
                <br />
                <span>
                  Bir Önceki atama tarihinizden önce kullandığınız yayınlarınızı
                  kullandığınız takdirde başvurunuz onaylanmayacaktır.
                  Başvurunuzun onaylanması için seçtiğiniz yayınlarınızın son
                  atama tarihinizden sonra yayınlanmış olması gerekmektedir.
                </span>
              </div>
              <div className="academic-date-picker">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="tr"
                >
                  <StaticDatePicker
                    orientation="landscape"
                    sx={{
                      maxWidth: "300px",
                      maxHeight: "300px",
                      "& .MuiPickersToolbar-root": {
                        display: "none", // Toolbar tamamen gizlenir
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#1FA54E !important",
                        color: "#fff !important",
                      },
                      "& .MuiPickersDay-root": {
                        borderRadius: "10px",
                        transition: "background-color 0.5s ease",
                        fontSize: "0.75rem",
                      },
                      "& .MuiPickersDay-root:hover": {
                        backgroundColor: "#40be4b",
                        color: "#fff",
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <button
                onClick={handleSaveToLocalStorage}
                className="academicconfirm-ileri-button"
              >
                İleri
              </button>
            </div>
            <button
              onClick={() => {
                setIsMyApplications(true);
              }}
              className="academicconfirm-geri-button"
            >
              <img src={previous} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
ConfirmBasvuru.propTypes = {
  setShowTable: PropTypes.func.isRequired,
};

export default ConfirmBasvuru;
