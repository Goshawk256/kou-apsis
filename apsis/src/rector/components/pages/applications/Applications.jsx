import React from "react";
import "./Applications.css";
import user from "../../../../assets/user.png";
import check from "../../../../assets/check.png";

function Applications() {
  const truncateText = (text) => {
    return text.length > 25 ? text.substring(0, 22) + "..." : text;
  };
  return (
    <div className="applications-main">
      <h2 className="applications-header">Başvurular</h2>
      <div className="applications-content">
        <div className="content-column-1">
          <div className="content-header">
            <span>Ön Değerlendirme Başvuruları:</span>
          </div>
          <div className="content">
            <li>
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Onaylandı
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>
            <li>
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("mustafaserhatpeker@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Reddedildi
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>
            <li>
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Onaylandı
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>
            <li>
              {" "}
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Onaylandı
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>
          </div>
          <div className="content-header">
            <span>Kadro Başvuruları:</span>
          </div>
          <div className="content">
            <li>
              {" "}
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("hikmetcan.ozcan@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Onaylandı
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>

            <li>
              {" "}
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Onaylandı
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>
            <li>
              {" "}
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Onaylandı
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>
            <li>
              {" "}
              <img src={user} alt="" />
              <span>
                Başvuran Kişi: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvurulan Kadro: <br /> Doç. Dr.
              </span>
              <span>
                İlgili Hakem: <br />
                {truncateText("suhapsahin@kocaeli.edu.tr")}
              </span>
              <span>
                Başvuru Durumu: <br />
                Onaylandı
              </span>
              <button>
                <img src={check} alt="" />
              </button>
            </li>
          </div>
        </div>
        <div className="content-column-2">
          <div className="content-header-last">
            <span>Juri Bilgisi:</span>
          </div>
          <div className="content-last">Görmek İçin Başvuruyu Seçiniz</div>
          <div className="content-header-last">
            <span>Juri Mesajı:</span>
          </div>
          <div className="content-last">Görmek İçin Başvuruyu Seçiniz</div>
        </div>
      </div>
    </div>
  );
}

export default Applications;
