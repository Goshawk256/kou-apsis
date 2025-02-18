import React, { useState, useEffect } from 'react';
import './BasvuruDetay.css';
import previous from '../../../../assets/previous.png';
import { FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import All_Url from '../../../../url.js';

function BasvuruDetay({ onSelect }) {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('publications');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetchData = async () => {
            try {
                const basvuruId = localStorage.getItem('selectedApplication');
                const response = await axios.post(`${All_Url.api_base_url}/jury/get-applications`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const applications = [...response.data.data.preliminaryApplications, ...response.data.data.scientificApplications];
                const selectedApp = applications.find(app => app.applicationId === basvuruId);
                setSelectedApplication(selectedApp);
            } catch (error) {
                console.error("Hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedApplication) {
            setData(selectedApplication[selectedCategory] || []);
            setCurrentPage(1);
        }
    }, [selectedApplication, selectedCategory]);

    const filteredData = data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        loading ? ('Yükleniyor...') : (
            !selectedApplication ? ('Başvuru bulunamadı') : (
                <div className='main-basvurudetay'>
                    <button className='go-back-button' onClick={() => onSelect('Ana Sayfa')}>
                        <img src={previous} alt="Geri" />
                    </button>
                    <div className='basvurudetay-content'>
                        <div className='basvurudetay-header'>
                            <span className='user-header'>{selectedApplication.applicantUsername}</span>
                            <span className='user-date'>{selectedApplication.userMail}</span>
                        </div>
                        <div className='basvurudetay-inner'>
                            <div className='table-section'>
                                {['publications', 'lessons', 'thesis', 'projects', 'awards', 'artworks'].map(category => (
                                    <button key={category} onClick={() => setSelectedCategory(category)}>
                                        {category.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <div className="basvurudetay-main-row-2">
                                <input
                                    type="text"
                                    placeholder="Arama Sözcüğünüzü Giriniz..."
                                    className="basvurudetay-search-input"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="basvurudetay-pagination">
                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>‹</button>
                                    <span>{currentPage} / {totalPages || 1}</span>
                                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>›</button>
                                </div>
                            </div>
                            <div className='outer-table'>
                                <table className='basvurudetay-table'>
                                    <thead>
                                        <tr>
                                            <th>İçerik Adı</th>
                                            <th>İçerik Grubu</th>
                                            <th>İçerik Puanı</th>
                                            <th>Yüklenen Belge</th>
                                            <th>İşlem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedData.length > 0 ? displayedData.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.title}</td>
                                                <td>{item.group}</td>
                                                <td>{item.score}</td>
                                                <td><a href={item.documentUrl || '#'}>Belge</a></td>
                                                <td><button><FaPencilAlt /></button></td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5">Veri bulunamadı</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    );
}

export default BasvuruDetay;
