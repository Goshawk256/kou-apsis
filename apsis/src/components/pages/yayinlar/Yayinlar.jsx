import React, { useState, useEffect } from 'react';
import './Yayinlar.css';
import { FaSync, FaPencilAlt, FaCheckSquare, FaInfo, FaRegSquare, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import All_Url from '../../../url';
import RightBar from '../../rightbar/RightBar';
import NotFound from '../../errorstacks/NotFound';
import { useTheme } from '../../../theme/themeContext';
import { motion, AnimatePresence } from 'framer-motion';

function Yayinlar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [publicationTypeId, setPublicationTypeId] = useState(1);
    const [rightBarOpen, setRightBarOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı
    const theme = useTheme();

    const username = localStorage.getItem('username');

    useEffect(() => {
        if (username) {
            if (publicationTypeId === 2) {
                fetchCitations();
            } else {
                fetchPublications();
            }
        } else {
            console.error("Kullanıcı adı localStorage'da bulunamadı.");
        }
    }, [publicationTypeId]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, publicationTypeId]);

    const fetchPublications = async () => {
        try {
            const response = await axios.post(`${All_Url.api_base_url}/publication/get-publications-by-username`, {
                username,
                publicationTypeId,
            });

            if (response.data.success) {
                setTableData(response.data.data);
            } else {
                showPopup(response.data.message || 'Veri çekme başarısız.', 'error');
            }
        } catch (error) {
            showPopup('Veri çekerken bir hata oluştu.', 'error');
        }
    };

    const fetchCitations = async () => {
        try {
            const response = await axios.post(`${All_Url.api_base_url}/publication/get-citations-by-username`, {
                username,
            });

            if (response.data.success) {
                setTableData(response.data.data);
            } else {
                showPopup('Atıf verileri çekilirken hata oluştu.', 'error');
            }
        } catch (error) {
            showPopup('Veri çekerken bir hata oluştu.', 'error');
        }
    };

    const filteredData = tableData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    const saveToLocalStorage = (publication) => {
        const savedPublications = JSON.parse(localStorage.getItem('savedPublications')) || [];

        const existingPublication = savedPublications.find((pub) => pub.id === publication.id);

        if (!existingPublication) {
            savedPublications.push(publication);
            localStorage.setItem('savedPublications', JSON.stringify(savedPublications));
            showPopup('Yayın başarıyla kaydedildi!', 'success');
        } else {
            const userConfirmed = confirm('Bu yayın zaten kaydedilmiş. Silmek ister misiniz?');
            if (userConfirmed) {
                const updatedPublications = savedPublications.filter((pub) => pub.id !== publication.id);
                localStorage.setItem('savedPublications', JSON.stringify(updatedPublications));
                showPopup('Yayın başarıyla silindi!', 'success');
            } else {
                showPopup('Yayın silinmedi.', 'info');
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
        <div className={`yayinlar-main ${theme}`}>
            <RightBar isOpen={rightBarOpen} onClose={closeRightBar} />

            {popupMessage && (
                <div className={`already-popup ${popupMessage.type}`}>
                    {popupMessage.message}
                </div>
            )}

            {/* Row 1 - Butonlar */}
            <div className="yayinlar-main-row-1">
                <button
                    className={`yayinlar-btn ${publicationTypeId === 1 ? 'active' : ''}`}
                    onClick={() => setPublicationTypeId(1)}
                >
                    Makaleler
                </button>
                <button
                    className={`yayinlar-btn ${publicationTypeId === 2 ? 'active' : ''}`}
                    onClick={() => setPublicationTypeId(2)}
                >
                    Atıflarım
                </button>
                <button
                    className={`yayinlar-btn ${publicationTypeId === 3 ? 'active' : ''}`}
                    onClick={() => setPublicationTypeId(3)}
                >
                    Kitaplar
                </button>
                <button
                    className={`yayinlar-btn ${publicationTypeId === 4 ? 'active' : ''}`}
                    onClick={() => setPublicationTypeId(4)}
                >
                    Bildiriler
                </button>
            </div>

            {/* Row 2 - Arama, Filtreleme, Yenileme */}
            <div className="yayinlar-main-row-2">
                <input
                    style={{ color: 'gray' }}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Arama Sözcüğünüzü Giriniz..."
                    className="yayinlar-search-input"
                />
                <button
                    className="yayinlar-refresh-btn"
                    onClick={publicationTypeId === 2 ? fetchCitations : fetchPublications}
                >
                    <FaSync />
                </button>
                <div className="yayinlar-pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                        ‹
                    </button>
                    <span>{page} / {totalPages}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= filteredData.length}>
                        ›
                    </button>
                </div>
            </div>

            <div className="yayinlar-main-row-3">
                <AnimatePresence mode="wait">
                    {totalPages <= 0 ? (
                        <motion.div
                            key="not-found"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <NotFound />
                        </motion.div>
                    ) : (
                        <motion.table
                            key={publicationTypeId}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <thead>
                                <tr>
                                    <th>Yayın Adı</th>
                                    <th>Endeks Türü</th>
                                    <th>Grup</th>
                                    <th>Puan</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => {
                                    const savedPublications = JSON.parse(localStorage.getItem('savedPublications')) || [];
                                    const isSaved = savedPublications.some((pub) => pub.id === item.id); // Kontrol

                                    return publicationTypeId === 2 ? (
                                        <tr key={item.id}>
                                            <td>
                                                {item.title.length > 50 ? `${item.title.slice(0, 60)}...` : item.title}
                                                <br />
                                                <p style={{ color: '#5d8c6a', fontSize: '10px' }}>{item.authors ? item.authors.join(", ") : "-"}</p>
                                            </td>
                                            <td>{item.journalIndex || '-'}</td>
                                            <td>{item.citationGroup}</td>
                                            <td>{item.citationScore}</td>
                                            <td >
                                                <button className="yayinlar-btn"><FaPencilAlt /></button>
                                                <button className="yayinlar-btn" onClick={openRightBar}>
                                                    {isSaved ? <FaInfo /> : <FaCheck />}
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={item.id}>
                                            <td>
                                                {item.title.length > 50 ? `${item.title.slice(0, 60)}...` : item.title}
                                                <br />
                                                <p style={{ color: '#5d8c6a', fontSize: '10px' }}> {item.authors ? item.authors.join(", ") : "-"}</p>
                                                <p style={{ color: '#5d8c6a', fontSize: '10px' }}>
                                                    {new Date(item.publishDate).toLocaleDateString('tr-TR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </td>
                                            <td>{item.journalIndex || '-'}</td>
                                            <td>{item.groupAuto}</td>
                                            <td>{(item.scoreAuto || 0).toFixed(2)}</td>
                                            <td >
                                                <button className="yayinlar-btn" onClick={openRightBar}><FaPencilAlt /></button>

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

                        </motion.table>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Yayinlar;
