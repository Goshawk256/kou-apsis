import React, { useEffect, useState } from 'react';
import './Dersler.css';
import { FaSync, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';

function Dersler() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const formatSemester = (semester) => {
        const yearMapping = {
            '2122': '2021-2022',
            '2223': '2022-2023', // Gerekirse diğer yıl eşlemelerini ekleyebilirsiniz
        };
        const termMapping = {
            'G': 'Güz',
            'B': 'Bahar',
        };

        const yearCode = semester.slice(0, 4); // İlk 4 karakter yıl kodu
        const termCode = semester.slice(4);   // Son karakter dönem kodu

        const year = yearMapping[yearCode] || 'Bilinmeyen Yıl'; // Eşleme yoksa "Bilinmeyen Yıl"
        const term = termMapping[termCode] || 'Bilinmeyen Dönem'; // Eşleme yoksa "Bilinmeyen Dönem"

        return `${year} ${term}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem('username');
            try {
                const response = await axios.post('http://185.92.2.229:3000/post/lessons/get-lesson-by-username-from-db', {
                    username: username,
                });

                const courses = response.data.flatMap(item =>
                    item.courses.map(course => ({
                        ...course,
                        semester: item.semester
                    }))
                );
                setTableData(courses);
                setFilteredData(courses);
            } catch (error) {
                console.error('Veriler alınırken bir hata oluştu:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        // Arama ve filtreleme işlemi
        const filtered = tableData.filter(item =>
            item.course_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, tableData]);

    const itemsPerPage = 7; // Sayfa başına gösterilecek öğe sayısı
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="yayinlar-main">
            {/* Row 2 - Arama, Filtreleme, Yenileme */}
            <div className="yayinlar-main-row-2">
                <input style={{ color: 'grey' }}
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
                            <th>Dönem</th>
                            <th>Kurs Adı</th>
                            <th>Kontenjan</th>
                            <th>Dil</th>
                            <th>Diploma Türü</th>
                            <th>Grup</th>
                            <th>Puan</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{formatSemester(item.semester)}</td>

                                <td>{item.course_name}</td>
                                <td>{item.course_count}</td>
                                <td>{item.ders_dil_adi}</td>
                                <td>{item.dip_tur}</td>
                                <td>{item.grup_adi}</td>
                                <td>{item.ders_puani}</td>
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

export default Dersler;
