import React, { useState, useEffect } from 'react';
import './Basvuru.css';

function Basvuru() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];
        const savedThesis = JSON.parse(localStorage.getItem('savedThesis')) || [];
        const savedPublications = JSON.parse(localStorage.getItem('savedPublications')) || [];

        const formattedProjects = savedProjects.map(item => ({
            id: item.id,
            title: item.projectName,
            group: item.group,
            type: 'Proje',
            score: item.score
        }));

        const formattedThesis = savedThesis.map(item => ({
            id: item.id,
            title: item.title,
            group: item.group,
            type: 'Tez',
            score: item.score
        }));

        const formattedPublications = savedPublications.map(item => ({
            id: item.id,
            title: item.title,
            group: item.groupAuto,
            type: 'Yayın',
            score: item.scoreAuto
        }));

        setData([...formattedProjects, ...formattedThesis, ...formattedPublications]);
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className='basvuru-main'>
            <div className='basvuru-content'>
                <div className='table-toggle'>
                    <button className='pagination-button' onClick={handlePrev} disabled={currentPage === 1}>‹</button>
                    {currentPage}/{totalPages}
                    <button className='pagination-button' onClick={handleNext} disabled={currentPage === totalPages}>›</button>
                </div>
                <div className='basvuru-table-content'>
                    <table className='basvuru-table'>
                        <thead className='basvuru-table-head'>
                            <tr className='basvuru-table-header'>
                                <th>Seçim</th>
                                <th>Grup</th>
                                <th>Tür</th>
                                <th>Puan</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody className='basvuru-table-body'>
                            {selectedData.map((item) => (
                                <tr key={item.id}>
                                    <td className='basvuru-item-title'>{item.title}

                                    </td>
                                    <td className='basvuru-item-group'>{item.group}</td>
                                    <td className='basvuru-item-type'>{item.type}</td>
                                    <td className='basvuru-item-score'>{item.score}</td>
                                    <td className='action-button-area'>
                                        <button className='action-button'>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Basvuru;
