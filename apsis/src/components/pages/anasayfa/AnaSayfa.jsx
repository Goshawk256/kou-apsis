import React, { useRef, useEffect, useState } from 'react';
import './AnaSayfa.css';
import { Bar } from 'react-chartjs-2'; // Bar ve Doughnut grafiklerini import edelim
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { getUserInfoByUsername, getLessonByUsername } from '../../../service/user';

import openbookIcon from '../../../assets/open-book.svg'
import kepIcon from '../../../assets/kep2.svg'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function AnaSayfa() {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);
    const username = localStorage.getItem('username');
    const getCurrentSemester = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        // Eğer Temmuz'dan sonrasıysa, yılın ikinci yarısındayız (B)
        if (currentMonth > 6) {
            const crrntYr = currentYear - 1
            const nextYear = currentYear; // Şu anki yıldan sonraki yıl
            return `${crrntYr.toString().slice(-2)}${nextYear.toString().slice(-2)}B`;
        } else {
            // Ocak-Haziran dönemi, yılın ilk yarısı (G)
            const previousYear = currentYear - 1; // Geçen yıl
            return `${previousYear.toString().slice(-2)}${currentYear.toString().slice(-2)}G`;
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfoData = await getUserInfoByUsername(username);
                const lessonData = await getLessonByUsername(username);


                localStorage.setItem('userInfo', JSON.stringify(userInfoData));


                const currentSemester = getCurrentSemester();


                const semesterData = lessonData?.data?.find(lesson => lesson.semester === currentSemester);


                if (!semesterData) {
                    console.error(`Semester data for ${currentSemester} not found.`);
                }

                const doctoralStudents = semesterData?.student_stats?.doctoral_students || 0;
                const mastersStudents = semesterData?.student_stats?.masters_students || 0;

                console.log('Doctoral Students:', doctoralStudents);
                console.log('Masters Students:', mastersStudents);

                setUserInfo({
                    ...userInfoData.data[0],
                    studentdata: {
                        phdStudentCount: doctoralStudents,
                        masterStudentCount: mastersStudents,
                    }
                });

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
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
        <div className={`main-anasayfa`}>
            {/* 1. Satır Kartları */}
            <div className='anasayfa-row-1'>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <img style={{ width: '30px' }} src={kepIcon} alt="" />
                        <label>H-İndex (WoS)</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.hindex.sciHindex}</div>
                </div>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <img style={{ width: '30px' }} src={kepIcon} alt="" />
                        <label>Dil Puanı</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.languagedata || '-'}</div>
                </div>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <img style={{ width: '30px' }} src={kepIcon} alt="" />
                        <label>Yüksek Lis. Öğr. Say.</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.studentdata.masterStudentCount || '-'}</div>
                </div>
                <div className='anasayfa-row-1-card'>
                    <div className='card-row-1'>
                        <img style={{ width: '30px' }} src={kepIcon} alt="" />
                        <label>Doktora Öğr. Say.</label>
                    </div>
                    <div className='card-inner-count'>{userInfo.studentdata.phdStudentCount || '-'}</div>
                </div>
            </div>

            {/* 2. Satır Grafik Kartları */}
            <div className='anasayfa-row-2'>
                <div className='anasayfa-row-2-card'>
                    <div className='card-row-1'>
                        <img style={{ width: '30px' }} src={openbookIcon} alt="" />
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
                        <img style={{ width: '30px' }} src={openbookIcon} alt="" />
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
