import React, { useState, useEffect } from 'react';
import './Yayinlar.css';
import { FaSync, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import All_Url from '../../../url';

function Yayinlar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [publicationTypeId, setPublicationTypeId] = useState(1); // Default olarak "Makaleler"

    const username = localStorage.getItem('username');

    useEffect(() => {
        if (username) {
            fetchPublications();
        } else {
            console.error("Kullanıcı adı localStorage'da bulunamadı.");
        }
    }, [publicationTypeId]); // publicationTypeId değişince yeniden veri çek

    const fetchPublications = async () => {
        try {
            const response = await axios.post(`${All_Url.api_dis_url}/post/publications/get-publications-by-username-from-db`, {
                username,
                publicationTypeId,
            });

            if (response.data.success) {
                setTableData(response.data.data);
            } else {
                console.error("Veri çekme başarısız:", response.data.message);
            }
        } catch (error) {
            console.error("Veri çekerken hata oluştu:", error);
        }
    };

    const filteredData = tableData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );


    const itemsPerPage = 5;
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="yayinlar-main">
            {/* Row 1 - Butonlar */}
            <div className="yayinlar-main-row-1">
                <button className="yayinlar-btn" onClick={() => setPublicationTypeId(1)}>Makaleler</button>
                <button className="yayinlar-btn" onClick={() => setPublicationTypeId(2)}>Atıflarım</button>
                <button className="yayinlar-btn" onClick={() => setPublicationTypeId(3)}>Kitaplar</button>
                <button className="yayinlar-btn" onClick={() => setPublicationTypeId(4)}>Bildiriler</button>
            </div>

            {/* Row 2 - Arama, Filtreleme, Yenileme */}
            <div className="yayinlar-main-row-2">
                <input style={{ color: 'gray' }}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Dinamik arama yapın..."
                    className="yayinlar-search-input"
                />
                <button className="yayinlar-refresh-btn" onClick={fetchPublications}><FaSync /></button>
                <div className="yayinlar-pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                        ‹
                    </button>
                    <span>{page}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= filteredData.length}>
                        ›
                    </button>
                </div>
            </div>

            {/* Row 3 - Tablo */}
            <div className="yayinlar-main-row-3">
                <table>
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
                        {paginatedData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.journalIndex || '-'}</td>
                                <td>{item.group}</td>
                                <td>{(item.score).toFixed(2)}</td>
                                <td><button className="yayinlar-btn"><FaPencilAlt /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Yayinlar;
