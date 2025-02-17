import React from 'react'
import './BasvuruDetay.css'
import previous from '../../../../assets/previous.png';
import { useState, useEffect } from 'react';

function BasvuruDetay({ onSelect }) {


    return (
        <div className='main-basvurudetay'>
            <button className='go-back-button' onClick={() => onSelect('Ana Sayfa')} >
                <img src={previous} alt="" />
            </button>

            <div className='basvurudetay-content' >
                <div className='basvurudetay-header'>
                    <span className='user-header'>Başvuru Sahibi: Doç.Dr. SUHAP ŞAHİN</span>
                    <span className='user-date'>Başvuru Tarihi: 12.05.2021</span>

                </div>
                <div className='basvurudetay-inner'>

                </div>
            </div>
        </div>

    )
}

export default BasvuruDetay