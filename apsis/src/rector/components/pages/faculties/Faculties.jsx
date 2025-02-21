import React from "react";
import "./Faculties.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
function Faculties() {
  return (
    <div className="faculties-main">
      <h2 className="faculties-header">Fakülteler</h2>
      <button className="add-faculty-button">Fakülte Ekle</button>
      <div className="faculties-content">
        <li>
          <span>
            <b>Fakülte Adı:</b> <br />
            Mühendislik Fakültesi
          </span>

          <div className="faculty-buttons">
            <button className="edit-faculty">
              <FaPencilAlt />
            </button>
            <button className="delete-faculty">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
          <span>
            <b>Fakülte Adı:</b> <br />
            Mühendislik Fakültesi
          </span>

          <div className="faculty-buttons">
            <button className="edit-faculty">
              <FaPencilAlt />
            </button>
            <button className="delete-faculty">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
          <span>
            <b>Fakülte Adı:</b> <br />
            Mühendislik Fakültesi
          </span>

          <div className="faculty-buttons">
            <button className="edit-faculty">
              <FaPencilAlt />
            </button>
            <button className="delete-faculty">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
          <span>
            <b>Fakülte Adı:</b> <br />
            Mühendislik Fakültesi
          </span>

          <div className="faculty-buttons">
            <button className="edit-faculty">
              <FaPencilAlt />
            </button>
            <button className="delete-faculty">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
      </div>
    </div>
  );
}

export default Faculties;
