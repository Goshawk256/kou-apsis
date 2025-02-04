import React, { useEffect, useState } from 'react';
import './Dersler.css';
import { FaSync, FaCheck, FaInfo, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import axios from 'axios';
import RightBar from '../../rightbar/RightBar';
import NotFound from '../../errorstacks/NotFound';

import All_Url from '../../../url';

function Dersler() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [rightBarOpen, setRightBarOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null); // Pop-up mesajı

    const formatSemester = (semester) => {
        const yearMapping = {
            '2122': '2021-2022',
            '2223': '2022-2023',
            '2324': '2023-2024',
            '2425': '2024-2025',
            '2526': '2025-2026',
            '2627': '2026-2027',
            '2728': '2027-2028'
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
                const response = await axios.post(
                    `${All_Url.api_base_url}/academic/get-lessons`,
                    { username },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    }
                );

                // Gelen verinin doğru olup olmadığını kontrol et
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    const courses = response.data.data.map(item => ({
                        // Her bir öğe üzerinde işlem yap
                        ...item, // item'daki tüm alanları al
                        // Ekstra bir işlem yapacaksanız, örneğin 'semester' kullanmak
                        semester: item.semester
                    }));

                    setTableData(courses);
                    setFilteredData(courses);
                } else {
                    console.error("Beklenen veri formatı alınamadı:", response.data);
                }
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

    const saveToLocalStorage = (course) => {
        const savedCourses = JSON.parse(localStorage.getItem('savedCourses')) || [];

        const existingCourse = savedCourses.find((savedCourse) => savedCourse.id === course.id);

        if (!existingCourse) {
            savedCourses.push(course);
            localStorage.setItem('savedCourses', JSON.stringify(savedCourses));
            showPopup('Ders başarıyla kaydedildi!', 'success');
        } else {
            const userConfirmed = confirm('Bu ders zaten kaydedilmiş. Silmek ister misiniz?');
            if (userConfirmed) {
                const updatedCourses = savedCourses.filter((savedCourse) => savedCourse.id !== course.id);
                localStorage.setItem('savedCourses', JSON.stringify(updatedCourses));
                showPopup('Ders başarıyla silindi!', 'success');
            } else {
                showPopup('Ders silinmedi.', 'info');
            }
        }
    };


    const showPopup = (message, type) => {
        setPopupMessage({ message, type });
        setTimeout(() => setPopupMessage(null), 1500); // Pop-up mesajını birkaç saniye sonra kapatıyoruz
    };

    const itemsPerPage = 6; // Sayfa başına gösterilecek öğe sayısı
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
                    style={{ color: 'grey' }}
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
                    <span>{page}/{totalPages}</span>
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
                            {paginatedData.map((item, index) => {
                                const savedCourses = JSON.parse(localStorage.getItem('savedCourses')) || [];
                                const isSaved = savedCourses.some((savedCourse) => savedCourse.id === item.id); // Kaydedildi mi kontrolü

                                return (
                                    <tr key={index}>
                                        <td>{formatSemester(item.semester)}</td>
                                        <td>{item.course_name}</td>
                                        <td>{item.course_count}</td>
                                        <td>{item.ders_dil_adi}</td>
                                        <td>{item.dip_tur}</td>
                                        <td>{item.grup_adi}</td>
                                        <td>{item.ders_puani}</td>
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

export default Dersler;
