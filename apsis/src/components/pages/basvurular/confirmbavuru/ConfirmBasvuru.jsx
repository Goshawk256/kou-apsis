import React, { useState } from 'react';
import './ConfirmBasvuru.css';

function ConfirmBasvuru() {
    const [selected, setSelected] = useState("");

    return (
        <div className="radio-input">
            {["Designer", "Student", "Teacher"].map((role, index) => {
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
    );
}

export default ConfirmBasvuru;
