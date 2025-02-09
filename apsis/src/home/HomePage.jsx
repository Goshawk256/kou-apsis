import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomePage.css';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import AnaSayfa from '../components/pages/anasayfa/AnaSayfa';
import Dersler from '../components/pages/dersler/Dersler';
import Oduller from '../components/pages/oduller/Oduller';
import SanatsalFaaliyetler from '../components/pages/sanat/SanatsalFaaliyetler';
import YonetilenTezler from '../components/pages/tezler/YonetilenTezler';
import Yayinlar from '../components/pages/yayinlar/Yayinlar';
import Projeler from '../components/pages/projeler/Projeler';
import Basvurular from '../components/pages/basvurular/Basvuru';
import Finish from '../components/finish/Finish';
import Help from '../components/pages/help/Help';


function HomePage() {

    const [selectedPage, setSelectedPage] = useState('Ana Sayfa');

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
            case 'Başvuru Yap':
                return <Basvurular onSelect={setSelectedPage} />;
            case 'Finish':
                return <Finish />;
            case 'Help':
                return <Help />;
            default:
                return <AnaSayfa />;
        }
    };

    return (
        <div className={`main-homepage `}>
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
    );
}

export default HomePage;
