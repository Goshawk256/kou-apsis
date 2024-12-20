import React from 'react';
import './SideBar.css';
import { FaHome, FaBook, FaGraduationCap, FaClipboard, FaTasks, FaAward, FaPaintBrush, FaEnvelope, FaBackward } from 'react-icons/fa';

function SideBar({ onSelect }) {
    const items = [
        { name: "Ana Sayfa", icon: <FaHome /> },
        { name: "Yayınlarım", icon: <FaBook /> },
        { name: "Derslerim", icon: <FaGraduationCap /> },
        { name: "Yönetilen Tezler", icon: <FaClipboard /> },
        { name: "Proje Görevlerim", icon: <FaTasks /> },
        { name: "Ödüller", icon: <FaAward /> },
        { name: "Sanatsal Faaliyet", icon: <FaPaintBrush /> },
        { name: "Başvurularım", icon: <FaEnvelope /> },
        { name: "Çıkış Yap", icon: <FaBackward /> }
    ];

    return (
        <div className="sidebar-container">
            <div style={{ color: 'gray', marginLeft: '6%', fontWeight: 'bold' }}>Akış</div>
            {items.map((item, index) => (
                <button
                    key={index}
                    className="sidebar-button"
                    onClick={() => onSelect(item.name)}
                >
                    <span className="icon">{item.icon}</span>
                    <span className="text">{item.name}</span>
                </button>
            ))}
        </div>
    );
}

export default SideBar;
