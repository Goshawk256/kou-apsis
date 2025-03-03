const saveToLocalStorage = (item, name) => {
  const savedItem = JSON.parse(localStorage.getItem(name)) || [];

  const existingItem = savedItem.find((term) => term.id === item.id);

  if (!existingItem) {
    savedItem.push(item);
    localStorage.setItem(name, JSON.stringify(savedItem));
  } else {
    const userConfirmed = confirm(
      "Bu yayın zaten kaydedilmiş. Silmek ister misiniz?"
    );
    if (userConfirmed) {
      const updatedItem = savedItem.filter((term) => term.id !== item.id);
      localStorage.setItem(name, JSON.stringify(updatedItem));
    } else {
      console.warn("Yayın silinmedi.", "info");
    }
  }
};

export default saveToLocalStorage;
