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
            <button onClick={onSelect}>selam</button>
        </div>
    );
}

export default MyApplications;