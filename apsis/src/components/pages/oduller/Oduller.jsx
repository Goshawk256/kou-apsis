import React, { useState } from 'react';
import './Oduller.css'
import { FaSync, FaPencilAlt } from 'react-icons/fa';
function Oduller() {

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const tableData = [
        {

            baslik: 'Yangın Tespiti ve Yönetimi Sağlayacak İHA Geliştirilmesi',
            kurum: 'International Conference On Engineering Technologies',
            grup: 'H9',
            puan: 12

        },
        // Diğer veriler burada olabilir
    ];
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
                <button className="yayinlar-filter-btn">
                    Filtrele
                    <div className="yayinlar-dropdown"> {/* Filtreleme için placeholder dropdown */}
                        {/* Buraya içerik eklenebilir */}
                    </div>
                </button>
                <button className="yayinlar-refresh-btn" ><FaSync /></button>
                <div className="yayinlar-pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                        ‹
                    </button>
                    <span>{page}</span>
                    <button onClick={() => setPage(page + 1)}>›</button>
                </div>
            </div>

            {/* Row 3 - Tablo */}
            <div className="yayinlar-main-row-3">
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
                        {tableData.map((item, index) => (
                            <tr key={index}>

                                <td>{item.baslik}</td>
                                <td>{item.kurum}</td>
                                <td>{item.grup}</td>
                                <td>{item.puan}</td>
                                <td><button className="yayinlar-btn"><FaPencilAlt /></button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Oduller