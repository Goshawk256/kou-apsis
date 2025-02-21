import React, { useState } from "react";
import "./Applications.css";
import user from "../../../../assets/user.png";
import check from "../../../../assets/check.png";

function Applications() {
  const truncateText = (text) => {
    return text.length > 25 ? text.substring(0, 22) + "..." : text;
  };
  const [isSelected, setIsSelected] = useState(false);

  const selectApplication = () => {
    setIsSelected(true);
  };
  return (
    <div className="applications-main">
      <h2 className="applications-header">Başvurular</h2>
      {isSelected ? (
        "selam"
      ) : (
        <div className="applications-content">
          <div className="content-column-2">
            <div className="content-header-last">
              <span>Filtreleme:</span>
            </div>
            <div className="content-last">Görmek İçin Başvuruyu Seçiniz</div>
          </div>
          <div className="content-column-1">
            <div className="content-header">
              <span>Başvurular:</span>
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Reddedildi
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Reddedildi
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Reddedildi
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
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
                  Başvuru Durumu: <br />
                  Onaylandı
                </span>
                <span>
                  Başvuru Durumu: <br />
                  Ön Değerlendirme
                </span>
                <button
                  onClick={() => {
                    selectApplication();
                  }}
                >
                  <img src={check} alt="" />
                </button>
              </li>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;
