import { apiClient, apiLogin } from './index.js';


export const getUserInfoByUsername = async (username) => {
    const response = await apiClient.post('/post/users/get-user-info-by-username', { username });
    return response.data;
};

export const login = async (username, pass) => {
    try {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('pass', pass);


        const response = await apiLogin.post('/login_ldap', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
