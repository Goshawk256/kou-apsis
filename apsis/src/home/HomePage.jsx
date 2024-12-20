import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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


function HomePage() {
    const [selectedPage, setSelectedPage] = useState('Ana Sayfa');
    const username = localStorage.getItem('username')
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('username')
        navigate('/')
    }

    const renderContent = () => {
        switch (selectedPage) {
            case 'Ana Sayfa':
                return <div><AnaSayfa /></div>;
            case 'Yayınlarım':
                return <div><Yayinlar /></div>;
            case 'Derslerim':
                return <div><Dersler /></div>;
            case 'Yönetilen Tezler':
                return <div><YonetilenTezler /></div>;
            case 'Proje Görevlerim':
                return <div><Projeler /></div>;
            case 'Ödüller':
                return <div><Oduller /></div>;
            case 'Sanatsal Faaliyet':
                return <div><SanatsalFaaliyetler /></div>;
            case 'Başvurularım':
                return <div>Başvurular yer alacak.</div>;
            case 'Çıkış Yap':
                return handleLogout();
            default:
                return <div><AnaSayfa /></div>;
        }
    };


    return (
        <div className="main-homepage">
            <Header username={username} />
            <SideBar onSelect={setSelectedPage} />
            <div className="flexible-component">
                {renderContent()}
            </div>
        </div>
    );
}

export default HomePage;
