import axios from 'axios';
import All_Url from '../url';
// Axios yapılandırması
const apiClient = axios.create({
    baseURL: All_Url.api_base_url,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

// Hata yönetimi (global error handling)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Hatası:', error);
        return Promise.reject(error);
    }
);

const apiLogin = axios.create({
    baseURL: All_Url.api_base_url,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});



// Hata yönetimi (global error handling)
apiLogin.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Hatası:', error);
        return Promise.reject(error);
    }
);

export { apiClient, apiLogin };
