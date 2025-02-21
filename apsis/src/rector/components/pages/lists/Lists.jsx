import React from "react";
import "./Lists.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
function Lists() {
  return (
    <div className="lists-main">
      <h2 className="lists-header">İlanlar</h2>
      <button className="add-list-button">Yeni İlan</button>
      <div className="lists-content">
        <li>
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
          <div className="list-buttons">
            <button className="edit-list">
              <FaPencilAlt />
            </button>
            <button className="delete-list">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
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
          <div className="list-buttons">
            <button className="edit-list">
              <FaPencilAlt />
            </button>
            <button className="delete-list">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
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
          <div className="list-buttons">
            <button className="edit-list">
              <FaPencilAlt />
            </button>
            <button className="delete-list">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
        <li>
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
          <div className="list-buttons">
            <button className="edit-list">
              <FaPencilAlt />
            </button>
            <button className="delete-list">
              {" "}
              <FaTrashAlt />{" "}
            </button>
          </div>
        </li>
      </div>
    </div>
  );
}

export default Lists;
