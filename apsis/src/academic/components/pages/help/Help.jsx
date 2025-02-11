import React, { useState } from 'react';
import './Help.css';
import gorsel1 from '../../../../assets/gorsel1.png';
import gorsel2 from '../../../../assets/gorsel2.png';
import gorsel3 from '../../../../assets/gorsel3.png';
import gorsel4 from '../../../../assets/gorsel4.png';
import gorsel5 from '../../../../assets/gorsel5.png';
import gorsel6 from '../../../../assets/gorsel6.png';

const images = [
    gorsel1,
    gorsel2,
    gorsel3,
    gorsel4,
    gorsel5,
    gorsel6
];

function Help() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    return (
        <div className='help-main'>
            <img src={images[currentImageIndex]} alt="Help" className='help-image' />
            <button className='nxt-img-button' onClick={nextImage}>Devam Et</button>
        </div>
    );
}

export default Help;