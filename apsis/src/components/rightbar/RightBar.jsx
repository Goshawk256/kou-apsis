import React, { useState } from 'react';
import './RightBar.css';


function RightBar({ isOpen, onClose, id }) {

    const [selectedConditions, setSelectedConditions] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);

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

    return (
        <>
            <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`right-bar ${isOpen ? 'open' : ''} `}>
                <div className="right-bar-header">
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="right-bar-content">
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
    );
}

export default RightBar;
