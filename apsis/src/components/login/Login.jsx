import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../service/user';
import './Login.css';
import Logo from '../../assets/unnamed.png'


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await login(username, password);

            if (result.login) {
                localStorage.setItem('username', result.username);
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
