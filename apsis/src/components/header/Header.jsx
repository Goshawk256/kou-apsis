import React from 'react';
import './Header.css';
import logo from '../../assets/download.svg'

function Header({ username }) {
    return (
        <div className="header-container">
            <div className="site-name">
                <img src={logo} alt="" />
                KOU APSİS
            </div>
            <div className="username">{username}</div>
        </div>
    );
}

export default Header;
