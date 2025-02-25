import React from "react";
import "./MyApplications.css";

function MyApplications({ setComponent }) {
  const handleBasvuruClick = () => {
    console.log("Başvuru butonuna tıklandı");
  };

  return (
    <div className="main-myapplications-external">
      <span className="external-header">Başvurularım</span>
      <div className="external-content">
        <table>
          <thead>
            <tr>
              <th>Başvuru Tarihi</th>
              <th>Başvurulan Kadro</th>
              <th>Başvuru Tipi</th>
              <th>Başvuru Durumu</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="basvuru-item-title">
                Makale
                <br />
                <span className="basvuru-item-authors"> Yazar bilgisi yok</span>
              </td>
              <td className="basvuru-item-group">A</td>
              <td className="basvuru-item-type">Uluslararası</td>
              <td className="basvuru-item-score">100.00</td>
              <td className="action-button-area">
                <button className="action-button">PDF Indir</button>
              </td>
            </tr>
            <tr>
              <td className="basvuru-item-title">
                Makale
                <br />
                <span className="basvuru-item-authors"> Yazar bilgisi yok</span>
              </td>
              <td className="basvuru-item-group">A</td>
              <td className="basvuru-item-type">Uluslararası</td>
              <td className="basvuru-item-score">100.00</td>
              <td className="action-button-area">
                <button className="action-button">PDF Indir</button>
              </td>
            </tr>
            <tr>
              <td className="basvuru-item-title">
                Makale
                <br />
                <span className="basvuru-item-authors"> Yazar bilgisi yok</span>
              </td>
              <td className="basvuru-item-group">A</td>
              <td className="basvuru-item-type">Uluslararası</td>
              <td className="basvuru-item-score">100.00</td>
              <td className="action-button-area">
                <button className="action-button">PDF Indir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setComponent("confirmbasvuru")}
        className="external-basvuruyap"
      >
        Yeni Başvuru
      </button>
    </div>
  );
}

export default MyApplications;
