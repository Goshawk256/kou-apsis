import React, { useEffect, useState } from 'react';
import './Projeler.css';
import { FaSync, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';

function Projeler() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const username = localStorage.getItem('username');
            try {
                const response = await axios.post(
                    'http://185.92.2.229:3000/post/projects/get-project-by-username-from-db',
                    { username: username }
                );
                setTableData(response.data || []);
                setFilteredData(response.data || []);
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

    const itemsPerPage = 5; // Sayfa başına gösterilecek proje sayısı
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="yayinlar-main">
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
                    <span>{page}</span>
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
                <table>
                    <thead>
                        <tr>
                            <th>Proje Adı</th>
                            <th>Proje Türü</th>


                            <th>Grup</th>
                            <th>Puan</th>
                            <th>Baş.Tar</th>
                            <th>Durum</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.projectName}</td>
                                <td>{item.projectTypeName}</td>


                                <td>{item.group || '-'}</td>
                                <td>{item.score}</td>
                                <td>{new Date(item.begin).toLocaleDateString('tr-TR')}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className="yayinlar-btn">
                                        <FaPencilAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Projeler;
