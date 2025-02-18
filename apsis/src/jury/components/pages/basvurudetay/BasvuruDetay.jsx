import React from 'react'
import './BasvuruDetay.css'
import previous from '../../../../assets/previous.png';
import { FaPencilAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import All_Url from '../../../../url.js';

function BasvuruDetay({ onSelect }) {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [publications, setPublications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [awards, setAwards] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [thesis, setThesis] = useState([]);
    const [artworks, setArtworks] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetchData = async () => {
            try {

                const basvuruId = localStorage.getItem('selectedApplication');

                const response = await axios.post(`${All_Url.api_base_url}/jury/get-applications`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const preliminaryApps = response.data.data.preliminaryApplications || [];

                const scientificApps = response.data.data.scientificApplications || [];

                const selectedApplication = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId);
                const publications = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId).publications;
                const projects = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId).projects;
                const awards = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId).awards;
                const lessons = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId).lessons;
                const thesis = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId).advisingThesis;
                const artworks = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId).artworks;
                setPublications(publications);
                setProjects(projects);
                setAwards(awards);
                setLessons(lessons);
                setThesis(thesis);
                setArtworks(artworks);
                setSelectedApplication(selectedApplication);
            } catch (error) {
                console.error("Hata oluştu:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        loading ? (
            'yükleniyor'
        ) : (
            selectedApplication.length == 0 ?
                (
                    'selam'
                ) : (
                    <div className='main-basvurudetay'>
                        <button className='go-back-button' onClick={() => onSelect('Ana Sayfa')} >
                            <img src={previous} alt="" />
                        </button>
                        <div className='basvurudetay-content' >
                            <div className='basvurudetay-header'>
                                <span className='user-header'>{selectedApplication.userMail}</span>
                                <span className='user-date'>Başvuru Tarihi: 12.05.2021</span>
                            </div>
                            <div className='basvurudetay-inner'>
                                <div className='table-section' >
                                    <button>Yayınlar</button>
                                    <button>Dersler</button>
                                    <button>Yönetilen Tezler</button>
                                    <button>Proje Görevleri</button>
                                    <button>Ödüller</button>
                                    <button>Sanatsal Faaliyetler</button>
                                </div>
                                <div className="basvurudetay-main-row-2">
                                    <input
                                        style={{ color: 'gray' }}
                                        type="text"
                                        placeholder="Arama Sözcüğünüzü Giriniz..."
                                        className="basvurudetay-search-input"
                                    />
                                    <div className="basvurudetay-pagination">
                                        <button >
                                            ‹
                                        </button>
                                        <span>1 / 2</span>
                                        <button >
                                            ›
                                        </button>
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
                                            <tr>
                                                <td>Başvuru İçeriği Adı</td>
                                                <td>A5</td>
                                                <td>90</td>
                                                <td><a href='https://www.google.com'>Belge</a></td>
                                                <td><button><FaPencilAlt /></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        )
    )
}

export default BasvuruDetay