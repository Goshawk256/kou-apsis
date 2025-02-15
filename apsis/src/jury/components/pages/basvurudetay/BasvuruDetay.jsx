import React from 'react'
import './BasvuruDetay.css'
import previous from '../../../../assets/previous.png';

function BasvuruDetay({ onSelect }) {
    return (
        <div className='main-basvurudetay'>
            <button className='go-back-button' onClick={() => onSelect('Ana Sayfa')} >
                <img src={previous} alt="" />
            </button>
        </div>

    )
}

export default BasvuruDetay