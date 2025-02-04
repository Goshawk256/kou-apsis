async function getUserInfoByUsername(username) {
    try {
        const response = await fetch('https://apsis.kocaeli.edu.tr/api/user/get-user-by-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
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
        const response = await fetch('https://apsis.kocaeli.edu.tr/api/lesson/get-lesson-by-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
