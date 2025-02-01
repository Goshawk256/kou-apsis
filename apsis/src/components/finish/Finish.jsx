import React from 'react';
import { jsPDF } from 'jspdf';
import './Finish.css';
import { useState, useEffect } from 'react';


function Finish() {
    const [savedProjects, setSavedProjects] = useState([]);
    const [savedThesis, setSavedThesis] = useState([]);
    const [savedPublications, setSavedPublications] = useState([]);
    const [savedCourses, setSavedCourses] = useState([]);
    const [savedArtworks, setSavedArtworks] = useState([]);
    const [savedAwards, setSavedAwards] = useState([]);

    const [userInfo, setUserInfo] = useState(null);


    const downloadPDF = () => {
        const doc = new jsPDF();

        // Font dosyasını public/fonts klasöründen yükleyin
        doc.addFileToVFS('FreeSerif.ttf', '/fonts/FreeSerif.ttf');
        doc.addFont('FreeSerif.ttf', 'FreeSerif', 'normal');
        doc.setFont('FreeSerif');

        const element = document.querySelector('.table-container');

        // Orijinal stilleri sakla
        const originalStyles = {
            height: element.style.height,
            overflow: element.style.overflow,
        };

        // Scroll kaldır ve tüm içeriği görünür yap
        element.style.height = `${element.scrollHeight}px`;
        element.style.overflow = 'visible';

        // HTML'i PDF'ye çevir
        doc.html(element, {
            callback: function (doc) {
                // Orijinal stilleri geri yükle
                element.style.height = originalStyles.height;
                element.style.overflow = originalStyles.overflow;

                doc.save('basvuru-content.pdf');
            },
            x: 0,
            y: 10,
            html2canvas: {
                scale: 0.174,
                width: element.scrollWidth,
                height: element.scrollHeight,
            },
        });
    };
    const getSelectedStaff = () => {
        const staff = localStorage.getItem('selectedOption');
        return staff;
    }
    useEffect(() => {
        setSavedProjects(JSON.parse(localStorage.getItem('savedProjects')) || []);
        setSavedThesis(JSON.parse(localStorage.getItem('savedThesis')) || []);
        setSavedPublications(JSON.parse(localStorage.getItem('savedPublications')) || []);
        setSavedArtworks(JSON.parse(localStorage.getItem('savedArtworks')) || []);
        setSavedAwards(JSON.parse(localStorage.getItem('savedAwards')) || []);
        setSavedCourses(JSON.parse(localStorage.getItem('savedCourses')) || []);

    }, []);
    useEffect(() => {
        const fetchData = () => {
            try {
                const response = localStorage.getItem('userInfo');
                if (response) {
                    const parsedData = JSON.parse(response); // JSON string'i parse ediyoruz.
                    const userInfoData = parsedData?.[0]; // Dizinin ilk elemanını alıyoruz.
                    if (userInfoData) {
                        setUserInfo(userInfoData);
                    } else {
                        setError('User data not found in array.');
                    }
                } else {
                    setError('User data not found in localStorage.');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data.');
            }
        };

        fetchData();
    }, []);
    const capitalizeName = (name) => {
        const turkishChars = {
            'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
            'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
        };
        const replaceTurkishChars = (char) => turkishChars[char] || char;
        const normalized = name.split('').map(replaceTurkishChars).join('');
        return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
    };


    const renderDataByGroup = (group, name, storedItem) => {

        if (name == 'savedThesis') {
            const filteredData = storedItem.filter(item => item.group === group);

            return (
                <>
                    <td>
                        {filteredData.map((item, index) => (
                            <div key={index}>{item.title}</div>
                        ))}
                    </td>
                    <td>
                        {filteredData
                            .reduce((acc, item) => acc + item.score, 0)
                            .toFixed(2)}
                    </td>
                </>
            );
        }
        else if (name == 'savedPublications') {
            const filteredData = storedItem.filter(item => item.groupAuto === group);

            return (
                <>
                    <td>
                        {filteredData.map((item, index) => (
                            <div key={index}>{item.title}</div>
                        ))}
                    </td>
                    <td>
                        {filteredData
                            .reduce((acc, item) => acc + item.scoreAuto, 0)
                            .toFixed(2)}
                    </td>
                </>
            );
        }

        else if (name == 'savedProjects') {
            const filteredData = storedItem.filter(item => item.group === group);

            return (
                <>
                    <td>
                        {filteredData.map((item, index) => (
                            <div key={index}>{item.projectName}</div>
                        ))}
                    </td>
                    <td>
                        {filteredData
                            .reduce((acc, item) => acc + item.score, 0)
                            .toFixed(2)}
                    </td>
                </>
            );
        }

        else if (name == 'savedAwards') {
            const filteredData = storedItem.filter(item => item.group === group);

            return (
                <>
                    <td>
                        {filteredData.map((item, index) => (
                            <div key={index}>{item.title}</div>
                        ))}
                    </td>
                    <td>
                        {filteredData
                            .reduce((acc, item) => acc + item.score, 0)
                            .toFixed(2)}
                    </td>
                </>
            );
        }

        else if (name == 'savedCourses') {
            const filteredData = storedItem.filter(item => item.grup_adi === group);

            return (
                <>
                    <td>
                        {filteredData.map((item, index) => (
                            <div key={index}>{item.course_name}</div>
                        ))}
                    </td>
                    <td>
                        {filteredData
                            .reduce((acc, item) => acc + item.ders_puani, 0)
                            .toFixed(2)}
                    </td>
                </>
            );
        }

        else if (name == 'savedArtworks') {
            const filteredData = storedItem.filter(item => item.grup_adi === group);
            return (
                <>
                    <td>
                        {filteredData.map((item, index) => (
                            <div key={index}>{item.title}</div>
                        ))}
                    </td>
                    <td>
                        {filteredData
                            .reduce((acc, item) => acc + item.score, 0)
                            .toFixed(2)}
                    </td>
                </>
            );
        }
        else {
            return (
                <>
                    <td>
                        yok
                    </td>
                    <td>
                        -
                    </td>
                </>
            );
        }
    };

    return (
        <div className='finish-main'>
            <div className='table-container'>
                <table className='finish-table'>

                    <thead>
                        <tr>
                            <th colSpan="4" className="table-header">GENEL  PUANLAMA BILGILERI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={1}>Adi Soyadi  (Unvani):</td>
                            <td colSpan={3}>
                                {userInfo ? `${capitalizeName(userInfo.name)} ${capitalizeName(userInfo.surname)}` : 'Veri Bulunamadı'}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={1}>Tarih:</td>
                            <td colSpan={3}>{new Date().toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={1}>Basvurulan Birim:</td>
                            <td colSpan={3}>Kocaeli Üniversitesi  </td>
                        </tr>
                        <tr>
                            <td colSpan={1}>Basvurdugu Akademik Kadro:</td>
                            <td colSpan={3}> {getSelectedStaff()} </td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>Puanlanan Faaliyet Donemi</td>
                        </tr>
                        <tr>
                            <td colSpan={1}>Profesor (Doçent unvanini aldiktan sonraki faaliyetleri esas alinacaktir)</td>
                            <td colSpan={3}>Hayir</td>
                        </tr>
                        <tr>
                            <td colSpan={1}>Doçent (Doktora / Sanatta yeterlik/ tip/dis uzmanlik unvanini aldiktan sonraki faaliyetleri
                                esas alinacaktir)
                            </td>
                            <td colSpan={3}>Hayir</td>
                        </tr>
                        <tr>
                            <td colSpan={1}>Dr. Ogretim Uyesi (Yeniden Atama: Son atama tarihinden basvuru tarihine kadar olmak
                                uzere donem faaliyetleri esas alinacaktir)
                            </td>
                            <td colSpan={3}>Hayir</td>
                        </tr>
                        <tr>
                            <td colSpan={1}>Dr. Ogretim Uyesi (Ilk Atama)</td>
                            <td colSpan={3}>Hayir</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>Etkinlik</td>
                        </tr>



                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>A. Makaleler</strong> Basvurulan bilim alani ile ilgili tam arastirma ve derleme makaleleri (editore mektup, ozet, vaka takdimi, teknik
                                not ve kitap kritigi hariç)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Yazar/Yazarlar, Makale adi, Dergi adi, Cilt No., Sayfa,
                                Yil</td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) SCI-E, SSCI veya AHCI kapsamindaki
                                dergilerde yayimlanmis makale (Q1 olarak
                                taranan dergide)

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) SCI-E, SSCI veya AHCI kapsamindaki
                                dergilerde yayimlanmis makale (Q2 olarak
                                taranan dergide)

                            </td>
                            {
                                renderDataByGroup('A2', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) SCI-E, SSCI veya AHCI kapsamindaki
                                dergilerde yayimlanmis makale (Q3 olarak
                                taranan dergide)

                            </td>
                            {
                                renderDataByGroup('A3', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) SCI-E, SSCI veya AHCI kapsamindaki
                                dergilerde yayimlanmis makale (Q4 olarak
                                taranan dergide)


                            </td>
                            {
                                renderDataByGroup('A4', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) ESCI tarafindan taranan dergilerde
                                yayimlanmis makale


                            </td>
                            {
                                renderDataByGroup('A5', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Scopus tarafindan taranan dergilerde
                                yayimlanmis makale


                            </td>
                            {
                                renderDataByGroup('A6', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Uluslararasi diger indekslerde taranan
                                dergilerde yayimlanmis makale


                            </td>
                            {
                                renderDataByGroup('A7', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) ULAKBIM TR Dizin tarafindan taranan ulusal
                                hakemli dergilerde yayimlanmis makale


                            </td>
                            {
                                renderDataByGroup('A8', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                9) 8. madde disindaki ulusal hakemli dergilerde
                                yayimlanmis makale


                            </td>
                            {
                                renderDataByGroup('A9', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum A


                            </td>
                            <td>
                                <tr>Asgari Kosula Dahil Toplam Puani</tr>
                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedPublications
                                    .filter(item => item.groupAuto.includes('A'))
                                    .reduce((acc, item) => acc + item.scoreAuto, 0)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>B. Bilimsel Toplanti Faaliyetleri</strong>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Yazar/Yazarlar, Bildiri Adi, Konferansin Adi,
                                Yapildigi Yer, Sayfa Sayilari ve Tarih</td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Uluslararasi bilimsel toplantilarda sozlu
                                olarak sunulan, tam metni matbu veya
                                elektronik olarak bildiri kitapçiginda
                                yayimlanmis çalismalar

                            </td>
                            {
                                renderDataByGroup('B1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Uluslararasi bilimsel toplantilarda sozlu
                                olarak sunulan, ozet metni matbu veya
                                elektronik olarak bildiri kitapçiginda
                                yayimlanmis çalismalar

                            </td>
                            {
                                renderDataByGroup('B2', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Uluslararasi bilimsel toplantilarda poster
                                olarak sunulan çalismalar

                            </td>
                            {
                                renderDataByGroup('B3', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Ulusal bilimsel toplantilarda sozlu olarak
                                sunulan tam metni matbu veya elektronik olarak
                                bildiri kitapçiginda yayimlanmis çalismalar


                            </td>
                            {
                                renderDataByGroup('B4', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) Ulusal bilimsel toplantilarda sozlu olarak
                                sunulan, ozet metni matbu veya elektronik
                                olarak bildiri kitapçiginda yayimlanmis
                                çalismalar


                            </td>
                            {
                                renderDataByGroup('B5', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Ulusal bilimsel toplantilarda poster olarak
                                sunulan çalismalar


                            </td>
                            {
                                renderDataByGroup('B6', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Uluslararasi bir kongre, konferans veya
                                sempozyumda organizasyon veya yurutme
                                komitesinde duzenleme kurulu uyeligi veya
                                bilim kurulu uyeligi yapmak


                            </td>
                            {
                                renderDataByGroup('B7', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) Ulusal bir kongre, konferans veya
                                sempozyumda organizasyon veya yurutme
                                komitesinde duzenleme kurulu uyeligi veya
                                bilim kurulu uyeligi yapmak


                            </td>
                            {
                                renderDataByGroup('B8', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                9) Uluslararasi konferanslarda, bilimsel toplanti,
                                seminerlerde davetli konusmaci olarak yer
                                almak


                            </td>
                            {
                                renderDataByGroup('B9', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                10) Ulusal konferanslarda, bilimsel toplanti,
                                seminerlerde davetli konusmaci olarak yer
                                almak


                            </td>
                            {
                                renderDataByGroup('B10', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                11) Uluslararasi veya ulusal çesitli kurumlarla
                                isbirligi içinde atolye, çalistay, yaz okulu
                                organize ederek gerçeklestirmek


                            </td>
                            {
                                renderDataByGroup('B11', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                12) Uluslararasi veya ulusal çesitli kurumlarla
                                isbirligi içinde atolye, çalistay, panel, seminer,
                                yaz okulunda konusmaci veya panelist olarak
                                gorev almak


                            </td>
                            {
                                renderDataByGroup('B12', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum B


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedPublications
                                    .filter(item => item.groupAuto.includes('B'))
                                    .reduce((acc, item) => acc + item.scoreAuto, 0).toFixed(2)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>C. KITAPLAR</strong> (Yabanci dildeki kitaplarin puanlari 1.5 ile çarpildiktan sonra hesaplama kullanilir)
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Yazar/Yazarlar, Kitap Adi, Yayinevi, Baski sayisi
                                yayimlandigi Yer, Yil
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Uluslararasi yayinevleri tarafindan
                                yayimlanmis ozgun kitap

                            </td>
                            {
                                renderDataByGroup('C1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Uluslararasi yayinevleri tarafindan
                                yayimlanmis ozgun kitap editorlugu, bolum
                                yazarligi (Her bir kitap için maksimum 2 bolum
                                yazarligi)

                            </td>
                            {
                                renderDataByGroup('C2', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Uluslararasi yayimlanan ansiklopedi
                                konusu/maddesi (en fazla 3 madde)

                            </td>
                            {
                                renderDataByGroup('C3', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Ulusal yayinevleri tarafindan yayimlanmis
                                ozgun kitap


                            </td>
                            {
                                renderDataByGroup('C4', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) Ulusal yayinevleri tarafindan yayimlanmis
                                ozgun kitap editorlugu, bolum yazarligi (Her bir
                                kitap için maksimum 2 bolum yazarligi)


                            </td>
                            {
                                renderDataByGroup('C5', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Tam kitap çevirisi (Yayinevleri için ilgili UAK
                                kriterleri geçerlidir)


                            </td>
                            {
                                renderDataByGroup('C6', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Ceviri kitap editorlugu, kitap bolumu çevirisi
                                (Yayinevleri için ilgili UAK kriterleri geçerlidir)
                                (Her bir kitap için maksimum 2 bolum çevirisi)

                            </td>
                            {
                                renderDataByGroup('C7', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) Alaninda ulusal yayimlanan ansiklopedi
                                konusu/maddesi (en fazla 3 madde)


                            </td>
                            {
                                renderDataByGroup('C8', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum C


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedPublications
                                    .filter(item => item.groupAuto.includes('C'))
                                    .reduce((acc, item) => acc + item.scoreAuto, 0)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>D. Atiflar</strong> (Atif yapan eserlerin belgelenmesi kaydiyla, bu yonetmeligin Temel Ilkeler bolumundeki atiflara iliskin
                                açiklamalar dikkate alinir)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Atifin Yapildigi Eser, Atif Sayisi
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) SCI-E, SSCI ve AHCI tarafindan taranan
                                dergilerde; Uluslararasi yayinevleri tarafindan
                                yayimlanmis kitaplarda yayimlanan ve adayin
                                yazar olarak yer almadigi yayinlardan her
                                birinde, metin içindeki atif sayisina
                                bakilmaksizin adayin atif yapilan her eseri için

                            </td>
                            {
                                renderDataByGroup('D1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) E-SCI tarafindan taranan dergilerde ve
                                adayin yazar olarak yer almadigi yayinlardan
                                her birinde, metin içindeki atif sayisina
                                bakilmaksizin adayin atif yapilan her eseri için

                            </td>
                            {
                                renderDataByGroup('D2', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) SCI-E, SSCI, AHCI, E-SCI disindaki diger
                                uluslararasi indeksler tarafindan taranan
                                dergilerde; Uluslararasi yayinevleri tarafindan
                                yayimlanmis kitaplarda bolum yazari olarak
                                yayimlanan ve adayin yazar olarak yer almadigi
                                yayinlardan her birinde, metin içindeki atif
                                sayisina bakilmaksizin adayin atif yapilan her
                                eseri için

                            </td>
                            {
                                renderDataByGroup('D3', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Ulusal hakemli dergilerde; Ulusal yayinevleri
                                tarafindan yayimlanmis kitaplarda yayimlanan
                                ve adayin yazar olarak yer almadigi
                                yayinlardan her birinde, metin içindeki atif
                                sayisina bakilmaksizin adayin atif yapilan her
                                eseri için


                            </td>
                            {
                                renderDataByGroup('D4', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum D


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedPublications
                                    .filter(item => item.groupAuto.includes('D'))
                                    .reduce((acc, item) => acc + item.scoreAuto, 0)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>E. EGITIM OGRETIM FAALIYETLERI</strong> (Son uç yilda verdigi dersler, Azami 50 puan, doktora unvanindan sonra)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Dersin Adi, Programin Adi, Donemi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Onlisans /lisans dersler

                            </td>
                            {
                                renderDataByGroup('E1', 'savedCourses', savedCourses)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Onlisans/lisans dersleri (Yabanci dilde)

                            </td>
                            {
                                renderDataByGroup('E2', 'savedCourses', savedCourses)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Lisansustu dersleri

                            </td>
                            {
                                renderDataByGroup('E3', 'savedCourses', savedCourses)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Lisansustu dersleri (Yabanci dilde)


                            </td>
                            {
                                renderDataByGroup('E4', 'savedCourses', savedCourses)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum E


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedCourses
                                    .filter(item => item.grup_adi.includes('E'))
                                    .reduce((acc, item) => acc + item.ders_puani, 0)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>F. TEZ YONETICILIGI</strong> (Tamamlanmis olmasi kaydiyla)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Ogrenci adi, Tezin Adi, Enstitusu, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Doktora/Sanatta Yeterlik veya
                                Tipta/Dis Hekimliginde Uzmanlik tez
                                yonetimi

                            </td>
                            {
                                renderDataByGroup('F1', 'savedThesis', savedThesis)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Yuksek Lisans Tez Yonetimi

                            </td>
                            {
                                renderDataByGroup('F2', 'savedThesis', savedThesis)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Doktora/Sanatta Yeterlik (Es
                                Danisman)

                            </td>
                            {
                                renderDataByGroup('F3', 'savedThesis', savedThesis)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Yuksek Lisans/Sanatta Yeterlik Tez
                                Yonetimi (Es Danisman)



                            </td>
                            {
                                renderDataByGroup('F4', 'savedThesis', savedThesis)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum F


                            </td>
                            <td>
                                <tr>Asgari Kosula Dahil Toplam Puani</tr>
                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedThesis
                                    .filter(item => item.group.includes('F'))
                                    .reduce((acc, item) => acc + item.score, 0)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>G. PATENTLER</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Patent Adi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Lisanslanan Uluslararasi Patent

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Tescillenmis Uluslararasi Patent

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Uluslararasi Patent Basvurusu

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Lisanslanan Ulusal Patent

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) Tescillenmis Ulusal Patent



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Ulusal Patent Basvurusu



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Lisanslanan Faydali Model, Endustriyel
                                Tasarim, Marka



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) Faydali Model ve Endustriyel Tasarim



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum G


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td></td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>H. ARASTIRMA PROJELERI</strong> (Tamamlanmis veya devam ediyor olmak kosuluyla, projenin en az bir yil sureli oldugu
                                ve hakem degerlendirilmesinden geçtigi belgelenir ve projenin butçesi, kabul edildigi yildaki en son açiklanan memur
                                taban aylik katsayisinin en az 5000 kati olmalidir.)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Projenin Adi, Proje Numarasi, Projenin Yurutuldugu
                                Kurumun Adi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) AB çerçeve programi/NSF/ERC bilimsel
                                arastirma projesinde koordinator/alt koordinator
                                olmak

                            </td>
                            {
                                renderDataByGroup('H1', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) AB çerçeve programi/NSF/ERC bilimsel
                                arastirma projesinde yurutucu olmak

                            </td>
                            {
                                renderDataByGroup('H2', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) AB çerçeve programi/NSF/ERC bilimsel
                                arastirma projesinde arastirmaci olmak

                            </td>
                            {
                                renderDataByGroup('H3', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) AB Cerçeve Programi/NSF/ERC bilimsel
                                arastirma projeleri disindaki uluslararasi
                                destekli bilimsel arastirma projelerinde (derleme
                                ve rapor hazirlama çalismalari hariç)
                                koordinator/alt koordinator olmak



                            </td>
                            {
                                renderDataByGroup('H4', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) AB Cerçeve Programi/NSF/ERC bilimsel
                                arastirma projeleri disindaki uluslararasi
                                destekli bilimsel arastirma projelerinde (derleme
                                ve rapor hazirlama çalismalari hariç) yurutucu
                                olmak


                            </td>
                            {
                                renderDataByGroup('H5', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) AB Cerçeve Programi/NSF/ERC bilimsel
                                arastirma projeleri disindaki uluslararasi
                                destekli bilimsel arastirma projelerinde (derleme
                                ve rapor hazirlama çalismalari hariç)
                                arastirmaci olmak


                            </td>
                            {
                                renderDataByGroup('H6', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) AB Cerçeve Programi/NSF/ERC bilimsel
                                arastirma projeleri disindaki uluslararasi
                                destekli bilimsel arastirma projelerinde (derleme
                                ve rapor hazirlama çalismalari hariç) danisman
                                olmak



                            </td>
                            {
                                renderDataByGroup('H7', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) TUBITAK ARGE (ARDEB, TEYDEB) ve
                                TUSEB projelerinde yurutucu olmak



                            </td>
                            {
                                renderDataByGroup('H8', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                9) Diger TUBITAK projelerinde yurutucu olmak



                            </td>
                            {
                                renderDataByGroup('H9', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                10) TUBITAK disindaki diger kamu kurumlariyla
                                yapilan bilimsel arastirma projelerinde yurutucu
                                olmak



                            </td>
                            {
                                renderDataByGroup('H10', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                11) Sanayi kuruluslari ile yapilan Ar-Ge
                                projelerinde yurutucu olmak



                            </td>
                            {
                                renderDataByGroup('H11', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                12) Diger ozel kuruluslar ile yapilan Ar-Ge
                                projelerinde yurutucu olmak



                            </td>
                            {
                                renderDataByGroup('H12', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                13) TUBITAK ARGE (ARDEB, TEYDEB) ve
                                TUSEB projelerinde arastirmaci olmak



                            </td>
                            {
                                renderDataByGroup('H13', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                14) Diger TUBITAK projelerinde arastirmaci
                                olmak



                            </td>
                            {
                                renderDataByGroup('H14', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                15) TUBITAK disindaki diger kamu kurumlariyla
                                yapilan bilimsel arastirma projelerinde
                                arastirmaci olmak



                            </td>
                            {
                                renderDataByGroup('H15', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                16) Sanayi kuruluslari ile yapilan bilimsel
                                arastirma projelerinde arastirmaci olmak



                            </td>
                            {
                                renderDataByGroup('H16', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                17) Diger ozel kuruluslar ile yapilan bilimsel
                                arastirma projelerinde arastirmaci olmak



                            </td>
                            {
                                renderDataByGroup('H17', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                18) TUBITAK ARGE (ARDEB, TEYDEB) ve
                                TUSEB projelerinde danisman olmak



                            </td>
                            {
                                renderDataByGroup('H18', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                19) Diger TUBITAK projelerinde danisman
                                olmak



                            </td>
                            {
                                renderDataByGroup('H19', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                20) TUBITAK disindaki diger kamu kurumlariyla
                                yapilan bilimsel arastirma projelerinde
                                danisman olmak



                            </td>
                            {
                                renderDataByGroup('H20', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                21) Sanayi kuruluslari ile yapilan Ar-Ge
                                projelerinde danisman olmak



                            </td>
                            {
                                renderDataByGroup('H21', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                22) Diger ozel kuruluslar ile yapilan Ar-Ge
                                projelerinde danisman olmak



                            </td>
                            {
                                renderDataByGroup('H22', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                23) Universitelerin bilimsel arastirma projeleri
                                (BAP) koordinatorlukleri destekli arastirma
                                projelerinde (derleme ve rapor hazirlama
                                çalismalari hariç) yurutucu olmak (Hizli destek,
                                Altyapi, Lab. ve lisansustu tez projeleri hariç)



                            </td>
                            {
                                renderDataByGroup('H23', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                24) Universitelerin bilimsel arastirma projeleri
                                (BAP) koordinatorlukleri destekli arastirma
                                projelerinde arastirmaci olmak (Hizli destek,
                                Altyapi, Lab. ve lisansustu tez projeleri hariç)



                            </td>
                            {
                                renderDataByGroup('H24', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                25) Universitelerin bilimsel arastirma projeleri
                                (BAP) koordinatorlukleri destekli arastirma
                                projelerinde danisman olmak (Hizli destek,
                                Altyapi, Lab. ve lisansustu tez projeleri hariç)



                            </td>
                            {
                                renderDataByGroup('H25', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                26) En az dort aylik yurtdisi arastirma
                                çalismasinda bulunmak



                            </td>
                            {
                                renderDataByGroup('H26', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>
                            <td>
                                27) En az dort aylik yurtiçi arastirma
                                çalismasinda bulunmak



                            </td>
                            {
                                renderDataByGroup('H27', 'savedProjects', savedProjects)
                            }
                        </tr>
                        <tr>

                            <td>
                                Bolum H


                            </td>
                            <td>
                                <tr>Asgari Kosula Dahil Toplam Puani</tr>
                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedProjects
                                    .filter(item => item.group.includes('H'))
                                    .reduce((acc, item) => acc + item.score, 0)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>I. EDITORLUK, YAYIN KURULU UYELIGI VE HAKEMLIK FAALIYETLERI</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Derginin Adi, Sayisi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) SCI-E, SSCI, AHCI veya E-SCI
                                kapsamindaki dergilerde bas editorluk
                                gorevinde bulunmak

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) SCI-E, SSCI, AHCI veya E-SCI
                                kapsamindaki dergilerde yardimci/ortak
                                editorluk gorevinde bulunmak

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) SCI-E, SSCI, AHCI veya E-SCI
                                kapsamindaki dergilerde asistan editorluk
                                gorevinde bulunmak

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) SCI-E, SSCI, AHCI veya E-SCI
                                kapsamindaki dergilerde yayin kurulu uyelig



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) SCI-E, SSCI, AHCI veya E-SCI kapsami
                                disindaki uluslararasi diger indeksler tarafindan
                                taranan dergilerde bas editorluk gorevinde
                                bulunmak



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) SCI-E, SSCI, AHCI veya E-SCI kapsami
                                disindaki uluslararasi diger indeksler tarafindan
                                taranan dergilerde yardimci/ortak editorluk
                                gorevinde bulunmak



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) SCI-E, SSCI, AHCI veya E-SCI kapsami
                                disindaki uluslararasi diger indeksler tarafindan
                                taranan dergilerde asistan editorluk gorevinde
                                bulunmak



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) SCI-E, SSCI, AHCI veya E-SCI kapsami
                                disindaki uluslararasi diger indeksler tarafindan
                                taranan dergilerde yayin kurulu uyeligi



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                9) ULAKBIM tarafindan taranan dergilerde bas
                                editorluk gorevi



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                10) ULAKBIM tarafindan taranan dergilerde
                                yayin kurulu uyeligi



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                11) SCI-E, SSCI veya AHCI kapsamindaki
                                dergilerde tamamlanmis hakemlik faaliyeti (her
                                bir hakemlik faaliyeti basina)



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                12) SCI-E, SSCI veya AHCI kapsami disindaki
                                uluslararasi diger indeksler tarafindan dergilerde tamamlanmis hakemlik faaliyeti (her
                                bir hakemlik faaliyeti basina)



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                13) ULAKBIM tarafindan taranan dergilerde
                                hakemlik faaliyeti (her bir hakemlik faaliyeti
                                basina)



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>

                        <tr>
                            <td>
                                Bolum I


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td></td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>J. ODULLER</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Odulun Veren Kurul/Kurumun Adi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Surekli ve Periyodik olarak Jurili uluslararasi
                                bilim ve sanat odulleri

                            </td>
                            {
                                renderDataByGroup('J1', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) TUBITAK tarafindan verilen Bilim, Ozel ve
                                Hizmet Odulleri

                            </td>
                            {
                                renderDataByGroup('J2', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) TUBA tarafindan verilen Akademi Odulleri


                            </td>
                            {
                                renderDataByGroup('J3', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) TUBITAK tarafindan verilen Tesvik Odulu
                                (Yayin tesvik odulu hariç)



                            </td>
                            {
                                renderDataByGroup('J4', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) TUBA tarafindan verilen GEBIP ve TESEP
                                odulleri



                            </td>
                            {
                                renderDataByGroup('J5', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Surekli ve Periyodik olarak Jurili ulusal bilim
                                ve sanat odulleri



                            </td>
                            {
                                renderDataByGroup('J6', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Surekli ve periyodik olarak verilen ve bir juri
                                degerlendirmesine tabi olmayan
                                uluslararasi/ulusal oduller



                            </td>
                            {
                                renderDataByGroup('J7', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) Uluslararasi hakemli yarismalarda birincilik
                                derecesi



                            </td>
                            {
                                renderDataByGroup('J8', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                9) Uluslararasi hakemli yarismalarda ikincilik
                                derecesi



                            </td>
                            {
                                renderDataByGroup('J9', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                10) Uluslararasi hakemli yarismalarda
                                uçunculuk derecesi



                            </td>
                            {
                                renderDataByGroup('J10', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                11) Ulusal hakemli yarismalarda birincilik
                                derecesi



                            </td>
                            {
                                renderDataByGroup('J11', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                12) Ulusal hakemli yarismalarda ikincilik
                                derecesi



                            </td>
                            {
                                renderDataByGroup('J12', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                13) Ulusal hakemli yarismalarda uçunculuk odul
                                derecesi



                            </td>
                            {
                                renderDataByGroup('J13', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                14) Uluslararasi bilimsel toplantilarda alinan
                                oduller



                            </td>
                            {
                                renderDataByGroup('J14', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                15) Ulusal bilimsel toplantilarda alinan oduller



                            </td>
                            {
                                renderDataByGroup('J15', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                16) Sanat, tasarim ve mimarlik alanlarinda
                                Uluslararasi hakemli yarismalarda alinan
                                oduller



                            </td>
                            {
                                renderDataByGroup('J16', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                17) Sanat, tasarim ve mimarlik alanlarinda
                                Ulusal hakemli yarismalarda alinan oduller



                            </td>
                            {
                                renderDataByGroup('J17', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                18) KOU Kurumsal odulleri ( universite
                                genelinde ilgili alanda (makale, patent, proje, vb
                                dereceye girenler)



                            </td>
                            {
                                renderDataByGroup('J18', 'savedAwards', savedAwards)
                            }
                        </tr>
                        <tr>
                            <td>
                                19) Kitap veya makale gibi bilimsel
                                eserlere atfedilen oduller


                            </td>
                            {
                                renderDataByGroup('J19', 'savedAwards', savedAwards)
                            }
                        </tr>

                        <tr>
                            <td>
                                Bolum J


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td>
                                {savedAwards
                                    .filter(item => item.group.includes('J'))
                                    .reduce((acc, item) => acc + item.score, 0)
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>K. IDARI GOREVLER VE UNIVERSITEYE KATKI FAALIYETLERI </strong>
                                (Idari gorevlerde vekaleten de olsa en az 6 ay gorev yapmis olmak, ayni anda birden fazla idari gorevi olanlar için en
                                yuksek puan dikkate alinir ve normal suresi dolup yeniden atamalar ayrica puanlanir. Bu kisimda en fazla 50 puan
                                dikkate alinir)
                            </td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Gorev Birimi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1)Dekan/Enstitu/Yuksekokul/MYO/Merkez
                                Muduru

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Enstitu Mudur Yrd. / Dekan Yrd. / Merkez
                                Muduru Yrd./Bolum Baskani

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Bolum Baskan Yrd. / Anabilim Dali Baskani


                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Rektorlukçe gorevlendirilen Koordinatorluk



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) Rektorlukçe gorevlendirilen Koordinator
                                Yardimcilari



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Rektorlukçe gorevlendirilen universite
                                duzeyinde Komisyon/Kurul uyelikleri



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Dekanlik/Y.O. Mudurlugu/MYO Mudurlugu
                                /Konservatuvar Mudurlugu tarafindan
                                gorevlendirilen Komisyon/Kurul uyelikleri



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) Bolum Baskanliklari tarafindan
                                gorevlendirilen Komisyon/Kurul uyelikleri



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                9)Rektorluk/Dekanlik/Y.O. Mudurlugu/MYO
                                Mudurlugu /Konservatuvar Mudurlugu/ Bolum
                                Baskanligi gorevlendirmeleriyle kurum içi ve
                                disi egitim, isbirligi vb konularda katki saglamak



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                10) Uluslararasi nitelikteki bilimsel ve mesleki
                                kurum/kuruluslarin yonetimlerinde, kurullarinda,
                                komisyon veya komitelerinde gorev almak



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                11) Ulusal nitelikteki bilimsel ve mesleki
                                kurum/kuruluslarin yonetimlerinde, kurullarinda,
                                komisyon veya komitelerinde gorev almak



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                12) Yerel nitelikteki bilimsel ve mesleki
                                kurum/kuruluslarin yonetimlerinde, kurullarinda,
                                komisyon veya komitelerinde gorev almak



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                Bolum K


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td></td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>L. SANAT VE TASARIM ALANLARI </strong>
                                (Kurumsal ve Uygulama Alanlari)
                            </td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Faaliyet Adi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Ozgun sanat eserlerinin, tasarim veya yorum
                                çalismalarinin yurtdisinda sanat, egitim ve
                                kultur kurumlarinca satin alinmasi, (Eser basina
                                puanlama yapilir)

                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Ozgun sanat eserlerinin, tasarim veya yorum
                                çalismalarinin yurt içinde sanat, egitim ve kultur
                                kurumlarinca satin alinmasi, (Eser basina
                                puanlama yapilir)
                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Yerel Yonetimler veya Ozel Kuruluslarin
                                destekledigi kamusal alanda kalici olarak
                                gerçeklestirilen sanat projeleri (Anit Heykel,
                                Duvar Resmi / Graffiti, Enstalasyon )


                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Galerilerde, muzelerde, sanat ve kultur
                                merkezlerinde gerçeklestirilen Kuratorluk
                                etkinlikleri (En fazla iki kez puanlanir)



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) Ozgun sanat eserleri, tasarimlar ya da
                                yorum/icra çalismalariyla yurtdisinda
                                uluslararasi jurili kisisel etkinlikte (sergi, bienal,
                                sempozyum, trienal, gosteri, kareografi,
                                performans, resital, dinleti, konser,
                                kompozisyon, orkestra sefligi, festival, gosterim)
                                bizzat katilim saglayarak bulunmak. Her bir
                                etkinlik için;



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Ozgun sanat eserleri, tasarimlar ya da
                                yorum/icra çalismalariyla yurtiçinde jurili kisisel
                                etkinlikte (sergi, bienal, sempozyum, trienal,
                                gosteri, kareografi, performans, resital, dinleti,
                                konser, kompozisyon, orkestra sefligi, festival,
                                gosterim) bizzat katilim saglayarak bulunmak.
                                Her bir etkinlik için;



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Ozgun sanat eserleri, tasarimlar ya da
                                yorum/icra çalismalariyla yurtdisinda
                                uluslararasi jurili karma-ortak etkinlikte (sergi,
                                bienal, sempozyum, trienal, gosteri, kareografi,
                                performans, resital, dinleti, konser,
                                kompozisyon, orkestra sefligi, festival, gosterim)
                                bizzat katilim saglayarak bulunmak. Her bir
                                etkinlik için;



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) Ozgun sanat eserleri, tasarimlar ya da
                                yorum/icra çalismalariyla yurtiçinde ulusal jurili
                                karma-ortak etkinlikte (sergi, bienal,
                                sempozyum, trienal, gosteri, kareografi,
                                performans, resital, dinleti, konser,
                                kompozisyon, orkestra sefligi, festival, gosterim)
                                bizzat katilim saglayarak bulunmak. Her bir
                                etkinlik için;



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                9) Uluslararasi çalistay/workshoplarda (atolye
                                çalismasi) yoneticilik veya yurutuculuk



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                10) Ulusal çalistay/workshoplarda (atolye
                                çalismasi) yoneticilik veya yurutuculuk


                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                11) Uluslararasi çalistay/workshoplarda (atolye
                                çalismasi) arastirmacilik/kurul uyeligi



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                12) Ulusal çalistay/workshoplarda (atolye
                                çalismasi) arastirmacilik/kurul uyeligi



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                13) Uluslararasi yarismalarda juri uyeligi



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                14) Ulusal yarismalarda juri uyeligi



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                15) Uretilen eserlerin uluslararasi haber veya
                                yayin organlarinda yer almasi veya gosterime
                                ya da dinletime girmesi (her bir haber için ayri
                                puanlanir ve 5 haber ile sinirlidir)



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>
                        <tr>
                            <td>
                                16) Uretilen eserlerin ulusal haber veya yayin
                                organlarinda yer almasi veya gosterime ya da
                                dinletime girmesi (her bir haber için ayri
                                puanlanir ve 5 haber ile sinirlidir)



                            </td>
                            {
                                renderDataByGroup('A1', 'savedPublications', savedPublications)
                            }
                        </tr>

                        <tr>
                            <td>
                                Bolum L


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td></td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>
                    <thead>
                        <tr>
                            <td colSpan="4" className="table-header"> <strong>M. KONSERVATUVAR </strong>
                                (Kurumsal ve Uygulama Alanlari, Devlet Konservatuvari Muzikoloji Bolumu / Muzik Bolumu /
                                Turk Muzigi Bolumu)
                            </td>

                        </tr>
                        <tr>
                            <td colSpan="4">M-1. KONSERLER (Konser salonu huviyetinde, onceden ilan edilmis, programi basilmis, kurum onayli)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Faaliyet Adi, Yili
                            </td>
                            <td>Puan</td>
                        </tr>
                        <tr>
                            <td>
                                1) Uluslararasi resital icra etmek

                            </td>
                            {
                                renderDataByGroup('M1', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                2) Uluslararasi Konserlerde, Orkestra, Koro,
                                Geleneksel Topluluklar konserinde solist icraci
                                olarak yer almak
                            </td>
                            {
                                renderDataByGroup('M2', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                3) Uluslararasi Konserlerde, Orkestra, Koro,
                                Geleneksel Topluluklar konserinde karma icraci
                                olarak yer almak


                            </td>
                            {
                                renderDataByGroup('M3', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                4) Uluslararasi Konserlerde, Orkestra Sefligi,
                                Muzik Toplulugu Sefligi ve Koro Sefligi



                            </td>
                            {
                                renderDataByGroup('M4', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                5) Uluslararasi Konserlerde, Oda Muzigi
                                Konserinde icraci olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M5', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                6) Uluslararasi Konserlerde, Orkestra
                                Konserinde Grup Sefi olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M6', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                7) Uluslararasi Konserlerde, Orkestra
                                Konserinde Grup Uyesi olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M7', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                8) Uluslararasi Konserlerde, Resital veya koro
                                konserinde eslikçi olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M8', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                9) Uluslararasi Konserlerde, Konser
                                yonetmenligi / dinleti koordinatorlugu



                            </td>
                            {
                                renderDataByGroup('M9', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                10) Ulusal resital icra etmek


                            </td>
                            {
                                renderDataByGroup('M10', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                11) Ulusal Konserlerde, Orkestra veya koro
                                konserinde icraci olarak bireysel dinletide
                                bulunmak



                            </td>
                            {
                                renderDataByGroup('M11', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                12) Ulusal Konserlerde, Orkestra veya koro
                                konserinde icraci olarak karma dinletide
                                bulunmak



                            </td>
                            {
                                renderDataByGroup('M12', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                13) Ulusal Konserlerde, Orkestra Sefligi, Muzik
                                Toplulugu Sefligi ve Koro Sefligi



                            </td>
                            {
                                renderDataByGroup('M13', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                14) Ulusal Konserlerde, Oda Muzigi Konserinde
                                icraci olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M14', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                15) Ulusal Konserlerde, Orkestra Konserinde
                                Grup Sefi olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M15', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                16) Ulusal Konserlerde, Orkestra Konserinde
                                Grup Uyesi olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M16', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                17) Ulusal Konserlerde, Resital veya koro
                                konserinde eslikçi olarak yer almak



                            </td>
                            {
                                renderDataByGroup('M17', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                18) Ulusal Konserlerde, Konser yonetmenligi /
                                dinleti koordinatorlugu



                            </td>
                            {
                                renderDataByGroup('M18', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td colSpan="4">
                                M-2. SESLI VE GORSEL ETKINLIKLER VE SESLI YAYINLAR Kultur Bakanligi bandrolu, muadili basili veya elektronik
                                olarak (spotify, itunes, amazon music, deezer…vb platformlarda) ulusal veya uluslararasi statude basilmis ve erisime
                                sunulmus.



                            </td>

                        </tr>
                        <tr>
                            <td>
                                19) Uluslararasi sesli ve gorsel etkinlikler ve
                                sesli yayinlar, icraci, besteci, orkestra sefi,
                                muzik toplulugu sefi veya koro sefi olarak
                                bireysel ses yayini



                            </td>
                            {
                                renderDataByGroup('M19', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                20) Uluslararasi sesli ve gorsel etkinlikler ve
                                sesli yayinlar, icraci, besteci, orkestra sefi,
                                muzik toplulugu sefi veya koro sefi olarak
                                karma ses yayini



                            </td>
                            {
                                renderDataByGroup('M20', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                21) Uluslararasi sesli ve gorsel etkinlikler ve
                                sesli yayinlar, Genel Sanat Yonetmeni/Muzik
                                yonetmeni olarak ses yayini hazirlamak


                            </td>
                            {
                                renderDataByGroup('M21', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                22) Uluslararasi sesli ve gorsel etkinlikler ve
                                sesli yayinlar, Radyo ve TV Etkinligi - Program
                                Hazirlamak



                            </td>
                            {
                                renderDataByGroup('M22', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                23) Uluslararasi sesli ve gorsel etkinlikler ve
                                sesli yayinlar, Radyo ve TV Etkinligi
                                Katilimciligi - Bireysel



                            </td>
                            {
                                renderDataByGroup('M23', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                24) Uluslararasi sesli ve gorsel etkinlikler ve
                                sesli yayinlar, Radyo ve TV Etkinligi
                                Katilimciligi - Karma



                            </td>
                            {
                                renderDataByGroup('M24', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                25) Ulusal sesli ve gorsel etkinlikler ve sesli
                                yayinlar, Icraci, besteci, orkestra sefi, muzik
                                toplulugu sefi veya koro sefi olarak bireysel ses
                                yayini



                            </td>
                            {
                                renderDataByGroup('M25', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                26) Ulusal sesli ve gorsel etkinlikler ve sesli
                                yayinlar, Icraci, besteci, orkestra sefi, muzik
                                toplulugu sefi veya koro sefi olarak karma ses
                                yayini



                            </td>
                            {
                                renderDataByGroup('M26', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                27) Ulusal sesli ve gorsel etkinlikler ve sesli
                                yayinlar, Genel Sanat Yonetmeni/Muzik
                                yonetmeni olarak ses yayini hazirlamak


                            </td>
                            {
                                renderDataByGroup('M27', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                28) Ulusal sesli ve gorsel etkinlikler ve sesli
                                yayinlar, Radyo ve TV Etkinligi - Program
                                Hazirlamak



                            </td>
                            {
                                renderDataByGroup('M28', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                29) Ulusal sesli ve gorsel etkinlikler ve sisli
                                yayinlar, Radyo ve TV Etkinligi Katilimciligi -
                                Bireysel



                            </td>
                            {
                                renderDataByGroup('M29', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                30) Ulusal sesli ve gorsel etkinlikler ve sisli
                                yayinlar, Radyo ve TV Etkinligi Katilimciligi -
                                Karma



                            </td>
                            {
                                renderDataByGroup('M30', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td colSpan="4">
                                M-3. ALANA ILISKIN MUZIKAL URETIM / MUZIKAL YAYIN
                                Bunyesinde Muzik Teorisi elemanlarini (armoni, kontrpuan, form, orkestrasyon vb...) teknik, suresel ve estetik
                                yeterliklerle bulunduran yazilmis muzikal kompozisyonlar, derlemeler ve ses yayinlari



                            </td>

                        </tr>
                        <tr>
                            <td>
                                31) Ulusal Orkestra Için Bestelenmis Eser (4’lu,
                                3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi) 0 – 5
                                dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M31', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                32) Ulusal Orkestra Için Bestelenmis Eser (4’lu,
                                3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi) 5 –
                                10 dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M32', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                33) Ulusal Orkestra Için Bestelenmis Eser (4’lu,
                                3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi) 10 –
                                15 dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M33', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                34) Ulusal Orkestra Için Bestelenmis Eser (4’lu,
                                3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi) 15
                                ve uzeri dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M34', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                35) Ulusal Oda Muzigi (Karma Oda Muzigi,
                                Vokal Muzik, Solo Calgi Muzikleri) 0 – 5
                                dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M35', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                36) Ulusal Oda Muzigi (Karma Oda Muzigi,
                                Vokal Muzik, Solo Calgi Muzikleri) 5
                                – 10
                                dakikalik eser sahibi olmak


                            </td>
                            {
                                renderDataByGroup('M36', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                37) Ulusal Oda Muzigi (Karma Oda Muzigi,
                                Vokal Muzik, Solo Calgi Muzikleri) 10
                                – 15
                                dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M37', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                38) Ulusal Oda Muzigi (Karma Oda Muzigi,
                                Vokal Muzik, Solo Calgi Muzikleri) 15 ve uzeri
                                dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M38', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                39) Ulusal Elektronik ve Elektro
                                – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 0
                                – 5 dakikalik
                                eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M39', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                40) Ulusal Elektronik ve Elektro
                                – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 5
                                – 10 dakikalik
                                eser sahibi olmak


                            </td>
                            {
                                renderDataByGroup('M40', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                41) Ulusal Elektronik ve Elektro
                                – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 10
                                – 15 dakikalik
                                eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M41', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                42) Ulusal Elektronik ve Elektro
                                – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 15 ve uzeri
                                dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M42', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                43) Uluslararasi Orkestra Için Bestelenmis Eser
                                (4’lu, 3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi)
                                0
                                – 5 dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M43', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                44) Uluslararasi Orkestra Için Bestelenmis Eser
                                (4’lu, 3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi)
                                5
                                – 10 dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M44', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                45) Uluslararasi Orkestra Için Bestelenmis Eser
                                (4’lu, 3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi)
                                10
                                – 15 dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M45', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                46) Uluslararasi Orkestra Için Bestelenmis Eser
                                (4’lu, 3’lu, 2’li, Oda ve Yayli Calgilar Orkestrasi)
                                15 ve uzeri dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M46', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                47) Uluslararasi Oda Muzigi (Karma Oda
                                Muzigi, Vokal Muzik, Solo Calgi Muzikleri) 0
                                – 5
                                dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M47', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                48) Uluslararasi Oda Muzigi (Karma Oda
                                Muzigi, Vokal Muzik, Solo Calgi Muzikleri) 5
                                –
                                10 dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M48', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                49) Uluslararasi Oda Muzigi (Karma Oda
                                Muzigi, Vokal Muzik, Solo Calgi Muzikleri) 10
                                –
                                15 dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M49', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                50) Uluslararasi Oda Muzigi (Karma Oda
                                Muzigi, Vokal Muzik, Solo Calgi Muzikleri) 15
                                ve uzeri dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M50', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                51) Uluslararasi Elektronik ve Elektro – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 0 – 5 dakikalik
                                eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M51', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                52) Uluslararasi Elektronik ve Elektro – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 5 – 10 dakikalik
                                eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M52', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                53) Uluslararasi Elektronik ve Elektro – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 10 – 15 dakikalik
                                eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M52', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                54) Uluslararasi Elektronik ve Elektro – Akustik
                                Muzikler (Calgi, elektronik ortam ve Bilgisayar
                                ortaminda Fix Medya Muzigi) 15 ve uzeri
                                dakikalik eser sahibi olmak



                            </td>
                            {
                                renderDataByGroup('M54', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td colSpan="4">
                                M-4. TURK MUZIGI ESERLERINE ILISKIN URETIM / MUZIKAL YAYIN
                                Bunyesinde Turk Muzigi Teorisi ve Yoresel elemanlari (makam, yore, form, donem, usul, vb...) teknik ve estetik yeterliklerle
                                bulunduran, yazilmis muzikal kompozisyonlar, derlemeler ve ses yayinlari



                            </td>

                        </tr>
                        <tr>
                            <td>
                                55) Turk Muzigi makamlarini kullanarak
                                geleneksel formlar (ayin, pesrev, kâr, kârçe,
                                agir semâi, yuruk semâi, beste, sarki vb …)
                                çerçevesinde olusturulmus kompozisyonlar.
                                Bestelenmis Eser Sahibi Olmak (Nota ile
                                belgelemek kosulu ile)



                            </td>
                            {
                                renderDataByGroup('M55', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                56) Turk Muzigi makamlarini kullanarak
                                geleneksel formlar (ayin, pesrev, kâr, kârçe,
                                agir semâi, yuruk semâi, beste, sarki vb …)
                                çerçevesinde olusturulmus kompozisyonlar.
                                Bestelenmis ve Seslendirilmis Eser Sahibi
                                Olmak (ulusal konser veya ses yayini)



                            </td>
                            {
                                renderDataByGroup('M56', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                57) Turk Muzigi makamlarini kullanarak
                                geleneksel formlar (ayin, pesrev, kâr, kârçe,
                                agir semâi, yuruk semâi, sarki beste vb …)
                                çerçevesinde olusturulmus kompozisyonlar.
                                Bestelenmis ve Seslendirilmis Eser Sahibi
                                Olmak (uluslararasi konser veya yurt disinda
                                basilmis ses yayini)



                            </td>
                            {
                                renderDataByGroup('M57', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                58) Turk Halk Muzigi alaninda derleme yapmak.
                                (TRT Muzik Dairesi Bsk. Repertuvar Kurulu
                                tarafindan onaylanmis)



                            </td>
                            {
                                renderDataByGroup('M58', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                59) Turk Halk Muzigi alaninda derleme yapmak.
                                (Nota ile belgelemek kosulu ile



                            </td>
                            {
                                renderDataByGroup('M59', 'savedArtworks', savedArtworks)
                            }
                        </tr>
                        <tr>
                            <td>
                                60) Turk Halk Muzigi alaninda derlenmis
                                parçanin notaya alinmasi (TRT Muzik Dairesi
                                Bsk. Repertuvar kurulu tarafindan onaylanmis)



                            </td>
                            {
                                renderDataByGroup('M60', 'savedArtworks', savedArtworks)
                            }
                        </tr>

                        <tr>
                            <td>
                                Bolum M


                            </td>
                            <td>

                                <tr>Toplam Puani</tr>
                            </td>
                            <td></td>
                        </tr>


                    </tbody>
                </table>
                <table className='finish-table'>

                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={1}></td>
                            <td colSpan={3}>Adayin Asgari Yayin/Etkinlik Sayisi (Tablo 1 goz onune
                                alinarak faaliyet sayilari yazilir. Var ise ozel durumlar
                                açiklanir)</td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A - A.1-A.2</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A - A.1-A.4</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A - A.1-A.5</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A - A.1-A.6</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A - A.1-A.8</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A - A.1-A.8</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Baslica Yazar</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Toplam Makale</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Kisisel ve Karma Etkinlik</strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum F - F.1 veya F.2
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum H - H.1-12 veya H.12-17
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum H - H.1-12 veya H.13-22
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}></td>
                            <td colSpan={3}>Adayin Asgari/Toplam Puanlari (Tablo 2 goz onune
                                alinarak toplam ve var ise asgari puanlari yazilir. Var ise
                                ozel durumlar açiklanir)</td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A -A.1-A.4
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A -A.1-A.5
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A -A.1-A.6
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A -A.1-A.8
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum A Toplam Puan
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum B Toplam Puan
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum C Toplam Puan
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum D -Toplam Puan
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum E -Toplam Puan
                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum F -F.1-F.2

                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum F -Toplam Puan

                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum G -Toplam Puan

                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum H -H.1-H.17


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum H- Toplam Puan


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum I- Toplam Puan


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum J- Toplam Puan


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum K- Toplam Puan


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum L- Toplam Puan


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Bolum M- Toplam Puan


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>
                        <tr>
                            <td colSpan={1}><strong>Toplam Puan


                            </strong></td>
                            <td colSpan={3}></td>
                        </tr>




                    </tbody>
                </table>

            </div>
            <button onClick={downloadPDF}>indir</button>
        </div >
    );
}


export default Finish;
