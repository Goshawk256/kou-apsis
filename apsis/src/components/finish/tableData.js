export const tableHeaders = {
  A: {
    title: "A. Makaleler",
    subtitle: "Başvurulan bilim alanı ile ilgili tam araştırma ve derleme makaleleri",
    columnHeaders: ["", "Yazar/Yazarlar, Makale adı, Dergi adı, Cilt No., Sayfa, Yıl", "Puan"]
  },
  B: {
    title: "B. Bilimsel Toplantı Faaliyetleri",
    columnHeaders: ["", "Yazar/Yazarlar, Bildiri Adı, Konferansın Adı, Yapıldığı Yer, Sayfa Sayıları ve Tarih", "Puan"]
  },
  C: {
    title: "C. Kitaplar",
    subtitle: "(Yabancı dildeki kitapların puanları 1.5 ile çarpıldıktan sonra hesaplama kullanılır)",
    columnHeaders: ["", "Yazar/Yazarlar, Kitap Adı, Yayınevi, Baskı sayısı yayımlandığı Yer, Yıl", "Puan"]
  },
  D: {
    title: "D. Atıflar",
    subtitle: "(Atıf yapan eserlerin belgelenmesi kaydıyla, bu yönetmeliğin Temel İlkeler bölümündeki atıflara ilişkin açıklamalar dikkate alınır)",
    columnHeaders: ["", "Atıfın Yapıldığı Eser, Atıf Sayısı", "Puan"]
  },
  E: {
    title: "E. Eğitim Öğretim Faaliyetleri",
    subtitle: "(Son üç yılda verdiği dersler, Azami 50 puan, doktora ünvanından sonra)",
    columnHeaders: ["", "Dersin Adı, Programın Adı, Dönemi, Yılı", "Puan"]
  },
  F: {
    title: "F. Tez Yöneticiliği",
    subtitle: "(Tamamlanmış olması kaydıyla)",
    columnHeaders: ["", "Öğrenci adı, Tezin Adı, Enstitüsü, Yılı", "Puan"]
  }
};

export const personalInfoFields = [
  {label: "Adı Soyadı (Ünvanı):", key: "fullName"},
  {label: "Tarih:", key: "date"},
  {label: "Başvurulan Birim:", key: "institution"},
  {label: "Başvurduğu Akademik Kadro:", key: "position"}
];

export const calculateSectionTotal = (data, section) => {
  if (!data || !Array.isArray(data)) return 0;
  return data
    .filter(item => item.groupAuto?.includes(section) || item.group?.includes(section))
    .reduce((acc, item) => acc + (item.scoreAuto || item.score || 0), 0)
    .toFixed(2);
};