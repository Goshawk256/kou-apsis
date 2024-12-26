import React, { useState } from 'react';
import { useTheme } from '../../../theme/themeContext';
import './Basvuru.css';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
function Basvuru({ onSelect }) {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState('Doktora Öğr. Ü.');
    const [previousPromotionDate, setPreviousPromotionDate] = useState('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const types = ['Publication', 'Course', 'Project', 'Award', 'Thesis'];
    const [filteredData, setFilteredData] = useState([]);

    const paginate = (data, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };
    const downloadPDF = () => {
        const doc = new jsPDF();
        const element = document.querySelector('.basvuru-main');

        doc.html(element, {
            callback: function (doc) {
                doc.save('basvuru-content.pdf');
            },

            x: 0,
            y: 0,
            html2canvas: { scale: 0.163 } // Adjust the scale for better quality
        });
    };

    const isValidDate = (date) => {
        const minDate = new Date('1900-01-01');
        const inputDate = new Date(date);
        return inputDate >= minDate;
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleDateChange = (e) => {
        setPreviousPromotionDate(e.target.value);

    };

    const handleGetData = () => {
        if (!isValidDate(previousPromotionDate)) {

            return;
        }

        const storedAwards = JSON.parse(localStorage.getItem('savedAwards') || '[]');
        const storedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
        const storedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
        const storedPublications = JSON.parse(localStorage.getItem('savedPublications') || '[]');
        const storedThesis = JSON.parse(localStorage.getItem('savedThesis') || '[]');

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

        const filtered = combinedData.filter((data) => data.type === types[currentTypeIndex]);
        setFilteredData(filtered);

        const invalidDateEntries = combinedData.filter((data) => {
            if (data.publishDate) {
                return new Date(data.publishDate) < new Date(previousPromotionDate);
            }
            return false;
        });

        if (invalidDateEntries.length > 0) {
            console.log('tarih uygun değil');
            return;
        }

        setTableData(combinedData);
    };

    const handleNextType = () => {
        setCurrentTypeIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % types.length;
            setFilteredData(tableData.filter((data) => data.type === types[newIndex]));
            setCurrentPage(1);
            return newIndex;
        });
    };
    const handlePrevType = () => {
        setCurrentTypeIndex((prevIndex) => {
            const newIndex = (prevIndex - 1) % types.length;
            setFilteredData(tableData.filter((data) => data.type === types[newIndex]));
            setCurrentPage(1);
            console.log(filteredData)
            return newIndex;
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const currentData = paginate(filteredData, currentPage, itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleRemoveItem = (item, itemType) => {
        const storageKey = {
            Award: 'savedAwards',
            Course: 'savedCourses',
            Project: 'savedProjects',
            Publication: 'savedPublications',
            Thesis: 'savedThesis',
        }[itemType];

        if (!storageKey) return;

        const currentData = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const updatedData = currentData.filter(
            (storedItem) => storedItem.title !== item.name && storedItem.course_name !== item.name && storedItem.projectName !== item.name && storedItem.title !== item.name
        );

        localStorage.setItem(storageKey, JSON.stringify(updatedData));

        setTableData((prevData) => prevData.filter((data) => data.name !== item.name));
        setFilteredData((prevData) => prevData.filter((data) => data.name !== item.name));
    };

    return (
        <div className={`basvuru-main ${theme}`}>
            <div className='basvuru-container'>
                <div className='basvuru-row-1'>
                    <h2 style={{ color: '#7a7a7a' }}>Başvuru Seçenekleri</h2>
                    <div>
                        <div className="radio-inputs">
                            <label className="radio">
                                <input
                                    type='radio'
                                    id='radio-doktora'
                                    name='basvuru'
                                    value='Doktora Öğr. Ü.'
                                    checked={selectedOption === 'Doktora Öğr. Ü.'}
                                    onChange={handleOptionChange} />
                                <span className="name">Dr.Öğr.Ü.</span>
                            </label>
                            <label className="radio">
                                <input
                                    type='radio'
                                    id='radio-docentlik'
                                    name='basvuru'
                                    value='Doçentlik'
                                    checked={selectedOption === 'Doçentlik'}
                                    onChange={handleOptionChange} />
                                <span className="name">Doç.</span>
                            </label>

                            <label className="radio">
                                <input
                                    type='radio'
                                    id='radio-profluk'
                                    name='basvuru'
                                    value='Profluk'
                                    checked={selectedOption === 'Profluk'}
                                    onChange={handleOptionChange} />
                                <span className="name">Prof.</span>
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
                    <AnimatePresence mode="wait">
                        <div className="pagination">
                            <div className='total-score' style={{ color: 'rgb(119, 119, 119)', fontWeight: 'bold' }}>
                                Toplam Puan: {filteredData.reduce((total, item) => total + item.score, 0)}
                            </div>
                            <div style={{
                                marginLeft: '0%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                width: '7%',
                                height: '3px',
                                backgroundColor: 'transparent'
                            }}>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage <= 1}
                                >
                                    ‹
                                </button>
                                <span>{currentPage}/{totalPages}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage * itemsPerPage >= filteredData.length}
                                >
                                    ›
                                </button>
                            </div>

                        </div>
                        {filteredData.length === 0 ? (
                            <p>Başvuru için seçilmiş herhangi bir yayın bulunamadı, Önceki ünvan tarihini ve seçtiğiniz yayınları kontrol ediniz. </p>

                        ) : (

                            <div className='table-apply'>
                                <motion.table
                                    key={currentTypeIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
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
                                                <td style={{ padding: '5px' }}>
                                                    <button className="tooltip" onClick={() => handleRemoveItem(data, data.type)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                            <path fill="#55d935" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clipRule="evenodd" fillRule="evenodd"></path>
                                                        </svg>
                                                        <span className="tooltiptext">çıkar</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </motion.table>

                            </div>
                        )}
                    </AnimatePresence>
                </div>
                {filteredData.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '98%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '17%' }}>
                            <button className='apply-button' onClick={handlePrevType}>Önceki</button>
                            <button className='apply-button' onClick={handleNextType}>Sonraki</button>
                        </div>
                        <button className='apply-button' onClick={() => onSelect('Finish')}>Devam</button>
                    </div>

                ) : (
                    filteredData.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '98%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '17%' }}>
                                <button className='apply-button' onClick={handlePrevType}>Önceki</button>
                                <button className='apply-button' onClick={handleNextType}>Sonraki</button>
                            </div>
                            <button className='apply-button' onClick={() => onSelect('Finish')}>Devam</button>
                        </div>
                    )
                )}
            </div>
        </div >
    );
}

export default Basvuru;
