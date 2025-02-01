import React, { useState } from 'react';
import './ConfirmBasvuru.css';

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
        </div>
    );
}

export default ConfirmBasvuru;
