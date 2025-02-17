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



    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        const fetchData = async () => {
            try {

                const basvuruId = localStorage.getItem('selectedApplication');
                console.log(basvuruId);
                const response = await axios.post(`${All_Url.api_base_url}/jury/get-applications`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const preliminaryApps = response.data.data.preliminaryApplications || [];
                console.log(preliminaryApps);
                const scientificApps = response.data.data.scientificApplications || [];
                console.log(scientificApps);

                const selectedApplication = [...preliminaryApps, ...scientificApps].find(app => app.applicationId === basvuruId);

                setSelectedApplication(selectedApplication);
                console.log(selectedApplication);
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