import React, { useState } from 'react';
import './ConfirmBasvuru.css';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';  // Türkçe dil dosyasını içe aktarıyoruz
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

function ConfirmBasvuru({ setShowTable }) {  // setShowTable fonksiyonu props olarak alınıyor
    const [selected, setSelected] = useState("");

    const handleSaveToLocalStorage = () => {
        if (selected) {
            localStorage.setItem("selectedOption", selected);
            setShowTable(true);  // showTable'yi true yapıyoruz
        } else {
            alert("Lütfen bir birim seçin!");
        }
    };

    return (
        <div className='confirm-basvuru'>
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
        </div>
    );
}

export default ConfirmBasvuru;
