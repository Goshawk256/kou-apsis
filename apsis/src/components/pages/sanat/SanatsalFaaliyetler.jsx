import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SanatsalFaaliyetler.css';
import { FaSync, FaPencilAlt, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import All_Url from '../../../url';
import RightBar from '../../rightbar/RightBar';
import NotFound from '../../errorstacks/NotFound';
import { refreshTheToken } from '../../../middlewares/authMiddleware';


function SanatsalFaaliyetler() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rightBarOpen, setRightBarOpen] = useState(false); // Sağ panelin açık/kapalı durumu
    const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı

    const username = localStorage.getItem('username');

    const fetchData = async () => {
        setLoading(true);
        await refreshTheToken();

        try {
            const response = await axios.post(
                `${All_Url.api_base_url}/academic/get-artworks`,
                {
                    username: username,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            setTableData(response.data.data); // API'den gelen veriyi alıyoruz
            setFilteredData(response.data.data); // Aynı veriyi filtrelenebilir şekilde saklıyoruz

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
            item.group.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const saveToLocalStorage = (artwork) => {
        const savedArtworks = JSON.parse(localStorage.getItem('savedArtworks')) || [];

        const existingArtwork = savedArtworks.find((art) => art.id === artwork.id);

        if (!existingArtwork) {
            savedArtworks.push(artwork);
            localStorage.setItem('savedArtworks', JSON.stringify(savedArtworks));
            showPopup('Sanat faaliyeti başarıyla kaydedildi!', 'success');
        } else {
            const userConfirmed = confirm('Bu sanat faaliyeti zaten kaydedilmiş. Silmek ister misiniz?');
            if (userConfirmed) {
                const updatedArtworks = savedArtworks.filter((art) => art.id !== artwork.id);
                localStorage.setItem('savedArtworks', JSON.stringify(updatedArtworks));
                showPopup('Sanat faaliyeti başarıyla silindi!', 'success');
            } else {
                showPopup('Sanat faaliyeti silinmedi.', 'info');
            }
        }
    };


    const showPopup = (message, type) => {
        setPopupMessage({ message, type });
        setTimeout(() => setPopupMessage(null), 1500);
    };

    const itemsPerPage = 5;
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const openRightBar = () => setRightBarOpen(true);
    const closeRightBar = () => setRightBarOpen(false);

    return (
        <div className="yayinlar-main">
            <RightBar isOpen={rightBarOpen} onClose={closeRightBar} />
            {popupMessage && (
                <div className={`already-popup ${popupMessage.type}`}>
                    {popupMessage.message}
                </div>
            )}
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
                    <span>{page}/{totalPages}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= filteredData.length}>
                        ›
                    </button>
                </div>
            </div>

            {/* Row 3 - Tablo */}
            <div className="yayinlar-main-row-3">
                {loading ? (
                    <div className="hourglassBackground">
                        <div className="hourglassContainer">
                            <div className="hourglassCurves"></div>
                            <div className="hourglassCapTop"></div>
                            <div className="hourglassGlassTop"></div>
                            <div className="hourglassSand"></div>
                            <div className="hourglassSandStream"></div>
                            <div className="hourglassCapBottom"></div>
                            <div className="hourglassGlass"></div>
                        </div>
                    </div>
                ) : (
                    totalPages <= 0 ? (
                        <NotFound />
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Ad</th>
                                    <th>Grup</th>
                                    <th>Puan</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => {
                                    const savedArtworks = JSON.parse(localStorage.getItem('savedArtworks')) || [];
                                    const isSaved = savedArtworks.some((art) => art.id === item.id); // Kaydedildi mi kontrolü

                                    return (
                                        <tr key={item.id}>
                                            <td>{item.title.length > 50 ? `${item.title.slice(0, 60)}...` : item.title}</td>
                                            <td className='item-group'>{item.group}</td>
                                            <td>{item.score}</td>
                                            <td>
                                                <button className="yayinlar-btn"  ><FaPencilAlt /></button>
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

export default SanatsalFaaliyetler;
