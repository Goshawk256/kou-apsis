import  { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { lessonGroups, projectGroups, publicationGroups, awardGroups, artGroups, thesisGroups, bookGroups, declarationGroups, citationGroups } from '../../../middlewares/groupSchemeMiddleware';
import './RightBar.css';


function RightBar({ isOpen, onClose, id, editingIndex, tempGroups, onGroupChange, group, name }) {

    const [selectedConditions, setSelectedConditions] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [allowedList, setAllowedList] = useState([]);

    const handleSelection = (condition) => {
        if (selectedConditions.includes(condition)) {
            setSelectedConditions(selectedConditions.filter(c => c !== condition));
        } else {
            setSelectedConditions([...selectedConditions, condition]);
        }
    };

    const handleFileChange = (event) => {
        setUploadedFile(event.target.files[0]);
    };

    const getConditionText = (condition) => {
        const conditionTexts = {
            1: "1) İki yazarlı makale(akademik danışman ve danışmanlığındaki lisansüstü öğrenci)",
            2: "2) Üç yazarlı makale(akademik danışman ve danışmanlığındaki lisansüstü öğrenci ve eş danışman)",
            3: "3) Üç yazarlı makale(akademik danışman ve danışmanlığındaki iki lisansüstü öğrencisi)",
            4: "4) Üniversite-Başka bir yurtiçi Üniversite, Üniversite-Yurtdışı Üniversite/Kurum, Üniversite-Sanayi Üniversite İşbirliği içeren çalışma",
            5: "5) Derleme makalesi",
            6: "6) Beş ve üzeri kişi sayısı içeren çalışmalarda sorumlu yazar veya ilk yazar",
            7: "7) Beş ve üzeri kişi sayısı içeren çalışmalarda eşit ilk veya sorumlu yazar durumu belirtilmiş makaleler"
        };
        return conditionTexts[condition] || `Özel Durum ${condition}`;
    };

    useEffect(() => {


        if (name === 'makale')
            setAllowedList(publicationGroups());
        else if (name === 'thesis')
            setAllowedList(thesisGroups());
        else if (name === 'project')
            setAllowedList(projectGroups());
        else if (name === 'artwork')
            setAllowedList(artGroups());
        else if (name === 'award')
            setAllowedList(awardGroups());
        else if (name === 'lesson')
            setAllowedList(lessonGroups());
        else if (name == 'citation')
            setAllowedList(citationGroups());
        else if (name == 'book')
            setAllowedList(bookGroups());
        else if (name == 'declaration')
            setAllowedList(declarationGroups())

    }, [name]);


    return (
        <>
            {id === 'yayin' ? (
                <>
                    <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
                    <div className={`right-bar ${isOpen ? 'open' : ''} `}>
                        <div className="right-bar-header">
                            <button className="close-btn" onClick={onClose}>X</button>
                        </div>
                        <div className="right-bar-content">
                            <label style={{ fontWeight: '700', marginBottom: '3%', display: 'flex', justifyContent: 'start', width: '100%', fontSize: '14px' }}>Grup Bigisi Düzenleme</label>
                            <span>Grup: {group}</span>
                            {editingIndex !== null && (
                                <input
                                    type="text"
                                    value={tempGroups[editingIndex] || ""}
                                    onChange={(e) => {
                                        const newValue = e.target.value.toUpperCase();
                                        const isValidInput = allowedList.some(item => item.startsWith(newValue));

                                        if (isValidInput || allowedList.includes(newValue)) {
                                            onGroupChange(editingIndex, newValue);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault(); // Enter'ın yeni satır eklemesini engeller
                                            onClose(); // İşlem tamamlandığında paneli kapatabilir veya başka bir işlem yapabilirsin
                                        }
                                    }}
                                    autoFocus
                                />



                            )}


                            <label style={{ fontWeight: '700', marginBottom: '3%', display: 'flex', justifyContent: 'start', width: '100%', fontSize: '14px' }}>Başlıca Yazar Durumu</label>
                            <div className="checkbox-input">
                                {[8, 9, 10].map(condition => (
                                    <label key={condition} className="label">
                                        <input
                                            type="checkbox"
                                            id={`value-${condition}`}
                                            name="value-checkbox"
                                            value={`value-${condition}`}
                                            checked={selectedConditions.includes(condition)}
                                            onChange={() => handleSelection(condition)}
                                        />
                                        <p className="text">
                                            {(() => {
                                                const conditionTexts = {
                                                    8: "a) Tek Yazarlı Makale",
                                                    9: "b) Makalenin yazarlarından ilk sırada yer alan yazar",
                                                    10: "c) Danışmanlığını yaptığı lisansüstü öğrenci(ler) ile birlikte yazılmış makale"
                                                };
                                                return conditionTexts[condition] || `Özel Durum ${condition}`;
                                            })()}
                                        </p>
                                    </label>
                                ))}
                            </div>

                            <label style={{ fontWeight: '700', marginBottom: '3%', marginTop: '4%', display: 'flex', justifyContent: 'start', width: '100%' }}>Özel Durumlar</label>
                            <div className="checkbox-input">
                                {[1, 2, 3, 4, 5, 6, 7].map(condition => (
                                    <label key={condition} className="label">
                                        <input
                                            type="checkbox"
                                            id={`value-${condition}`}
                                            name="value-checkbox"
                                            value={`value-${condition}`}
                                            checked={selectedConditions.includes(condition)}
                                            onChange={() => handleSelection(condition)}
                                        />
                                        <p className="text">{getConditionText(condition)}</p>
                                    </label>
                                ))}
                            </div>

                            <label style={{ fontWeight: '700', marginBottom: '3%', marginTop: '4%', display: 'flex', justifyContent: 'start', width: '100%' }}>Dosya Yükleme</label>
                            <div className="file-upload">
                                <input type="file" onChange={handleFileChange} />
                                {uploadedFile && <p>Yüklenen Dosya: {uploadedFile.name}</p>}
                            </div>

                            <div className="submit-section">
                                <button onClick={() => console.log({ selectedConditions, uploadedFile })}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
                    <div className={`right-bar ${isOpen ? 'open' : ''} `}>
                        <label style={{ fontWeight: '700', marginBottom: '3%', display: 'flex', justifyContent: 'start', width: '100%', fontSize: '14px' }}>Grup Bigisi Düzenleme</label>
                        <span>Grup: {group}</span>
                        {editingIndex !== null && (
                            <input
                                type="text"
                                value={tempGroups[editingIndex] || ""}
                                onChange={(e) => {
                                    const newValue = e.target.value.toUpperCase();
                                    const isValidInput = allowedList.some(item => item.startsWith(newValue));

                                    if (isValidInput || allowedList.includes(newValue)) {
                                        onGroupChange(editingIndex, newValue);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault(); // Enter'ın yeni satır eklemesini engeller
                                        onClose(); // İşlem tamamlandığında paneli kapatabilir veya başka bir işlem yapabilirsin
                                    }
                                }}
                                autoFocus
                            />

                        )}
                    </div>
                </>

            )}
        </>
    );
}
RightBar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    editingIndex: PropTypes.number,
    tempGroups: PropTypes.array.isRequired,
    onGroupChange: PropTypes.func.isRequired,
    group: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default RightBar;
