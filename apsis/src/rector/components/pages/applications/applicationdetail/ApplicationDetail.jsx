import React from "react";
import "./ApplicationDetail.css";
import user from "../../../../../assets/user.png";
function ApplicationDetail() {
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
        <span className="detail-header">Juri Bilgileri:</span>
        <div className="detail-colum-2">
          <div className="detail-column-2-r-1">
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
            </li>
          </div>
          <div className="detail-column-2-r-2"></div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
