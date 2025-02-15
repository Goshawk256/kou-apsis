async function getUserInfoByUsername(username) {
    try {
        localStorage.getItem('accessToken');
        const response = await fetch('https://apsis.kocaeli.edu.tr/api/academic/get-me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },

        });

        if (!response.ok) {
            throw new Error('Kullanıcı bilgileri alınamadı');
        }


        return await response.json();
    } catch (error) {
        console.error('getUserInfoByUsername Hata:', error);
        return null;
    }
}

async function getLessonByUsername(username) {
    try {
        const response = await fetch('https://apsis.kocaeli.edu.tr/api/academic/get-lessons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            throw new Error('Ders bilgileri alınamadı');
        }

        return await response.json();
    } catch (error) {
        console.error('getLessonByUsername Hata:', error);
        return null;
    }
}

export { getUserInfoByUsername, getLessonByUsername };
