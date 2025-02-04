import React, { useState, useEffect } from 'react';
import ConfirmBasvuru from './confirmbavuru/ConfirmBasvuru';
import { useNavigate } from 'react-router-dom';
import './Basvuru.css';

function Basvuru({ onSelect }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [totalScore, setTotalScore] = useState(0);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];
        const savedThesis = JSON.parse(localStorage.getItem('savedThesis')) || [];
        const savedPublications = JSON.parse(localStorage.getItem('savedPublications')) || [];
        const savedAwards = JSON.parse(localStorage.getItem('savedAwards')) || [];
        const savedArtworks = JSON.parse(localStorage.getItem('savedArtworks')) || [];
        const savedLessons = JSON.parse(localStorage.getItem('savedCourses')) || [];
        console.log(savedProjects);
        console.log(savedThesis);
        console.log(savedPublications);
        console.log(savedAwards);
        console.log(savedArtworks);
        console.log(savedLessons);


        const formattedProjects = savedProjects.map(item => ({
            id: item.id,
            title: item.projectName,
            group: item.group,
            type: 'Proje',
            score: item.score,
            authors: item.authors || []
        }));

        const formattedThesis = savedThesis.map(item => ({
            id: item.id,
            title: item.title,
            group: item.groupAuto,
            type: 'Tez',
            score: item.scoreAuto,
            authors: item.authors || []
        }));

        const formattedPublications = savedPublications.map(item => ({
            id: item.id,
            title: item.title,
            group: item.groupAuto,
            type: 'Yayın',
            score: item.scoreAuto,
            authors: item.authors || []
        }));

        const formattedLessons = savedLessons.map(item => ({
            id: item.id,
            title: item.course_name,
            group: item.groupAuto,
            type: 'Ders',
            score: item.scoreAuto,
            authors: item.authors || []
        }));

        const formattedAwards = savedAwards.map(item => ({
            id: item.id,
            title: item.title,
            group: item.group,
            type: 'Ödül',
            score: item.score,
            authors: item.authors || []
        }));

        const formattedArtworks = savedArtworks.map(item => ({
            id: item.id,
            title: item.title,
            group: item.group,
            type: 'Sanat Eseri',
            score: item.score,
            authors: item.authors || []
        }));


        const allData = [...formattedProjects, ...formattedThesis, ...formattedPublications, ...formattedAwards, ...formattedArtworks, ...formattedLessons];
        setData(allData);

        const total = allData.reduce((sum, item) => sum + (item.score || 0), 0);
        setTotalScore(total);
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

    const splitTitle = (title) => {
        if (title.length > 50) {
            return title.substring(0, 100) + '...';
        }
        return title;
    };


    const handleFinish = () => {
        onSelect('Finish');
    }

    return (
        showTable ? (
            <div className='basvuru-main'>
                <div className='basvuru-content'>
                    <div className='table-toggle'>
                        <span className='total-score'>Toplam Puan: {totalScore.toFixed(2)}</span>
                        <div className='table-tggle-buttons'>
                            <button className='pagination-button' onClick={handlePrev} disabled={currentPage === 1}>‹</button>
                            {currentPage}/{totalPages}
                            <button className='pagination-button' onClick={handleNext} disabled={currentPage === totalPages}>›</button>
                        </div>
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
                                        <td className='basvuru-item-title'>{splitTitle(item.title)}
                                            <br />
                                            <span className='basvuru-item-authors'> {item.authors.length > 0 ? (
                                                <span className='authors'> {item.authors.join(', ')}</span>
                                            ) : (
                                                <span className='authors'>Yazar bilgisi yok</span>
                                            )}
                                            </span>
                                        </td>
                                        <td className='basvuru-item-group'>{item.group}</td>
                                        <td className='basvuru-item-type'>{item.type}</td>
                                        <td className='basvuru-item-score'>{(item.score).toFixed(2)}</td>
                                        <td className='action-button-area'>
                                            <button className='action-button'>Sil</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='basvuru-navigation'>
                        <button className='basvuru-geri-button' onClick={() => setShowTable(false)}>Geri</button>
                        <button className='basvuru-ileri-button' onClick={handleFinish} >İleri</button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="basvuru_empty">

                <ConfirmBasvuru setShowTable={setShowTable} />
            </div>
        )
    );
}

export default Basvuru;
