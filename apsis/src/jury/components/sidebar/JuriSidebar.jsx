import React from 'react';
import './JuriSidebar.css';

import dersIcon from '../../../assets/dersler.svg'

import homeIcon from '../../../assets/home.svg'

import yayinIcon from '../../../assets/yayinlar.svg'


function JuriSidebar({ onSelect }) {

    const items = [
        { name: "Ana Sayfa", icon: <img src={homeIcon} alt="Home" /> },


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

export default JuriSidebar;
