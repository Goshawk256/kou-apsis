import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import HomePage from './home/HomePage';
import Login from './login/Login';
import Finish from './academic/components/pages/finish/Finish';


{/*
  const AxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {

          localStorage.removeItem('accesToken'); navigate('/');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return null;
};
  
*/}

function App() {
  return (
    <Router>
      {/* <AxiosInterceptor /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </Router>
  );
}

export default App;
