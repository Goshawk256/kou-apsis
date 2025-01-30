import React, { useState } from 'react';
import { useTheme } from '../../../theme/themeContext';
import './Basvuru.css';
import { motion, AnimatePresence } from 'framer-motion';
function Basvuru({ onSelect }) {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState('Dr. Öğr. Ü.');
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


    const isValidDate = (date) => {
        const minDate = new Date('1900-01-01');
        const inputDate = new Date(date);
        return inputDate >= minDate;
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        localStorage.setItem('selectedOption', e.target.value);
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

        <div></div>
    );
}

export default Basvuru;
