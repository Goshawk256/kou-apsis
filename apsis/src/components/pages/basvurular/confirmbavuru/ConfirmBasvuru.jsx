import React, { useState } from 'react';
import './ConfirmBasvuru.css';
import 'dayjs/locale/tr';  // Türkçe dil dosyasını içe aktarıyoruz
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useEffect } from 'react';
import axios from 'axios';
import All_Url from '../../../../url';
import MyApplications from '../basvurularim/MyApplications';
import previous from '../../../../assets/previous.png';


function ConfirmBasvuru({ setShowTable }) {
    const [selected, setSelected] = useState("");
    const [formattedPublications, setFormattedPublications] = useState([]);
    const [isMyApplications, setIsMyApplications] = useState(true);

    useEffect(() => {
        const savedPublications = JSON.parse(localStorage.getItem('savedPublications')) || [];
        const formattedPubs = savedPublications.map(item => ({
            id: item.id,
            title: item.title,
            group: item.groupAuto,
            type: 'Yayın',
            score: item.scoreAuto,
            authors: item.authors || []
        }));

        setFormattedPublications(formattedPubs);
    }, []);

    const handleSaveToLocalStorage = async () => {
        if (!selected) {
            alert("Lütfen bir birim seçin!");
            return;
        }

        localStorage.setItem("selectedOption", selected);

        const isValid = await valideDatas();
        if (isValid) {
            setShowTable(true);
        } else {
            alert("Başvuru kaydı oluşturulamadı. Yeterli puana sahip değilsiniz!");
        }
    };

    const valideDatas = async () => {
        const token = localStorage.getItem('accesToken');


        if (!formattedPublications || formattedPublications.length === 0) {
            console.error("Hata: Yayın bilgileri eksik!");
            return false;
        }

        const publicationIds = formattedPublications.map(item => item.id);

        try {
            const response = await axios.post(`${All_Url.api_base_url}/academic/validate-application`, {
                publicationIds: publicationIds,
                title: localStorage.getItem('selectedOption'),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data.success;
        } catch (error) {
            console.error("Hata oluştu:", error);
            return true;
        }
    };


    return (
        <div className='confirm-basvuru'>
            {isMyApplications ?
                (
                    <MyApplications onSelect={() => { setIsMyApplications(false) }} />
                ) : (
                    <div className='confirm-content'>
                        <h1 className='confirm-title'>Başvuru Kaydı Oluşturma</h1>
                        <h5 className='birim-title'>Başvurulacak Birim:</h5>
                        <div className="radio-input">
                            {["Dr.Öğr.Ü", "Doç. Dr.", "Prof. Dr."].map((role, index) => {
                                return (
                                    <label key={role} className={`label ${selected === role ? "selected" : ""}`}>
                                        <input
                                            type="radio"
                                            name="value-radio"
                                            value={role}
                                            checked={selected === role}
                                            onChange={() => setSelected(role)}
                                        />
                                        <p className="text">{role}</p>
                                    </label>
                                );
                            })}
                        </div>
                        <h5 className='atama-title'>Son Atama Tarihi:</h5>
                        <div className='confirm-bottom-content'>
                            <div className='date-picker'>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                                    <StaticDatePicker
                                        orientation="landscape"
                                        sx={{
                                            "& .Mui-selected": {
                                                backgroundColor: "#1FA54E !important",
                                                color: "#fff !important",
                                            },
                                            "& .MuiPickersDay-root": {
                                                borderRadius: "10px",
                                                transition: "background-color 0.5s ease",
                                            },
                                            "& .MuiPickersDay-root:hover": {
                                                backgroundColor: "#40be4b",
                                                color: "#fff",
                                            },
                                            "& .MuiDatePickerToolbar-title": {
                                                color: "#1FA54E !important",
                                                fontWeight: "bold",
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            <button className='confirm-ileri-button' onClick={handleSaveToLocalStorage}>
                                İleri
                            </button>
                        </div>
                        <button onClick={() => { setIsMyApplications(true) }} className='confirm-geri-button'>
                            <img src={previous} alt="" />
                        </button>
                    </div>
                )
            }
        </div >
    );
}

export default ConfirmBasvuru;
