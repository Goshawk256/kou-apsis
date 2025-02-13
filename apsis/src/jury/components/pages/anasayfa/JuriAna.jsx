import React, { useEffect, useState } from 'react';

import './JuriAna.css'

function JuriAna() {


    return (

        <div className="main-juriana">
            <div className='juriana-content' >
                <div className='juriana-header' >
                    <h1>Başvurular</h1>
                </div>
                <div className='juriana-columns' >
                    <div className='juriana-column' >
                        <div className='application-type-waiting' >
                            <span>BEKLEYEN</span>
                            <button>20</button>

                        </div>

                        <div className='application-content' >

                        </div>
                    </div>
                    <div className='juriana-column' >
                        <div className='application-type-success' >
                            <span>ONAYLANAN</span>
                            <button>20</button>

                        </div>

                        <div className='application-content' >

                        </div>
                    </div>
                    <div className='juriana-column' >
                        <div className='application-type-reject' >

                            <span>REDDEDİLEN</span>
                            <button>20</button>
                        </div>

                        <div className='application-content' >

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default JuriAna;
