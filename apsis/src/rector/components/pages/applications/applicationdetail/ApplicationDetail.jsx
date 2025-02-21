import React from "react";
import "./ApplicationDetail.css";

function ApplicationDetail() {
  return (
    <div className="applicationdetail-main">
      <div className="detail-content">
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
        <div className="detail-colum-2"></div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
