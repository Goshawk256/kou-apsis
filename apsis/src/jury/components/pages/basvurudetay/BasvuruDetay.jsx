import React from 'react'
import './BasvuruDetay.css'
import previous from '../../../../assets/previous.png';
import { FaPencilAlt } from 'react-icons/fa';
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
                    <div className='outer-table'>
                        <table className='basvurudetay-table'>
                            <thead>
                                <tr>
                                    <th>İçerik Adı</th>
                                    <th>İçerik Grubu</th>
                                    <th>İçerik Puanı</th>
                                    <th>Yüklenen Belge</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Başvuru İçeriği Adı</td>
                                    <td>A5</td>
                                    <td>90</td>
                                    <td><a href='https://www.google.com'>Belge</a></td>
                                    <td> <button><FaPencilAlt /></button></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasvuruDetay