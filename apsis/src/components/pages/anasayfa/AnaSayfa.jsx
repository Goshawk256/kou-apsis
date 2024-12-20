import React, { useRef, useEffect, useState } from 'react';
import './AnaSayfa.css';
import { FaGraduationCap, FaBook } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2'; // Bar ve Doughnut grafiklerini import edelim
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { getUserInfoByUsername } from '../../../service/user';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function AnaSayfa() {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);
    const username = localStorage.getItem('username')
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfoByUsername(username);//biten tek bir tez var AYapıcı
                console.log('User Info:', data);
                setUserInfo(data[0]);
                setLoading(false);  // Veriler geldikten sonra loading'i false yap
            } catch (err) {
                setError('Error fetching user information');
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>

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
        </div>;  // Burada bir loading ekranı veya spinner gösterebilirsiniz
    }

    // publicationData ve citationData'yı sadece userInfo yüklendikten sonra hesaplayalım
    const publicationData = userInfo ? {
        labels: userInfo.userdata.lastFiveYears.map(item => item.year),
        datasets: [
            {
                label: 'Yayın Sayısı',
                data: userInfo.userdata.lastFiveYears.map(item => item.publicationCount),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return 'rgba(75, 192, 192, 0.6)';
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
                    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
                    return gradient;
                },
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 10,
                barThickness: 30,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            },
        ],
    } : {};

    const citationData = userInfo ? {
        labels: userInfo.userdata.lastFiveYears.map(item => item.year),
        datasets: [
            {
                label: 'Atıf Sayısı',
                data: userInfo.userdata.lastFiveYears.map(item => item.citationCount),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return 'rgba(153, 102, 255, 0.6)';
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(153, 102, 255, 0.6)');
                    gradient.addColorStop(1, 'rgba(153, 102, 255, 0.2)');
                    return gradient;
                },
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                borderRadius: 10,
                barThickness: 30,
                hoverBackgroundColor: 'rgba(153, 102, 255, 0.8)',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            },
        ],
    } : {};

    return (
        <div className='main-anasayfa'>
            {/* 1. Satır Kartları */}
            <div className='anasayfa-row-1'>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <FaGraduationCap size={30} />
                        <label>H-İndex (WoS)</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.hindex.sciHindex}</div>
                </div>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <FaGraduationCap size={30} />
                        <label>Dil Puanı</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.languagedata || '-'}</div>
                </div>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <FaGraduationCap size={30} />
                        <label>Yüksek Lis. Öğr. Say.</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.studentdata.masterStudentCount || '-'}</div>
                </div>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <FaGraduationCap size={30} />
                        <label>Doktora Öğr. Say.</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.studentdata.phdStudentCount || '-'}</div>
                </div>
            </div>

            {/* 2. Satır Grafik Kartları */}
            <div className='anasayfa-row-2'>
                <div className='anasayfa-row-2-card'>
                    <div className='card-row-1'>
                        <FaBook size={30} />
                        <label>Toplam Yayın Sayısı<strong>({userInfo.userdata.publicationCount})</strong></label>
                    </div>
                    {/* Yayın Sayısı Grafiği */}
                    {publicationData.labels && publicationData.datasets ? (
                        <Bar
                            ref={chartRef}
                            data={publicationData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Yayın Sayısı (2020-2024)',
                                    },
                                },
                            }}
                        />
                    ) : null}
                </div>
                <div className='anasayfa-row-2-card'>
                    <div className='card-row-1'>
                        <FaBook size={30} />
                        <label>Toplam Atıf Sayısı <strong>({userInfo.userdata.citationCount})</strong></label>
                    </div>
                    {/* Atıf Sayısı Grafiği */}
                    {citationData.labels && citationData.datasets ? (
                        <Bar
                            ref={chartRef}
                            data={citationData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Atıf Sayısı (2020-2024)',
                                    },
                                },
                            }}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default AnaSayfa;
