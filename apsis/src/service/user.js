import { apiClient, apiLogin } from './index.js';


export const getUserInfoByUsername = async (username) => {
    try {
        const response = await apiClient.post('/user/get-user-by-username', { username });

        if (response.data.success && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || 'Invalid response format');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

export const getLessonByUsername = async (username) => {
    const response = await apiClient.post('/lesson/get-lesson-by-username', { username });
    return response.data;
};

export const login = async (username, password) => {
    try {
        const payload = {
            username,
            password,
        };

        const response = await apiLogin.post('/user/authenticate', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Login failed');
        }

        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

