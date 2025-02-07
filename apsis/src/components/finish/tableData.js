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
  },
  G: {
    title: "G. PATENTLER",
    subtitle: "(Aynı faaliyet sadece bir maddede puanlanır)",
    columnHeaders: ["", "Patent Adı, Yılı", "Puan"]
  },
  H: {
    title: "H. ARAŞTIRMA PROJELERİ",
    subtitle: "(Tamamlanmış veya devam ediyor olmak koşuluyla, projenin en az bir yıl süreli olduğu ve hakem değerlendirilmesinden geçtiği belgelenir ve projenin bütçesi, kabul edildiği yıldaki en son açıklanan memur taban aylık katsayısının en az 5000 katı olmalıdır.)",
    columnHeaders: ["", "Projenin Adı, Proje Numarası, Projenin Yürütüldüğü Kurumun Adı, Yılı", "Puan"]
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

export const groupALabels = [
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q1 olarak taranan dergide)",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q2 olarak taranan dergide)",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q3 olarak taranan dergide)",
  "SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q4 olarak taranan dergide)",
  "ESCI tarafından taranan dergilerde yayımlanmış makale",
  "Scopus tarafından taranan dergilerde yayımlanmış makale",
  "Uluslararası diğer indekslerde taranan dergilerde yayımlanmış makale",
  "ULAKBİM TR Dizin tarafından taranan ulusal hakemli dergilerde yayımlanmış makale",
  "8. madde dışındaki ulusal hakemli dergilerde yayımlanmış makale"
];

export const groupBLabels = [
  "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, tam metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
  "Uluslararası bilimsel toplantılarda sözlü olarak sunulan, özet metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
  "Uluslararası bilimsel toplantılarda poster olarak sunulan çalışmalar",
  "Ulusal bilimsel toplantılarda sözlü olarak sunulan tam metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
  "Ulusal bilimsel toplantılarda sözlü olarak sunulan, özet metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
  "Ulusal bilimsel toplantılarda poster olarak sunulan çalışmalar",
  "Uluslararası bir kongre, konferans veya sempozyumda organizasyon veya yürütme komitesinde düzenleme kurulu üyeliği veya bilim kurulu üyeliği yapmak",
  "Ulusal bir kongre, konferans veya sempozyumda organizasyon veya yürütme komitesinde düzenleme kurulu üyeliği veya bilim kurulu üyeliği yapmak",
  "Uluslararası konferanslarda, bilimsel toplantı, seminerlerde davetli konuşmacı olarak yer almak",
  "Ulusal konferanslarda, bilimsel toplantı, seminerlerde davetli konuşmacı olarak yer almak",
  "Uluslararası veya ulusal çeşitli kurumlarla işbirliği içinde atölye, çalıştay, yaz okulu organize ederek gerçekleştirmek",
  "Uluslararası veya ulusal çeşitli kurumlarla işbirliği içinde atölye, çalıştay, panel, seminer, yaz okulunda konuşmacı veya panelist olarak görev almak"
];

export const groupCLabels = [
  "Uluslararası yayınevleri tarafından yayımlanmış özgün kitap",
  "Uluslararası yayınevleri tarafından yayımlanmış özgün kitap editörlüğü, bölüm yazarlığı (Her bir kitap için maksimum 2 bölüm yazarlığı)",
  "Uluslararası yayımlanan ansiklopedi konusu/maddesi (en fazla 3 madde)",
  "Ulusal yayınevleri tarafından yayımlanmış özgün kitap",
  "Ulusal yayınevleri tarafından yayımlanmış özgün kitap editörlüğü, bölüm yazarlığı (Her bir kitap için maksimum 2 bölüm yazarlığı)",
  "Tam kitap çevirisi (Yayınevleri için ilgili ÜAK kriterleri geçerlidir)",
  "Çeviri kitap editörlüğü, kitap bölümü çevirisi (Yayınevleri için ilgili ÜAK kriterleri geçerlidir) (Her bir kitap için maksimum 2 bölüm çevirisi)",
  "Alanında ulusal yayımlanan ansiklopedi konusu/maddesi (en fazla 3 madde)"
];

export const groupDLabels = [
  "SCI-E, SSCI ve AHCI tarafından taranan dergilerde; Uluslararası yayınevleri tarafından yayımlanmış kitaplarda yayımlanan ve adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için",
  "E-SCI tarafından taranan dergilerde ve adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için",
  "SCI-E, SSCI, AHCI, E-SCI dışındaki diğer uluslararası indeksler tarafından taranan dergilerde; Uluslararası yayınevleri tarafından yayımlanmış kitaplarda bölüm yazarı olarak yayımlanan ve adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için",
  "Ulusal hakemli dergilerde; Ulusal yayınevleri tarafından yayımlanmış kitaplarda yayımlanan ve adayın yazar olarak yer almadığı yayınlardan her birinde, metin içindeki atıf sayısına bakılmaksızın adayın atıf yapılan her eseri için"
];

export const groupELabels = [
  "Önlisans/lisans dersleri",
  "Önlisans/lisans dersleri (Yabancı dilde)",
  "Lisansüstü dersleri",
  "Lisansüstü dersleri (Yabancı dilde)"
];

export const groupFLabels = [
  "Doktora/Sanatta Yeterlik veya Tıpta/Diş Hekimliğinde Uzmanlık tez yönetimi",
  "Yüksek Lisans Tez Yönetimi",
  "Doktora/Sanatta Yeterlik (Eş Danışman)",
  "Yüksek Lisans/Sanatta Yeterlik Tez Yönetimi (Eş Danışman)"
];

export const groupGLabels = [
  "Lisanslanan Uluslararası Patent",
  "Tescillenmiş Uluslararası Patent",
  "Uluslararası Patent Başvurusu",
  "Lisanslanan Ulusal Patent",
  "Tescillenmiş Ulusal Patent",
  "Ulusal Patent Başvurusu",
  "Lisanslanan Faydalı Model, Endüstriyel Tasarım, Marka",
  "Faydalı Model ve Endüstriyel Tasarım"
];

export const groupHLabels = [
  "AB çerçeve programı/NSF/ERC bilimsel araştırma projesinde koordinatör/alt koordinatör olmak",
  "AB çerçeve programı/NSF/ERC bilimsel araştırma projesinde yürütücü olmak",
  "AB çerçeve programı/NSF/ERC bilimsel araştırma projesinde araştırmacı olmak",
  "AB Çerçeve Programı/NSF/ERC bilimsel araştırma projeleri dışındaki uluslararası destekli bilimsel araştırma projelerinde (derleme ve rapor hazırlama çalışmaları hariç) koordinatör/alt koordinatör olmak",
  "AB Çerçeve Programı/NSF/ERC bilimsel araştırma projeleri dışındaki uluslararası destekli bilimsel araştırma projelerinde (derleme ve rapor hazırlama çalışmaları hariç) yürütücü olmak",
  "AB Çerçeve Programı/NSF/ERC bilimsel araştırma projeleri dışındaki uluslararası destekli bilimsel araştırma projelerinde (derleme ve rapor hazırlama çalışmaları hariç) araştırmacı olmak",
  "AB Çerçeve Programı/NSF/ERC bilimsel araştırma projeleri dışındaki uluslararası destekli bilimsel araştırma projelerinde (derleme ve rapor hazırlama çalışmaları hariç) danışman olmak",
  "TÜBİTAK ARGE (ARDEB, TEYDEB) ve TÜSEB projelerinde yürütücü olmak",
  "Diğer TÜBİTAK projelerinde yürütücü olmak",
  "TÜBİTAK dışındaki diğer kamu kurumlarıyla yapılan bilimsel araştırma projelerinde yürütücü olmak",
  "Sanayi kuruluşları ile yapılan Ar-Ge projelerinde yürütücü olmak",
  "Diğer özel kuruluşlar ile yapılan Ar-Ge projelerinde yürütücü olmak",
  "TÜBİTAK ARGE (ARDEB, TEYDEB) ve TÜSEB projelerinde araştırmacı olmak",
  "Diğer TÜBİTAK projelerinde araştırmacı olmak",
  "TÜBİTAK dışındaki diğer kamu kurumlarıyla yapılan bilimsel araştırma projelerinde araştırmacı olmak",
  "Sanayi kuruluşları ile yapılan bilimsel araştırma projelerinde araştırmacı olmak",
  "Diğer özel kuruluşlar ile yapılan bilimsel araştırma projelerinde araştırmacı olmak",
  "TÜBİTAK ARGE (ARDEB, TEYDEB) ve TÜSEB projelerinde danışman olmak",
  "Diğer TÜBİTAK projelerinde danışman olmak",
  "TÜBİTAK dışındaki diğer kamu kurumlarıyla yapılan bilimsel araştırma projelerinde danışman olmak",
  "Sanayi kuruluşları ile yapılan Ar-Ge projelerinde danışman olmak",
  "Diğer özel kuruluşlar ile yapılan Ar-Ge projelerinde danışman olmak",
  "Üniversitelerin bilimsel araştırma projeleri (BAP) koordinatörlükleri destekli araştırma projelerinde (derleme ve rapor hazırlama çalışmaları hariç) yürütücü olmak (Hızlı destek, Altyapı, Lab. ve lisansüstü tez projeleri hariç)",
  "Üniversitelerin bilimsel araştırma projeleri (BAP) koordinatörlükleri destekli araştırma projelerinde araştırmacı olmak (Hızlı destek, Altyapı, Lab. ve lisansüstü tez projeleri hariç)",
  "Üniversitelerin bilimsel araştırma projeleri (BAP) koordinatörlükleri destekli araştırma projelerinde danışman olmak (Hızlı destek, Altyapı, Lab. ve lisansüstü tez projeleri hariç)",
  "En az dört aylık yurtdışı araştırma çalışmasında bulunmak",
  "En az dört aylık yurtiçi araştırma çalışmasında bulunmak"
];