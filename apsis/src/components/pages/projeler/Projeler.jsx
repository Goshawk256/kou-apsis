import React, { useEffect, useState } from 'react';
import './Projeler.css';
import { FaSync, FaPencilAlt, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import axios from 'axios';
import RightBar from '../../rightbar/RightBar';
import All_Url from '../../../url';
import NotFound from '../../errorstacks/NotFound';

function Projeler() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [rightBarOpen, setRightBarOpen] = useState(false); // Sağ panelin açık/kapalı durumu
    const [loading, setLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı

    useEffect(() => {
        const fetchProjects = async () => {
            const username = localStorage.getItem('username');
            try {
                const response = await axios.post(
                    `${All_Url.api_base_url}/project/get-projects-by-username`,
                    { username: username }
                );
                setTableData(response.data.data || []);
                setFilteredData(response.data.data || []);
            } catch (error) {
                console.error('Projeler alınırken bir hata oluştu:', error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        // Arama ve filtreleme işlemi
        const filtered = tableData.filter(item =>
            item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, tableData]);

    const saveToLocalStorage = (project) => {
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];

        const existingProject = savedProjects.find((proj) => proj.id === project.id);

        if (!existingProject) {
            savedProjects.push(project);
            localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
            showPopup('Proje başarıyla kaydedildi!', 'success');
        } else {
            const userConfirmed = confirm('Bu proje zaten kaydedilmiş. Silmek ister misiniz?');
            if (userConfirmed) {
                const updatedProjects = savedProjects.filter((proj) => proj.id !== project.id);
                localStorage.setItem('savedProjects', JSON.stringify(updatedProjects));
                showPopup('Proje başarıyla silindi!', 'success');
            } else {
                showPopup('Proje silinmedi.', 'info');
            }
        }
    };


    const showPopup = (message, type) => {
        setPopupMessage({ message, type });
        setTimeout(() => setPopupMessage(null), 1500);
    };

    const itemsPerPage = 4; // Sayfa başına gösterilecek proje sayısı
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const openRightBar = () => setRightBarOpen(true);
    const closeRightBar = () => setRightBarOpen(false);

    return (
        <div className="yayinlar-main">
            {/* Pop-up mesaj */}
            {popupMessage && (
                <div className={`already-popup ${popupMessage.type}`}>
                    {popupMessage.message}
                </div>
            )}

            {/* Sağ panel */}
            <RightBar isOpen={rightBarOpen} onClose={closeRightBar} />

            {/* Row 2 - Arama, Filtreleme, Yenileme */}
            <div className="yayinlar-main-row-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Dinamik arama yapın..."
                    className="yayinlar-search-input"
                />
                <button className="yayinlar-refresh-btn" onClick={() => window.location.reload()}>
                    <FaSync />
                </button>
                <div className="yayinlar-pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                        ‹
                    </button>
                    <span>{page}/ {totalPages} </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page * itemsPerPage >= filteredData.length}
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Row 3 - Tablo */}
            <div className="yayinlar-main-row-3">
                {totalPages <= 0 ? (
                    <NotFound />
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Proje Adı</th>
                                <th>Proje Türü</th>
                                <th>Grup</th>
                                <th>Puan</th>
                                <th>Durum</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => {
                                const savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];
                                const isSaved = savedProjects.some((proj) => proj.id === item.id); // Kaydedildi mi kontrolü

                                return (
                                    <tr key={index}>
                                        <td>{item.projectName.length > 50 ? `${item.projectName.slice(0, 60)}...` : item.projectName}</td>
                                        <td>{item.projectTypeName}</td>
                                        <td>{item.group || '-'}</td>
                                        {item.status === 'Devam Ediyor' ? (
                                            <td>{0}</td>
                                        ) : (
                                            <td>{item.score}</td>
                                        )}
                                        <td>{item.status}</td>
                                        <td>

                                            <button
                                                className="yayinlar-btn"
                                                onClick={() => saveToLocalStorage(item)}
                                            >
                                                {isSaved ? <FaCheckSquare /> : <FaRegSquare />}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Projeler;
