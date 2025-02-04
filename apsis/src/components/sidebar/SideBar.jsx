import React from 'react';
import './SideBar.css';

import sanatIcon from '../../assets/artistikFaaliyetler.svg'
import basvuruIcon from '../../assets/basvuru.svg'
import dersIcon from '../../assets/dersler.svg'
import gorevIcon from '../../assets/gorevler.svg'
import homeIcon from '../../assets/home.svg'
import odulIcon from '../../assets/odul.svg'
import yayinIcon from '../../assets/yayinlar.svg'
import tezIcon from '../../assets/yonetilenTezler.svg'


function SideBar({ onSelect }) {

    const items = [
        { name: "Ana Sayfa", icon: <img src={homeIcon} alt="Home" /> },
        { name: "Yayınlarım", icon: <img src={yayinIcon} alt="Yayınlar" /> },
        { name: "Derslerim", icon: <img src={dersIcon} alt="Dersler" /> },
        { name: "Yönetilen Tezler", icon: <img src={tezIcon} alt="Yönetilen Tezler" /> },
        { name: "Proje Görevlerim", icon: <img src={gorevIcon} alt="Görevler" /> },
        { name: "Ödüller", icon: <img src={odulIcon} alt="Ödüller" /> },
        { name: "Sanatsal Faaliyet", icon: <img src={sanatIcon} alt="Sanatsal Faaliyet" /> },
        { name: "Başvuru Yap", icon: <img src={basvuruIcon} alt="Başvurular" /> },

    ];



    return (
        <div className={`sidebar-container`}>
            <div className='sidebar-inner' style={{
                color: '#4cc425', marginLeft: '12px', marginTop: '24px', fontWeight: 'bold', fontSize: '18px'

            }}></div>
            {items.map((item, index) => (
                <button
                    key={index}
                    className="sidebar-button"
                    onClick={() => onSelect(item.name)}
                >
                    {item.name == 'Çıkış Yap' ? (
                        <span style={{ color: '#f47040' }} className="icon">{item.icon}</span>
                    ) : (
                        <span className="icon">{item.icon}</span>
                    )}

                    {item.name == 'Çıkış Yap' ? (
                        <span style={{ color: '#f47040' }} className="text">{item.name}</span>
                    ) : (
                        <span className="text">{item.name}</span>
                    )}

                </button>
            ))}
        </div>
    );
}

export default SideBar;
