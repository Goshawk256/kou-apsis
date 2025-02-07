import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YonetilenTezler.css';
import { FaSync, FaCheckSquare, FaRegSquare, FaPencilAlt } from 'react-icons/fa';
import All_Url from '../../../url';
import RightBar from '../../rightbar/RightBar';
import NotFound from '../../errorstacks/NotFound';
import { refreshTheToken } from '../../../middlewares/authMiddleware';

function YonetilenTezler() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rightBarOpen, setRightBarOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı
    const username = localStorage.getItem('username');
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempGroups, setTempGroups] = useState({}); // Yalnızca eklenen kısmı saklayan nesne

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setTempGroups(prev => ({ ...prev, [index]: tempGroups[index] || "" })); // Önceden bir değer varsa onu kullan
    };

    const handleInputChange = (e, index) => {
        setTempGroups(prev => ({ ...prev, [index]: e.target.value })); // Sadece ilgili satırın groupEdited kısmını güncelle
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setEditingIndex(null); // Düzenleme modunu kapat
        }
    };


    const fetchData = async () => {
        await refreshTheToken();
        setLoading(true);
        try {
            const response = await axios.post(
                `${All_Url.api_base_url}/academic/get-advising-thesis`,
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
    const saveToLocalStorage = (thesis) => {
        const savedThesis = JSON.parse(localStorage.getItem('savedThesis')) || [];

        // Tez daha önce kaydedilmiş mi kontrol edelim
        const existingThesis = savedThesis.find((th) => th.id === thesis.id);

        if (!existingThesis) {
            savedThesis.push(thesis);
            localStorage.setItem('savedThesis', JSON.stringify(savedThesis));
            showPopup('Tez başarıyla kaydedildi!', 'success');
        } else {
            // Kullanıcıdan silmek isteyip istemediğini soralım
            const userConfirmed = confirm('Bu tez zaten kaydedilmiş. Silmek ister misiniz?');
            if (userConfirmed) {
                const updatedThesis = savedThesis.filter((th) => th.id !== thesis.id);
                localStorage.setItem('savedThesis', JSON.stringify(updatedThesis));
                showPopup('Tez başarıyla silindi!', 'success');
            } else {
                showPopup('Tez silinmedi.', 'info');
            }
        }
    };

    const showPopup = (message, type) => {
        setPopupMessage({ message, type });
        setTimeout(() => setPopupMessage(null), 1500);
    };

    const itemsPerPage = 4;
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
                                    <th>Kurum</th>
                                    <th>Grup</th>
                                    <th>Puan</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => {
                                    const savedTheses = JSON.parse(localStorage.getItem('savedThesis')) || [];
                                    const isSaved = savedTheses.some((th) => th.id === item.id); // Kaydedildi mi kontrolü

                                    return (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.corporateName}</td>
                                            <td
                                                className="item-group"

                                            >
                                                {editingIndex === item.id ? (
                                                    <input
                                                        type="text"
                                                        value={tempGroups[item.id] || ""}
                                                        onChange={(e) => handleInputChange(e, item.id)}
                                                        onKeyDown={handleKeyPress}
                                                        autoFocus
                                                        onBlur={() => setEditingIndex(null)}
                                                    />
                                                ) : (
                                                    <div className='group-show'>
                                                        {tempGroups[item.id] ? (
                                                            <div className='preffered-group'>
                                                                <s>{item.groupAuto}</s>/{tempGroups[item.id]}
                                                            </div>
                                                        ) : (
                                                            <div className='preffered-group'>
                                                                {item.groupAuto}
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </td>

                                            <td>{item.scoreAuto}</td>
                                            <td>
                                                <button className="yayinlar-btn" onClick={() => handleEditClick(item.id)} ><FaPencilAlt /></button>

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

export default YonetilenTezler;
