import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from 'axios';
import './Login.css';
import Logo from '../../assets/unnamed.png';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchRoles = async (username) => {
        try {
            const response = await axios.post('https://apsis.kocaeli.edu.tr/api/auth/get-roles', { username });
            if (response.data.success) {
                setRoles(response.data.data);
                setSelectedRole(response.data.data[0] || '');
            }
        } catch (error) {
            setError(error);
            throw new AxiosError('Hata', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://apsis.kocaeli.edu.tr/api/auth/login', {
                username,
                password,
                role: selectedRole
            });
            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                localStorage.setItem('username', username);
                navigate('/home');
            }
        } catch (error) {
            setError(error);
            throw new AxiosError('Hata', error);
        }
    };

    return (
        <div className='main-login'>

            <div className='login-form'>
                {error ? (
                    <div>

                    </div>
                ) : (
                    <form onSubmit={handleLogin}>
                        <img style={{ width: "30%" }} src={Logo} alt="" />
                        <h2 style={{ color: 'grey' }}>Kou Apsıs</h2>
                        <div className='form-group'>
                            <label htmlFor='username'>Kullanıcı Adı</label>
                            <input
                                type='text'
                                id='username'
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    fetchRoles(e.target.value);
                                }}
                                required
                            />
                        </div>
                        {roles.length > 0 && (
                            <div className='form-group'>
                                <label htmlFor='role'>Rol Seçin</label>
                                <select className='' id='role' value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                    {roles.map((role, index) => (
                                        <option key={index} value={role}>
                                            {role == 'Academic' ?
                                                (
                                                    'Akademik Giriş'
                                                ) :
                                                (
                                                    'Akademik Jüri'
                                                )
                                            }
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
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
                )}
            </div>
        </div>
    );
}

export default Login;
