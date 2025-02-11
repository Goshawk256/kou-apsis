import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import JuriAna from '../jury/components/pages/anasayfa/JuriAna';

function HomePage() {
    const [selectedPage, setSelectedPage] = useState('Ana Sayfa');
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1])); // JWT'nin payload kısmını decode et
                setRole(payload.role); // role değerini güncelle
            } catch (error) {
                console.error('Token çözümleme hatası:', error);
            }
        }
    }, []);

    const renderContent = () => {
        switch (selectedPage) {
            case 'Ana Sayfa':
                return <AnaSayfa />;
            case 'Yayınlarım':
                return <Yayinlar />;
            case 'Derslerim':
                return <Dersler />;
            case 'Yönetilen Tezler':
                return <YonetilenTezler />;
            case 'Proje Görevlerim':
                return <Projeler />;
            case 'Ödüller':
                return <Oduller />;
            case 'Sanatsal Faaliyet':
                return <SanatsalFaaliyetler />;
            case 'Başvuru':
                return <Basvurular onSelect={setSelectedPage} />;
            case 'Finish':
                return <Finish />;
            case 'Yardım':
                return <Help />;
            default:
                return <AnaSayfa />;
        }
    };

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
        ) : (
            <JuriAna />
        )
    );
}

export default HomePage;
