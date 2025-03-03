export const saveToLocalStorage = (item, name) => {
  const savedItem = JSON.parse(localStorage.getItem(name)) || [];

  const existingItem = savedItem.find((term) => term.id === item.id);

  if (!existingItem) {
    savedItem.push(item);
    localStorage.setItem(name, JSON.stringify(savedItem));
    showPopup("yayın başarıyla kaydedildi!", "success");
  } else {
    const userConfirmed = confirm(
      "Bu yayın zaten kaydedilmiş. Silmek ister misiniz?"
    );
    if (userConfirmed) {
      const updatedItem = savedItem.filter((term) => term.id !== item.id);
      localStorage.setItem(name, JSON.stringify(updatedItem));
      showPopup("Yayın başarıyla silindi!", "success");
    } else {
      showPopup("Yayın silinmedi.", "info");
    }
  }
};
