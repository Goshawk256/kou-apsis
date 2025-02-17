import React from 'react'
import './BasvuruDetay.css'
import previous from '../../../../assets/previous.png';
import { FaPencilAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import All_Url from '../../../../url.js';

function BasvuruDetay({ onSelect, basvuruId }) {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetchData = async () => {
            try {
                const response = await axios.post(`${All_Url.api_base_url}/jury/get-applications`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.data.preliminaryApplications) {
                    const selectedApplication = response.data.data.preliminaryApplications.find(app => app.applicationId === basvuruId);
                    setSelectedApplication(selectedApplication);
                }
                else if (response.data.data.scientificApplications) {
                    const selectedApplication = response.data.data.finalApplications.find(app => app.applicationId === basvuruId);
                    setSelectedApplication(selectedApplication);
                }
            } catch (error) {
                console.error("Hata oluştu:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [basvuruId]);
    return (

        loading ? (
            'yükleniyor'
        ) : (
            selectedApplication ?
                (
                    'selam'
                ) : (
                    <div className='main-basvurudetay'>
                        <button className='go-back-button' onClick={() => onSelect('Ana Sayfa')} >
                            <img src={previous} alt="" />
                        </button>

                        <div className='basvurudetay-content' >
                            <div className='basvurudetay-header'>
                                <span className='user-header'>{selectedApplication.applicantUsername}</span>
                                <span className='user-date'>Başvuru Tarihi: 12.05.2021</span>
                            </div>
                            <div className='basvurudetay-inner'>
                                <div className='outer-table'>
                                    <table className='basvurudetay-table'>
                                        <thead>
                                            <tr>
                                                <th>İçerik Adı</th>
                                                <th>İçerik Grubu</th>
                                                <th>İçerik Puanı</th>
                                                <th>Yüklenen Belge</th>
                                                <th>Başvuru Tipi</th>
                                                <th>İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Başvuru İçeriği Adı</td>
                                                <td>A5</td>
                                                <td>90</td>
                                                <td><a href='https://www.google.com'>Belge</a></td>
                                                <td>Kadro Başvurusu</td>
                                                <td> <button><FaPencilAlt /></button></td>
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