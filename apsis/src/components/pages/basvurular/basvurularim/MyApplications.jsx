import React, { useEffect } from 'react'
import axios from 'axios';
import All_Url from '../../../../url.js'
import './MyApplications.css'

function MyApplications({ onSelect }) {
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.post(`${All_Url.api_base_url}/academic/get-applications`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if (response.data.success) {
                    console.log(response.data.data);
                }
            } catch (error) {
                console.error('Veri çekme hatası:', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className='myapplications-main'>
            <h1 className='myapplications-header'>Başvurularım</h1>
            <div className='myapplication-buttons'>
                <button onClick={onSelect}>Yeni Başvuru</button>
            </div>
            <div className='myapplications-content'>
                <div className='myapplications-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Başvuru Tarihi</th>
                                <th>Proje Adı</th>
                                <th>Proje Durumu</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className='myapplications-table-body'>
                            <tr>
                                <td>10.10.2021</td>
                                <td>Proje Adı</td>
                                <td>Onay Bekliyor</td>
                                <td>
                                    <button className='myapplications-button'>Detay</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}

export default MyApplications;