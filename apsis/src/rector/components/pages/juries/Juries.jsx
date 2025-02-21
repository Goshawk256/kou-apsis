import React from "react";
import "./Juries.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
function Juries() {
  return (
    <div className="juries-main">
      <h2 className="juries-header">Juriler</h2>
      <button className="add-jury-button">Jüri Ekle</button>
      <div className="juries-content">
        <li>
          <span>
            <b>Jüri Adı:</b> <br />
            suhapsahin@kocaeli.edu.tr
          </span>
          <span>
            <b>Atandığı Fakülte:</b> <br /> Mühendislik Fakültesi
          </span>
          <span>
            <b>Bitiş Tarihi:</b> <br />
            12.04.2025
          </span>

          <div className="jury-buttons">
            <button className="edit-jury">
              <FaPencilAlt />
            </button>
            <button className="delete-jury">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
          <span>
            <b>Jüri Adı:</b> <br />
            suhapsahin@kocaeli.edu.tr
          </span>
          <span>
            <b>Atandığı Fakülte:</b> <br /> Mühendislik Fakültesi
          </span>
          <span>
            <b>Bitiş Tarihi:</b> <br />
            12.04.2025
          </span>

          <div className="jury-buttons">
            <button className="edit-jury">
              <FaPencilAlt />
            </button>
            <button className="delete-jury">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
          <span>
            <b>Jüri Adı:</b> <br />
            suhapsahin@kocaeli.edu.tr
          </span>
          <span>
            <b>Atandığı Fakülte:</b> <br /> Mühendislik Fakültesi
          </span>
          <span>
            <b>Bitiş Tarihi:</b> <br />
            12.04.2025
          </span>

          <div className="jury-buttons">
            <button className="edit-jury">
              <FaPencilAlt />
            </button>
            <button className="delete-jury">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
          <span>
            <b>Jüri Adı:</b> <br />
            suhapsahin@kocaeli.edu.tr
          </span>
          <span>
            <b>Atandığı Fakülte:</b> <br /> Mühendislik Fakültesi
          </span>
          <span>
            <b>Bitiş Tarihi:</b> <br />
            12.04.2025
          </span>

          <div className="jury-buttons">
            <button className="edit-jury">
              <FaPencilAlt />
            </button>
            <button className="delete-jury">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
      </div>
    </div>
  );
}

export default Juries;
