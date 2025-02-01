import React, { useState } from 'react';
import './ConfirmBasvuru.css';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';  // Türkçe dil dosyasını içe aktarıyoruz
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

function ConfirmBasvuru() {
    const [selected, setSelected] = useState("");

    return (
        <div className='confirm-basvuru'>
            <h1 className='confirm-title'>Başvuru Kaydı Oluşturma</h1>
            <h5 className='birim-title'>Başvurulacak Birim:</h5>
            <div className="radio-input">
                {["Dr.Öğr.Ü", "Doç. Dr.", "Prof. Dr."].map((role, index) => {
                    const value = `value-${index + 1}`;
                    return (
                        <label key={value} className={`label ${selected === value ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="value-radio"
                                value={value}
                                checked={selected === value}
                                onChange={() => setSelected(value)}
                            />
                            <p className="text">{role}</p>
                        </label>
                    );
                })}
            </div>
            <h5 className='atama-title'>Son Atama Tarihi:</h5>
            <div className='date-picker'>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                    <StaticDatePicker
                        orientation="landscape"
                        sx={{
                            "& .Mui-selected": {
                                backgroundColor: "#435dd8 !important", // Seçili tarihin arkaplan rengi
                                color: "#fff !important", // Seçili tarihin metin rengi
                            },
                            "& .MuiPickersDay-root": {
                                borderRadius: "10px", // Günleri daha yuvarlak yapar
                                transition: "background-color 0.3s", // Geçiş efekti
                            },
                            "& .MuiPickersDay-root:hover": {
                                backgroundColor: "#2d3750", // Gün üzerine gelince rengi değiştir
                            }
                        }}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
}

export default ConfirmBasvuru;
