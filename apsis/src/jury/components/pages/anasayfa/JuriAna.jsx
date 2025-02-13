import React, { useEffect, useState } from 'react';
import user from '../../../../assets/user.png'

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
                            <div className='application-card' >
                                <div className='a-c-r-1' >
                                    <div className='a-c-r-1-1' >
                                        <img src={user} alt="" />
                                    </div>
                                    <div className='a-c-r-1-2' >
                                        <span>Suhap Şahin</span>
                                        <span>suhapsahin@kocaeli.edu.tr</span>
                                    </div>
                                </div>
                                <div className='a-c-r-2' >
                                    <div className='a-c-r-2-1' ></div>
                                    <div className='a-c-r-2-2' ></div>
                                </div>
                            </div>

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
