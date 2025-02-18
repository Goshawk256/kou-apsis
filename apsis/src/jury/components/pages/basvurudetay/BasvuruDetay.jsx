import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    const transformData = (categoryData, category) => {
        return categoryData.map(item => ({
            title: item.title || item.projectName || '', // title veya projectName kullanılır
            score: item.score || 0, // score, mevcut değilse 0
            group: item.group || '', // group bilgisi
            documentUrl: item.documentUrl || '#', // Belge bağlantısı
        }));
    };
    
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
                console.log(selectedApp);
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
            const transformed = [];
    
            // Her kategori için veri dönüştürme
            ['publications', 'lessons', 'thesis', 'projects', 'awards', 'artworks'].forEach(category => {
                if (selectedApplication[category]) {
                    transformed.push(...transformData(selectedApplication[category], category));
                }
            });
    
            setData(transformed); // Veriyi güncelle
            setCurrentPage(1);
        }
    }, [selectedApplication]);
    
    const filteredData = data.filter(item => (item.title?.toLowerCase()).includes(searchTerm.toLowerCase()));
    const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    return (
        loading ?  <div className="hourglassBackground">
                        <div className="hourglassContainer">
                            <div className="hourglassCurves"></div>
                            <div className="hourglassCapTop"></div>
                            <div className="hourglassGlassTop"></div>
                            <div className="hourglassSand"></div>
                            <div className="hourglassSandStream"></div>
                            <div className="hourglassCapBottom"></div>
                            <div className="hourglassGlass"></div>
                        </div>
                    </div> : (
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
        <tr key={item.title}>
            <td>{item.title}</td>
            <td>{item.group}</td>
            <td>{item.score}</td>
            <td><a href={item.documentUrl}>Belge</a></td>
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
BasvuruDetay.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default BasvuruDetay;
