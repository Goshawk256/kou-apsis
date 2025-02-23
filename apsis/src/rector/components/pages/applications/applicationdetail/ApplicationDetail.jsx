import React from "react";
import "./ApplicationDetail.css";
import user from "../../../../../assets/user.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { TfiCommentAlt } from "react-icons/tfi";
function ApplicationDetail({ applicationId }) {
  const [application, setApplication] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.post(
          "https://apsis.kocaeli.edu.tr/api/rector/get-applications",
          {}, // Boş bir obje göndermek gerekiyor
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const applications = response.data.data || [];
        const matchedApplication = applications.find(
          (app) => app._id === applicationId
        );

        if (matchedApplication) {
          setApplication(matchedApplication);
          console.log("Başvuru bulundu:", matchedApplication);
        } else {
          console.warn(
            "Belirtilen applicationId ile eşleşen başvuru bulunamadı."
          );
        }

        console.log(response.data);
      } catch (error) {
        console.error("Başvuruları çekerken hata oluştu:", error);
      }
    };

    fetchApplications();
  }, [applicationId]); // applicationId değiştiğinde useEffect tetiklenecek

  const truncateText = (text) => {
    return text.length > 25 ? text.substring(0, 22) + "..." : text;
  };
  return (
    <div className="applicationdetail-main">
      <div className="detail-content">
        <span className="detail-header">
          Başvuran Kişi: suhapsahin@kocaeli.edu.tr
        </span>
        <div className="detail-column-1">
          <span>
            <b>İlan Adı:</b> <br />
            Kocaeli Üniversitesi Doçentlik İlanı
          </span>
          <span>
            <b>İlan Kadrosu:</b> <br /> Doç. Dr.
          </span>
          <span>
            <b>Fakülte:</b> <br />
            Mühendislik Fakültesi
          </span>
          <span>
            <b>Bitiş Tarihi:</b> <br />
            12.04.2025
          </span>
          <span>
            <b>İlan Açıklaması:</b> <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            laborum sunt nihil odio. Doloribus, tempora earum. Non debitis sit
            atque, voluptas commodi incidunt placeat et quis fugiat maxime ex
            obcaecati.
          </span>
        </div>
        <div className="header-content">
          <span className="detail-header-1">Juri Bilgileri:</span>
          <span className="detail-header-2">Juri Mesajı:</span>
        </div>
        <div className="detail-colum-2">
          <div className="detail-column-2-r-1">
            <div className="li-area">
              <li>
                <img src={user} alt="" />
                <span>
                  Juri Adı: <br />
                  {truncateText("mustafaserhatpeker@kocaeli.edu.tr")}
                </span>

                <span>
                  Juri Onayı: <br />
                  Reddedildi
                </span>

                <button>
                  {" "}
                  <TfiCommentAlt />
                </button>
              </li>
              <li>
                <img src={user} alt="" />
                <span>
                  Juri Adı: <br />
                  {truncateText("mustafaserhatpeker@kocaeli.edu.tr")}
                </span>

                <span>
                  Juri Onayı: <br />
                  Reddedildi
                </span>

                <button>
                  {" "}
                  <TfiCommentAlt />
                </button>
              </li>
              <li>
                <img src={user} alt="" />
                <span>
                  Juri Adı: <br />
                  {truncateText("mustafaserhatpeker@kocaeli.edu.tr")}
                </span>

                <span>
                  Juri Onayı: <br />
                  Reddedildi
                </span>

                <button>
                  {" "}
                  <TfiCommentAlt />
                </button>
              </li>
              <li>
                <img src={user} alt="" />
                <span>
                  Juri Adı: <br />
                  {truncateText("mustafaserhatpeker@kocaeli.edu.tr")}
                </span>

                <span>
                  Juri Onayı: <br />
                  Reddedildi
                </span>

                <button>
                  {" "}
                  <TfiCommentAlt />
                </button>
              </li>
              <li>
                <img src={user} alt="" />
                <span>
                  Juri Adı: <br />
                  {truncateText("mustafaserhatpeker@kocaeli.edu.tr")}
                </span>

                <span>
                  Juri Onayı: <br />
                  Reddedildi
                </span>

                <button>
                  {" "}
                  <TfiCommentAlt />
                </button>
              </li>
            </div>
            <div className="message-area"></div>
          </div>
          <div className="detail-column-2-r-2"></div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
