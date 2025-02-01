import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Oduller.css';
import { FaSync, FaPencilAlt, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import All_Url from '../../../url';
import RightBar from '../../rightbar/RightBar';
import NotFound from '../../errorstacks/NotFound';

function Oduller() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rightBarOpen, setRightBarOpen] = useState(false); // Sağ panelin açık/kapalı durumu
    const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı

    const username = localStorage.getItem('username')

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${All_Url.api_base_url}/award/get-awards-by-username`,
                {
                    username: username,
                }
            );
            setTableData(response.data.data);

            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = tableData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.corporateName.toLowerCase().includes(query.toLowerCase()) ||
            item.group.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const saveToLocalStorage = (award) => {
        const savedAwards = JSON.parse(localStorage.getItem('savedAwards')) || [];

        const existingAward = savedAwards.find((awardItem) => awardItem.id === award.id);

        if (!existingAward) {
            savedAwards.push(award);
            localStorage.setItem('savedAwards', JSON.stringify(savedAwards));
            showPopup('Ödül başarıyla kaydedildi!', 'success');
        } else {
            const userConfirmed = confirm('Bu ödül zaten kaydedilmiş. Silmek ister misiniz?');
            if (userConfirmed) {
                const updatedAwards = savedAwards.filter((awardItem) => awardItem.id !== award.id);
                localStorage.setItem('savedAwards', JSON.stringify(updatedAwards));
                showPopup('Ödül başarıyla silindi!', 'success');
            } else {
                showPopup('Ödül silinmedi.', 'info');
            }
        }
    };


    const showPopup = (message, type) => {
        setPopupMessage({ message, type });
        setTimeout(() => setPopupMessage(null), 1500); // Pop-up mesajını birkaç saniye sonra kapatıyoruz
    };

    const itemsPerPage = 4;
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
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Dinamik arama yapın..."
                    className="yayinlar-search-input"
                />
                <button className="yayinlar-refresh-btn" onClick={fetchData} disabled={loading}>
                    <FaSync />
                </button>
                <div className="yayinlar-pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                        ‹
                    </button>
                    <span>{page}/{totalPages} </span>
                    <button onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= filteredData.length}>
                        ›
                    </button>
                </div>
            </div>

            {/* Row 3 - Tablo */}
            <div className="yayinlar-main-row-3">
                {loading ? (
                    <p>Yükleniyor...</p>
                ) : (
                    totalPages <= 0 ? (
                        <NotFound />
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Ad</th>
                                    <th>Kurum</th>
                                    <th>Grup</th>
                                    <th>Puan</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => {
                                    const savedAwards = JSON.parse(localStorage.getItem('savedAwards')) || [];
                                    const isSaved = savedAwards.some((award) => award.id === item.id); // Kaydedildi mi kontrolü

                                    return (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.corporateName}</td>
                                            <td>{item.group}</td>
                                            <td>{item.score}</td>
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
                    )
                )}
            </div>
        </div>
    );
}

export default Oduller;
