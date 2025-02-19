import React from "react";
import "./RectorAna.css";

function RectorAna() {
  return (
    <div className="main-rectorana">
      <div className="rectorana-content">
        <div className="rectorana-column-1">
          <div className="rectorana-column-1-row-1">
            <span className="rector-header">Mustafa Serhat Peker</span>
            <span className="rector-desc">
              Rektörlük Atama Sistemi Analiz Sayfası
            </span>
          </div>
          <div className="rectorana-column-1-row-2">
            <div className="little-card-first">
              <div className="card-header-first">
                <span className="card-title-first">Akademik İlan Sayısı</span>
              </div>
              <div className="card-content-first">
                <span>
                  Başvuru için Aktif olan İlan <br /> sayısı <span>17</span>
                  'dir.
                </span>
                <button>Ayrıntıları Gör {">"}</button>
              </div>
            </div>
            <div className="little-card">
              <div className="card-header">
                <span className="card-title">Ön Başvuru Sayısı</span>
                <button>...</button>
              </div>
              <div className="card-content">
                <span>
                  Toplam Ön Değerlendirme Başvurusu sayısı <span>187</span>
                  'dir.
                </span>
                <button>Ayrıntıları Gör {">"}</button>
              </div>
            </div>
            <div className="little-card">
              <div className="card-header">
                <span className="card-title">Kadro Başvurusu Sayısı</span>
                <button>...</button>
              </div>
              <div className="card-content">
                <span>
                  Toplam Kadro Başvurusu <br /> sayısı <span>23</span>
                  'dir.
                </span>
                <button>Ayrıntıları Gör {">"}</button>
              </div>
            </div>
          </div>
          <div className="rectorana-column-1-row-3">
            <div className="r-c-1-r-3-c"></div>
            <div className="r-c-1-r-3-c"></div>
          </div>
        </div>
        <div className="rectorana-column-2">
          <div className="rectorana-column-2-row-1"></div>
          <div className="rectorana-column-2-row-2"></div>
        </div>
      </div>
    </div>
  );
}

export default RectorAna;
