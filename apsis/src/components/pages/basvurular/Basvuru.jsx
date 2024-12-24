import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../theme/themeContext';
import './Basvuru.css';

function Basvuru() {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState('Doktora Öğr. Ü.');
    const [previousPromotionDate, setPreviousPromotionDate] = useState('');
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Sayfa başına gösterilecek veri sayısı
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Modal durumu
    const [isSuccesModalOpen, setIsModalOpen] = useState(false); // Modal durumu

    // Veriyi sayfalara bölen fonksiyon
    const paginate = (data, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // Validates if the date is at least January 1, 1900
    const isValidDate = (date) => {
        const minDate = new Date('1900-01-01');
        const inputDate = new Date(date);
        return inputDate >= minDate;
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleApply = () => {
        // Başvur butonuna tıklanınca popup açılacak
        setSuccessMessage(`${selectedOption} unvanı için başvurunuz alınmıştır. Süreç içerisinde Bildirimlerinizi kontrol etmeyi unutmayınız.`);
        setIsModalOpen(true);
    };
    const handleDateChange = (e) => {
        setPreviousPromotionDate(e.target.value);
        setErrorMessage(''); // Reset error message when the user changes the date
    };

    const handleGetData = () => {
        if (!isValidDate(previousPromotionDate)) {
            setErrorMessage('Lütfen geçerli bir tarih girin (en az 1 Ocak 1900)');
            setIsErrorModalOpen(true); // Modal'ı aç
            return;
        }

        const storedAwards = JSON.parse(localStorage.getItem('savedAwards') || '[]');
        const storedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
        const storedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
        const storedPublications = JSON.parse(localStorage.getItem('savedPublications') || '[]');
        const storedThesis = JSON.parse(localStorage.getItem('savedThesis') || '[]');

        // Combine all data into a single array for table display
        const combinedData = [
            ...storedAwards.map((award) => ({
                type: 'Award',
                name: award.title,
                group: award.group,
                score: award.score,
                publishDate: award.publishDate,
            })),
            ...storedCourses.map((course) => ({
                type: 'Course',
                name: course.course_name,
                group: course.grup_adi,
                score: course.ders_puani,
                publishDate: course.publishDate,
            })),
            ...storedProjects.map((project) => ({
                type: 'Project',
                name: project.projectName,
                group: project.group,
                score: project.score,
                publishDate: project.publishDate,
            })),
            ...storedPublications.map((publication) => ({
                type: 'Publication',
                name: publication.title,
                group: publication.groupAuto,
                score: publication.scoreAuto,
                publishDate: publication.publishDate,
            })),
            ...storedThesis.map((thesis) => ({
                type: 'Thesis',
                name: thesis.title,
                group: thesis.group,
                score: thesis.score,
                publishDate: thesis.publishDate,
            })),
        ];

        // Check if any publishDate is before the previousPromotionDate
        const invalidDateEntries = combinedData.filter((data) => {
            if (data.publishDate) {
                return new Date(data.publishDate) < new Date(previousPromotionDate);
            }
            return false;
        });

        if (invalidDateEntries.length > 0) {
            setErrorMessage('Başvuru için seçilen yayınların tarihi, önceki ünvanınızı aldığınız tarihten önce olamaz.');
            setIsErrorModalOpen(true); // Modal'ı aç
            return;
        }

        setTableData(combinedData); // Set combined data for table display
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Get the current data for the current page
    const currentData = paginate(tableData, currentPage, itemsPerPage);
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    const closeModal = () => {
        setIsErrorModalOpen(false); // Modal'ı kapat
        setIsModalOpen(false)
    };

    const handleErrorModalBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal(); // Modal dışına tıklanırsa kapanacak
        }
    };
    const handleSuccesModalBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal(); // Modal dışına tıklanırsa kapanacak
        }
    }

    const handleRemoveItem = (item, itemType) => {
        // İlgili localStorage'daki öğeyi al
        const storageKey = {
            Award: 'savedAwards',
            Course: 'savedCourses',
            Project: 'savedProjects',
            Publication: 'savedPublications',
            Thesis: 'savedThesis',
        }[itemType];

        if (!storageKey) return;

        // LocalStorage'daki veriyi güncelle
        const currentData = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const updatedData = currentData.filter(
            (storedItem) => storedItem.title !== item.name && storedItem.course_name !== item.name && storedItem.projectName !== item.name && storedItem.title !== item.name
        );

        // LocalStorage'ı yeni veri ile güncelle
        localStorage.setItem(storageKey, JSON.stringify(updatedData));

        // Tablo verisini güncelle
        setTableData((prevData) => prevData.filter((data) => data.name !== item.name));
    };

    return (
        <div className={`basvuru-main ${theme}`}>
            <div className='basvuru-container'>
                <div className='basvuru-row-1'>
                    <h2 style={{ color: '#7a7a7a' }}>Başvuru Seçenekleri</h2>
                    <div>
                        <div class="radio-inputs">
                            <label class="radio">
                                <input
                                    type='radio'
                                    id='radio-doktora'
                                    name='basvuru'
                                    value='Doktora Öğr. Ü.'
                                    checked={selectedOption === 'Doktora Öğr. Ü.'}
                                    onChange={handleOptionChange} />
                                <span class="name">Dr.Öğr.Ü.</span>
                            </label>
                            <label class="radio">
                                <input
                                    type='radio'
                                    id='radio-docentlik'
                                    name='basvuru'
                                    value='Doçentlik'
                                    checked={selectedOption === 'Doçentlik'}
                                    onChange={handleOptionChange} />
                                <span class="name">Doç.</span>
                            </label>

                            <label class="radio">
                                <input
                                    type='radio'
                                    id='radio-profluk'
                                    name='basvuru'
                                    value='Profluk'
                                    checked={selectedOption === 'Profluk'}
                                    onChange={handleOptionChange} />
                                <span class="name">Prof.</span>
                            </label>
                        </div>

                        <div className='date-picker'>
                            <label>
                                Önceki Unvan Tarihi:
                                <input
                                    style={{
                                        marginTop: '3%',
                                    }}
                                    type='date'
                                    value={previousPromotionDate}
                                    onChange={handleDateChange}
                                />
                            </label>
                            <button
                                onClick={handleGetData}
                                className='get-publications-button'
                                disabled={!isValidDate(previousPromotionDate)}
                            >
                                Verileri Getir
                            </button>
                        </div>


                    </div>




                </div>

                <div className='yayinlar-main-row-3'>
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                        >
                            ‹
                        </button>
                        <span>{currentPage}/{totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage * itemsPerPage >= tableData.length}
                        >
                            ›
                        </button>
                    </div>
                    {tableData.length === 0 ? (
                        <p>Başvuru için seçilmiş herhangi bir yayın bulunamadı, Önceki ünvan tarihini ve seçtiğiniz yayınları kontrol ediniz. </p>
                    ) : (
                        <div className='table-apply'>

                            <table className='data-table'>
                                <thead>
                                    <tr>
                                        <th>Tür</th>
                                        <th>Ad</th>
                                        <th>Grup</th>
                                        <th>Puan</th>
                                        <th>İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.type}</td>
                                            <td>{data.name}</td>
                                            <td>{data.group}</td>
                                            <td>{data.score}</td>
                                            <td style={{ padding: '5px' }}><button className="tooltip" onClick={() => handleRemoveItem(data, data.type)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                    <path fill="#55d935" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                </svg>
                                                <span className="tooltiptext">çıkar</span>
                                            </button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )}

                </div>
                {tableData.length === 0 ? (
                    ''
                ) : (
                    <button className='apply-button' onClick={handleApply}>Başvur</button>
                )}
            </div>

            {/* Hata Modal */}
            {isErrorModalOpen && (
                <div className="modal" onClick={handleErrorModalBackgroundClick}>


                    <div class="error">
                        <div class="error__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                        </div>
                        <div class="error__title">İşlem Başarısız: <br /> <br />{errorMessage}</div>

                    </div>
                </div>
            )}
            {isSuccesModalOpen && (
                <div className="modal" onClick={handleSuccesModalBackgroundClick}>




                    <div class="info">
                        <div class="info__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"></path></svg>
                        </div>
                        <div class="info__title">İşlem Başarılı: <br /> <br /> {successMessage}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Basvuru;
