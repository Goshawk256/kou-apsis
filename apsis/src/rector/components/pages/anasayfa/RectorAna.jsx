import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import swapIcon from "../../../../assets/swap.png";
import user from "../../../../assets/user.png";
import checkout from "../../../../assets/checkout.png";
import "./RectorAna.css";
const dataOptions = {
  "Ön Değerlendirme Başvuruları": [
    { name: "Bekleyen", value: 50 },
    { name: "Onaylanan", value: 30 },
    { name: "Reddedilen", value: 20 },
  ],
  "Kadro Başvuruları": [
    { name: "Bekleyen", value: 10 },
    { name: "Onaylanan", value: 8 },
    { name: "Reddedilen", value: 5 },
  ],
};

const COLORS = ["#FFBB28", "#00C49F", "#FF4848"];

function RectorAna() {
  const [selectedCategory, setSelectedCategory] = useState(
    "Ön Değerlendirme Başvuruları"
  );

  const changeCategory = () => {
    if (selectedCategory === "Ön Değerlendirme Başvuruları") {
      setSelectedCategory("Kadro Başvuruları");
    }
    if (selectedCategory === "Kadro Başvuruları") {
      setSelectedCategory("Ön Değerlendirme Başvuruları");
    }
  };

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
            <div className="r-c-1-r-3-c">
              <div className="r-c-header">
                <span>Ön Değerlendirme Başvuruları</span>
                <button
                  onClick={() =>
                    setSelectedCategory("Ön Değerlendirme Başvuruları")
                  }
                >
                  ...
                </button>
              </div>
              <div className="r-c-content"></div>
            </div>
            <div className="r-c-1-r-3-c">
              <div className="r-c-header">
                <span>Kadro Başvuruları</span>
                <button
                  onClick={() => setSelectedCategory("Kadro Başvuruları")}
                >
                  ...
                </button>
              </div>
              <div className="r-c-content">
                <li>
                  <img src={user} alt="" />
                  <span>Mustafa Peker</span>
                  <span>Doç. Dr.</span>
                  <button>
                    <img src={checkout} alt="" />
                  </button>
                </li>
                <li>
                  <img src={user} alt="" />
                  <span>Mustafa Peker</span>
                  <span>Doç. Dr.</span>
                  <button>
                    <img src={checkout} alt="" />
                  </button>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className="rectorana-column-2">
          <div className="rectorana-column-2-row-1">
            <div className="chart-header">
              <span>{selectedCategory}</span>
              <button onClick={() => changeCategory()}>
                <img src={swapIcon} alt="" />
              </button>
            </div>
            <PieChart width={400} height={350}>
              <Pie
                data={dataOptions[selectedCategory]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={130}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
              >
                {dataOptions[selectedCategory].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className="rectorana-column-2-row-2">
            <div className="ilan-header">
              <span>Aktif İlanlar</span>
              <button>+</button>
            </div>
            <div className="ilan-content"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RectorAna;
