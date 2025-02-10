import React, { useState, useEffect } from 'react';
import ConfirmBasvuru from './confirmbavuru/ConfirmBasvuru';
import axios from 'axios';
import All_Url from '../../../url';

import './Basvuru.css';

function Basvuru({ onSelect }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [totalScore, setTotalScore] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [sendData, setSendData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];
        const savedThesis = JSON.parse(localStorage.getItem('savedThesis')) || [];
        const savedPublications = JSON.parse(localStorage.getItem('savedPublications')) || [];
        const savedAwards = JSON.parse(localStorage.getItem('savedAwards')) || [];
        const savedArtworks = JSON.parse(localStorage.getItem('savedArtworks')) || [];
        const savedLessons = JSON.parse(localStorage.getItem('savedCourses')) || [];


        let data = {
            title: localStorage.getItem('selectedOption'),
            username: localStorage.getItem('username'),
            date: new Date().toISOString(),
        };


        if (savedPublications.length > 0) {
            data.publications = savedPublications.map(item => ({ publicationId: item.id }));
        }
        if (savedProjects.length > 0) {
            data.projects = savedProjects.map(item => ({ projectId: item.id }));
        }
        if (savedThesis.length > 0) {
            data.thesis = savedThesis.map(item => ({ thesisId: item.id }));
        }
        if (savedLessons.length > 0) {
            data.lessons = savedLessons.map(item => ({ lessonId: item.id }));
        }
        if (savedAwards.length > 0) {
            data.awards = savedAwards.map(item => ({ awardId: item.id }));
        }
        if (savedArtworks.length > 0) {
            data.artworks = savedArtworks.map(item => ({ artworkId: item.id }));
        }

        setSendData(data);


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

        const allData = [
            ...formattedPublications,
            ...formattedProjects,
            ...formattedThesis,
            ...formattedLessons,
            ...formattedAwards,
            ...formattedArtworks
        ];

        // Verileri türlerine göre sıralıyoruz (öncelik sırasına göre)
        const sortedData = allData.sort((a, b) => {
            const priority = {
                'Yayın': 1,
                'Proje': 4,
                'Tez': 3,
                'Ders': 2,
                'Ödül': 5,
                'Sanat Eseri': 6
            };

            return priority[a.type] - priority[b.type];
        });

        setData(sortedData);

        const total = sortedData.reduce((sum, item) => sum + (item.score || 0), 0);
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

    const handleApplication = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Oturum açılmadı!');
            return;
        }
        try {
            const response = await axios.post(`${All_Url.api_base_url}/academic/add-application`, {
                ...sendData
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setIsPopupOpen(true);  // Popup'u aç
            return response.data.success;

        } catch (error) {
            console.error("Hata oluştu:", error);
        }
    };

    const Popup = ({ onClose }) => {
        return (
            <div className="popup-overlay">
                <div className="card">
                    <h3 className="card__title">Başvuru Başarılı!</h3>
                    <p className="card__content">Başvurunuz başarıyla gönderildi. Süreci bildirim panelinden takip edebilirsiniz. </p>
                    <div className="card__date">{new Date().toLocaleDateString()}</div>
                    <div className="card__arrow" onClick={() => { setIsPopupOpen(false); handleFinish(); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                            <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        );
    };



    return (
        showTable ? (
            <div className='basvuru-main'>
                <div className='basvuru-content'>
                    <div className='table-toggle'>
                        <span className='total-score'>Toplam Puan: {totalScore.toFixed(2)}</span>
                        <div className='table-tggle-buttons'>
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
                        <button
                            className='basvuru-geri-button'
                            onClick={() => (currentPage === 1 ? setShowTable(false) : handlePrev())}
                        >
                            Geri
                        </button>
                        <button
                            className='basvuru-ileri-button'
                            onClick={() => (currentPage === totalPages ? handleApplication() : handleNext())}
                        >
                            İleri
                        </button>
                    </div>
                </div>
                {isPopupOpen && <Popup />}
            </div>

        ) : (
            <div className="basvuru_empty">
                <ConfirmBasvuru setShowTable={setShowTable} />
            </div>
        )
    );
}

export default Basvuru;
