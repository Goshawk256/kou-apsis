import React, { useState } from 'react';
import { useTheme } from '../../../theme/themeContext';
import './Basvuru.css';
import { motion, AnimatePresence } from 'framer-motion';

function Basvuru() {
    const [data, setData] = useState([
        { id: 1, ad: 'Ahmet', grup: 'A1', tur: 'Tez', puan: 30 },
        { id: 2, ad: 'Mehmet', grup: 'A2', tur: 'Tez', puan: 40 },
        { id: 3, ad: 'Ayşe', grup: 'A1', tur: 'Tez', puan: 35 },
        { id: 4, ad: 'Fatma', grup: 'A3', tur: 'Tez', puan: 28 },
        { id: 5, ad: 'Ali', grup: 'A2', tur: 'Tez', puan: 33 },
        { id: 6, ad: 'Veli', grup: 'A1', tur: 'Tez', puan: 37 },
        { id: 7, ad: 'Zeynep', grup: 'A3', tur: 'Tez', puan: 45 },
        { id: 8, ad: 'Hakan', grup: 'A2', tur: 'Tez', puan: 31 },
        { id: 9, ad: 'Can', grup: 'A1', tur: 'Tez', puan: 29 },
        { id: 10, ad: 'Emre', grup: 'A3', tur: 'Tez', puan: 42 },
        { id: 11, ad: 'Burak', grup: 'A2', tur: 'Tez', puan: 39 },
        { id: 12, ad: 'Deniz', grup: 'A1', tur: 'Tez', puan: 36 }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='basvuru-main'>
            <div className='basvuru-content'>
                <div className='basvuru-choosing-content'></div>
                <div className='table-toggle'>
                    <button className='pagination-button' onClick={handlePrev} disabled={currentPage === 1}>‹</button>
                    {currentPage}/{totalPages}
                    <button className='pagination-button' onClick={handleNext} disabled={currentPage === totalPages}>›</button>
                </div>
                <div className='basvuru-table-content'>
                    <table className='basvuru-table'>
                        <thead className='basvuru-table-head'>
                            <tr className='basvuru-table-header'>
                                <th>Seçim</th>
                                <th>Grup</th>
                                <th>Tür</th>
                                <th>Puan</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody className='basvuru-table-body'>
                            {selectedData.map((item) => (
                                <tr key={item.id}>
                                    <td >{item.ad}</td>
                                    <td>{item.grup}</td>
                                    <td>{item.tur}</td>
                                    <td>{item.puan}</td>
                                    <td>
                                        <button className='action-button'>İşlem</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='basvuru-button-area'></div>
        </div>
    );
}

export default Basvuru;
