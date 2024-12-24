// saveToLocalStorage.js
export const saveToLocalStorage = (publication, storageKey) => {
    const savedPublications = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (!savedPublications.some((pub) => pub.id === publication.id)) {
        savedPublications.push(publication);
        localStorage.setItem(storageKey, JSON.stringify(savedPublications));
        return { success: true, message: 'Yayın başarıyla kaydedildi!' };
    } else {
        return { success: false, message: 'Bu yayın zaten kaydedilmiş!' };
    }
};
