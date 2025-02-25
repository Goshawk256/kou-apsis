import { useState, useEffect } from "react";
import "./ConfirmBasvuru.css";
import "dayjs/locale/tr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import previous from "../../../../../assets/previous.png";
import axios from "axios";

function ConfirmBasvuru() {
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

  return (
    <div className="externalconfirm-basvuru">
      <div className="externalconfirm-content">
        <span className="external-birim-title">Başvurulacak İlan:</span>
        <div className="external-radio-input">
          <div className="external-list-content">
            {announcements.map((item, index) => (
              <li key={index}>
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
                  <b>İlan Tarihi:</b> <br />
                  {item.postingDate}
                </span>
                <span>
                  <b>Bitiş Tarihi:</b> <br />
                  {item.deadLine}
                </span>
                <button></button>
              </li>
            ))}
          </div>
        </div>
        <h5 className="external-atama-title">Son Atama Tarihi:</h5>
        <div className="externalconfirm-bottom-content">
          <div className="external-date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
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
          <button className="externalconfirm-ileri-button">İleri</button>
        </div>
        <button className="externalconfirm-geri-button">
          <img src={previous} alt="" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmBasvuru;
