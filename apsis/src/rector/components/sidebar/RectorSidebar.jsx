import "./RectorSidebar.css";
import PropTypes from "prop-types";
import homeIcon from "../../../assets/home.svg";
import yayinIcon from "../../../assets/yayinlar.svg";
import juryIcon from "../../../assets/jury.png";
import facultyIcon from "../../../assets/university.png";
import listIcon from "../../../assets/lists.png";
function RectorSidebar({ onSelect }) {
  const items = [
    { name: "Ana Sayfa", icon: <img src={homeIcon} alt="Home" /> },
    { name: "Başvurular", icon: <img src={yayinIcon} alt="Home" /> },
    { name: "İlanlar", icon: <img src={listIcon} alt="Home" /> },
    {
      name: "Ön Değerlendirme Jürileri",
      icon: <img src={juryIcon} alt="Home" />,
    },
    { name: "Fakülteler", icon: <img src={facultyIcon} alt="Home" /> },
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
RectorSidebar.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default RectorSidebar;
