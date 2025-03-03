import "./ExternalSidebar.css";
import PropTypes from "prop-types";

import sanatIcon from "../../../assets/artistikFaaliyetler.svg";
import basvuruIcon from "../../../assets/basvuru.svg";
import dersIcon from "../../../assets/dersler.svg";
import gorevIcon from "../../../assets/gorevler.svg";
import homeIcon from "../../../assets/home.svg";
import odulIcon from "../../../assets/odul.svg";
import yayinIcon from "../../../assets/yayinlar.svg";
import tezIcon from "../../../assets/yonetilenTezler.svg";
import atifIcon from "../../../assets/quote.png";
import bookIcon from "../../../assets/books.png";

function ExternalSidebar({ onSelect }) {
  const items = [
    { name: "Ana Sayfa", icon: <img src={homeIcon} alt="Home" /> },
    { name: "Makalelerim(A)", icon: <img src={yayinIcon} alt="Yayınlar" /> },
    { name: "Bildirilerim(B)", icon: <img src={yayinIcon} alt="Yayınlar" /> },
    {
      name: "Kitaplarım(C)",
      icon: <img src={bookIcon} alt="Yönetilen Tezler" />,
    },
    { name: "Atıflarım(D)", icon: <img src={atifIcon} alt="Home" /> },
    { name: "Derslerim(E)", icon: <img src={dersIcon} alt="Dersler" /> },
    {
      name: "Yönetilen Tezlerim(F)",
      icon: <img src={tezIcon} alt="Yönetilen Tezler" />,
    },

    {
      name: "Proje Görevlerim(H)",
      icon: <img src={gorevIcon} alt="Görevler" />,
    },
    { name: "Ödüllerim(J)", icon: <img src={odulIcon} alt="Ödüller" /> },
    {
      name: "Sanatsal Faaliyetlerim(M)",
      icon: <img src={sanatIcon} alt="Sanatsal Faaliyet" />,
    },
    { name: "Başvuru", icon: <img src={basvuruIcon} alt="Başvurular" /> },
    /* { name: "Yardım", icon: <img src={helpIcon} alt="Help" /> }, */
  ];

  return (
    <div className={`sidebar-container`}>
      <div
        className="sidebar-inner"
        style={{
          color: "#4cc425",
          marginLeft: "12px",
          marginTop: "24px",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      ></div>
      {items.map((item, index) => (
        <button
          key={index}
          className="sidebar-button"
          onClick={() => onSelect(item.name)}
        >
          {item.name == "Çıkış Yap" ? (
            <span style={{ color: "#f47040" }} className="icon">
              {item.icon}
            </span>
          ) : (
            <span className="icon">{item.icon}</span>
          )}

          {item.name == "Çıkış Yap" ? (
            <span style={{ color: "#f47040" }} className="text">
              {item.name}
            </span>
          ) : (
            <span className="text">{item.name}</span>
          )}
        </button>
      ))}
    </div>
  );
}
ExternalSidebar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default ExternalSidebar;
