import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import All_Url from '../url';
import './HomePage.css';
import SideBar from '../academic/components/sidebar/SideBar';
import Header from '../academic/components/header/Header';
import AnaSayfa from '../academic/components/pages/anasayfa/AnaSayfa';
import Dersler from '../academic/components/pages/dersler/Dersler';
import Oduller from '../academic/components/pages/oduller/Oduller';
import SanatsalFaaliyetler from '../academic/components/pages/sanat/SanatsalFaaliyetler';
import YonetilenTezler from '../academic/components/pages/tezler/YonetilenTezler';
import Yayinlar from '../academic/components/pages/yayinlar/Yayinlar';
import Projeler from '../academic/components/pages/projeler/Projeler';
import Basvurular from '../academic/components/pages/basvurular/Basvuru';
import Finish from '../academic/components/pages/finish/Finish';
import Help from '../academic/components/pages/help/Help';
import JuriHomepage from '../jury/components/JuriHomepage';

function HomePage() {
    const [selectedPage, setSelectedPage] = useState('Ana Sayfa');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const username = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');

        // Kullanıcıyı giriş sayfasına yönlendirme fonksiyonu
        const navigateLogin = () => {

            navigate('/');
        };

        // JWT token süresini kontrol eden fonksiyon
        const isTokenExpired = (token) => {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.exp < Math.floor(Date.now() / 1000);
            } catch (error) {
                console.error("JWT çözümleme hatası:", error);
                return true;
            }
        };

        // Refresh token ile yeni token al
        const refreshAccessToken = async () => {
            try {
                const response = await axios.post(`${All_Url.api_base_url}/auth/refresh`, {
                    refreshToken,
                    username,
                    role: storedRole
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.data?.accessToken) {
                    localStorage.setItem('accessToken', response.data.accessToken);


                } else {
                    navigateLogin();
                }
            } catch (error) {
                console.error('Token yenileme hatası:', error);
                navigateLogin();
            }
        };

        if (!accessToken) {
            navigateLogin();
        } else if (isTokenExpired(accessToken)) {
            if (refreshToken) {
                refreshAccessToken();
            } else {
                navigateLogin();
            }
        } else {
            // Token geçerliyse rolü set et
            try {
                const payload = JSON.parse(atob(accessToken.split('.')[1]));

            } catch (error) {
                console.error("JWT çözümleme hatası:", error);
                navigateLogin();
            }
        }
    }, [navigate]);

    const renderContent = () => {
        switch (selectedPage) {
            case 'Ana Sayfa': return <AnaSayfa />;
            case 'Yayınlarım': return <Yayinlar />;
            case 'Derslerim': return <Dersler />;
            case 'Yönetilen Tezler': return <YonetilenTezler />;
            case 'Proje Görevlerim': return <Projeler />;
            case 'Ödüller': return <Oduller />;
            case 'Sanatsal Faaliyet': return <SanatsalFaaliyetler />;
            case 'Başvuru': return <Basvurular onSelect={setSelectedPage} />;
            case 'Finish': return <Finish />;
            case 'Yardım': return <Help />;
            default: return <AnaSayfa />;
        }
    };

    if (!role) return <div>Loading...</div>;

    return (
        role === 'Academic' ? (
            <div className="main-homepage">
                <Header />
                <SideBar onSelect={setSelectedPage} />
                <div className="flexible-component">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedPage}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        ) : role === 'Jury' ? (
            <JuriHomepage />
        ) : (
            <div>Role not found</div>
        )
    );
}

export default HomePage;
