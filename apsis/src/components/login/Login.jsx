import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../assets/unnamed.png';
import All_Url from '../../url';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Sayfa yüklendiğinde localStorage'de username varsa /home'a yönlendir
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            navigate('/home');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                username,
                password,
            };

            const response = await fetch(`${All_Url.api_base_url}/user/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('API Hatası:', errorData);
                console.log('Login failed: ' + (errorData.message || 'Invalid credentials'));
                return;
            }

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('username', username);
                navigate('/home');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='main-login'>
            <div className='login-form'>
                <form onSubmit={handleLogin}>
                    <img style={{ width: "30%" }} src={Logo} alt="" />
                    <h2 style={{ color: 'grey' }}>Kou Apsıs</h2>
                    <div className='form-group'>
                        <label htmlFor='username'>Kullanıcı Adı</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Şifre</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className='submit-button-login' type='submit'>Giriş</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
