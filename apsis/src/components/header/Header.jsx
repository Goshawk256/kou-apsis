import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/themeContext';
import './Header.css';
import logo from '../../assets/unnamed.png';
import logoLight from '../../assets/unnamed.png';
import logoutIcon from '../../assets/log-out.svg'
import { getUserInfoByUsername } from '../../service/user.js';

function Header() {
    const { theme, toggleTheme } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [userInfo, setUserInfo] = useState(null);
    const username = localStorage.getItem('username');


    useEffect(() => {
        setIsLoggedIn(!!username);
    }, [username]);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Yükleme başladığında true yap


                const response = await getUserInfoByUsername(username);
                console.log(response)
                const userInfoData = response?.[0];

                if (userInfoData) {
                    setUserInfo(userInfoData);
                } else {
                    setError('User data not found.');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data');
            } finally {
                setIsLoading(false); // Yükleme tamamlandıktan sonra false yap
            }
        };

        fetchData();
    }, []);


    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    return (
        isLoggedIn ? (
            isLoading ? (
                <div className="loading">

                </div> // Yüklenme sırasında gösterilecek
            ) : (
                <div className={`header-container ${theme}`}>
                    <div className="site-name">
                        {theme === 'dark' ? (
                            <img src={logo} alt="Logo" />
                        ) : (
                            <img src={logoLight} alt="Logo" />
                        )}
                        <span className="shining-text">Kocaeli Üniversitesi Akademik Puan Sistemi</span>
                    </div>
                    <button className="inbox-btn">
                        <svg viewBox="0 0 512 512" height="10" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                            ></path>
                        </svg>
                        <span className="msg-count">0</span>
                    </button>
                    <div className="username">
                        {userInfo?.cvTitle?.primary || ''} {capitalizeName(userInfo.name)} {capitalizeName(userInfo.surname)}
                    </div>
                    <div className="checkbox-wrapper-35">
                        <input
                            value="private"
                            name="themeSwitch"
                            id="themeSwitch"
                            type="checkbox"
                            className="switch"
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                        />
                        <label htmlFor="themeSwitch">
                            <span className="switch-x-toggletext">
                                <span className="switch-x-unchecked">
                                    <span className="switch-x-hiddenlabel">Unchecked: </span>
                                    Aydınlık
                                </span>
                                <span className="switch-x-checked">
                                    <span className="switch-x-hiddenlabel">Checked: </span>
                                    Karanlık
                                </span>
                            </span>
                            <span className="switch-x-text">Tema </span>
                        </label>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        <img src={logoutIcon} alt="Logout" />
                    </button>
                </div>
            )
        ) : null
    );

}

export default Header;
