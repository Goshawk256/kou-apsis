import React, { useState } from "react";
import "./Applications.css";
import user from "../../../../assets/user.png";
import check from "../../../../assets/check.png";
import previous from "../../../../assets/previous.png";
import { motion, AnimatePresence } from "framer-motion";
import ApplicationDetail from "./applicationdetail/ApplicationDetail";

function Applications() {
  const truncateText = (text) => {
    return text.length > 25 ? text.substring(0, 22) + "..." : text;
  };
  const [isSelected, setIsSelected] = useState(false);

  const selectApplication = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div className="applications-main">
      <h2 className="applications-header">Başvurular</h2>
      {isSelected ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={isSelected}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="applications-content">
              <button
                onClick={() => {
                  selectApplication();
                }}
                className="previous-button"
              >
                <img src={previous} alt="geri" />
              </button>
              <ApplicationDetail />
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={isSelected}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="applications-content">
              <div className="content-column-2">
                <div className="content-header-last">
                  <span>Filtreleme:</span>
                </div>
                <div className="content-last">
                  Görmek İçin Başvuruyu Seçiniz
                </div>
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
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Applications;
