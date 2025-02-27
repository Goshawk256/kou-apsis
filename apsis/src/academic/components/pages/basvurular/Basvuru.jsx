import { useState, useEffect } from "react";
import ConfirmBasvuru from "./confirmbavuru/ConfirmBasvuru";
import PropTypes from "prop-types";

import "./Basvuru.css";

function Basvuru({ onSelect }) {
  const [groupedData, setGroupedData] = useState({});
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [groupKeys, setGroupKeys] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("savedProjects")) || [];
    const savedThesis = JSON.parse(localStorage.getItem("savedThesis")) || [];
    const savedPublications =
      JSON.parse(localStorage.getItem("savedPublications")) || [];
    const savedAwards = JSON.parse(localStorage.getItem("savedAwards")) || [];
    const savedArtworks =
      JSON.parse(localStorage.getItem("savedArtworks")) || [];
    const savedLessons = JSON.parse(localStorage.getItem("savedCourses")) || [];

    const formattedData = [
      ...savedProjects,
      ...savedThesis,
      ...savedPublications,
      ...savedLessons,
      ...savedAwards,
      ...savedArtworks,
    ].map((item) => ({
      id: item.id,
      title: item.title || item.projectName || item.course_name,
      group: item.group || item.groupAuto || "Z999",
      type: item.type || "Belirtilmemiş",
      score: item.score || item.scoreAuto || 0,
      authors: item.authors || [],
    }));

    // Gruplama işlemi (harf ve sayıya göre sıralama)
    const grouped = formattedData.reduce((acc, item) => {
      const match = item.group.match(/^([A-Z]+)(\d+)$/);
      const groupKey = match ? match[1] : "Z";
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    }, {});

    // Grupları sıralama (örneğin A1, A2, A3 şeklinde sıralı olacak)
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        const numA = parseInt(a.group.match(/\d+/)?.[0] || "999", 10);
        const numB = parseInt(b.group.match(/\d+/)?.[0] || "999", 10);
        return numA - numB;
      });
    });

    const sortedGroupKeys = Object.keys(grouped).sort((a, b) =>
      a.localeCompare(b)
    );
    setGroupedData(grouped);
    setGroupKeys(sortedGroupKeys);

    const total = formattedData.reduce(
      (sum, item) => sum + (item.score || 0),
      0
    );
    setTotalScore(total);
  }, []);

  const handleNext = () => {
    if (currentGroupIndex < groupKeys.length - 1)
      setCurrentGroupIndex(currentGroupIndex + 1);
  };

  const handlePrev = () => {
    if (currentGroupIndex > 0) setCurrentGroupIndex(currentGroupIndex - 1);
  };

  const handleFinish = () => {
    onSelect("Finish");
  };

  return showTable ? (
    <div className="basvuru-main">
      <div className="basvuru-content">
        <div className="table-toggle">
          <span className="total-score">
            Toplam Puan: {totalScore?.toFixed(2)}
          </span>
        </div>
        <div className="basvuru-table-content">
          <table className="basvuru-table">
            <thead className="basvuru-table-head">
              <tr className="basvuru-table-header">
                <th>Başlık</th>
                <th>Grup</th>
                <th>Tür</th>
                <th>Puan</th>
              </tr>
            </thead>
            <tbody className="basvuru-table-body">
              {groupKeys.length > 0 &&
                groupedData[groupKeys[currentGroupIndex]].map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.group}</td>
                    <td>{item.type}</td>
                    <td>{item.score?.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="basvuru-navigation">
          <button
            className="basvuru-geri-button"
            onClick={handlePrev}
            disabled={currentGroupIndex === 0}
          >
            Geri
          </button>
          <button
            className="basvuru-ileri-button"
            onClick={
              currentGroupIndex === groupKeys.length - 1
                ? handleFinish
                : handleNext
            }
          >
            {currentGroupIndex === groupKeys.length - 1 ? "Bitir" : "İleri"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="basvuru_empty">
      <ConfirmBasvuru setShowTable={setShowTable} />
    </div>
  );
}

Basvuru.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Basvuru;
