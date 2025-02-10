import React, { useEffect } from 'react'
import axios from 'axios';
import All_Url from '../../../../url.js'
import { useState } from 'react';
import './MyApplications.css'

function MyApplications({ onSelect }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className='myapplications-main'>
            {loading ? (
                <div className="hourglassBackground">
                    <div className="hourglassContainer">
                        <div className="hourglassCurves"></div>
                        <div className="hourglassCapTop"></div>
                        <div className="hourglassGlassTop"></div>
                        <div className="hourglassSand"></div>
                        <div className="hourglassSandStream"></div>
                        <div className="hourglassCapBottom"></div>
                        <div className="hourglassGlass"></div>
                    </div>
                </div>
            ) : (
                <>
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
                                        <th>Başvurulan Kadro</th>
                                        <th>Başvuru Tipi</th>
                                        <th>Başvuru Durumu</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className='myapplications-table-body'>
                                    <tr>
                                        <td>10.10.2021</td>
                                        <td>Doç. Dr.</td>
                                        <td>Akademik Kadro</td>
                                        <td>Onay Bekliyor</td>
                                        <td>
                                            <button className='myapplications-button'>Detay</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </>
            )

            }


        </div>
    );
}

export default MyApplications;