import React, { useEffect, useState } from 'react';
import user from '../../../../assets/user.png'
import document from '../../../../assets/document.png'
import check from '../../../../assets/check.png'

import './JuriAna.css'

function JuriAna({ onSelect }) {


    return (

        <div className="main-juriana">
            <div className='juriana-content' >
                <div className='basvurular-top-sections' >
                    <button>Ön Değerlendirme Başvuruları</button>
                    <button>Kadro Başvuruları</button>
                </div>
                <div></div>
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
                                        <span className='username-span'>Suhap Şahin</span>
                                        <span className='usermail-span' >suhapsahin@kocaeli.edu.tr</span>
                                    </div>

                                </div>
                                <div className='divider-horizontal'></div>
                                <div className='a-c-r-2' >
                                    <div className='a-c-r-2-1' >
                                        <div className='usertitle' >
                                            <span className='usertitle-span'>Başvurulan Kadro: Doç. Dr.</span>
                                        </div>
                                        <div className='user-department' >
                                            <button>
                                                <img src={document} alt="" />

                                            </button>
                                            <button onClick={() => onSelect('Basvurudetay')}>
                                                <img src={check} alt="" />
                                            </button>
                                        </div>
                                    </div>

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
                            <div className='application-card-apply' >
                                <div className='a-c-r-1' >
                                    <div className='a-c-r-1-1' >
                                        <img src={user} alt="" />
                                    </div>
                                    <div className='a-c-r-1-2' >
                                        <span className='username-span'>Suhap Şahin</span>
                                        <span className='usermail-span' >suhapsahin@kocaeli.edu.tr</span>
                                    </div>

                                </div>
                                <div className='divider-horizontal'></div>
                                <div className='a-c-r-2' >
                                    <div className='a-c-r-2-1' >
                                        <div className='usertitle' >
                                            <span className='usertitle-span'>Başvurulan Kadro: Doç. Dr.</span>
                                        </div>
                                        <div className='user-department' >
                                            <button>
                                                <img src={document} alt="" />

                                            </button>
                                            <button onClick={() => onSelect('Basvurudetay')}>
                                                <img src={check} alt="" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='juriana-column' >
                        <div className='application-type-reject' >

                            <span>REDDEDİLEN</span>
                            <button>20</button>
                        </div>

                        <div className='application-content' >
                            <div className='application-card-reject' >
                                <div className='a-c-r-1' >
                                    <div className='a-c-r-1-1' >
                                        <img src={user} alt="" />
                                    </div>
                                    <div className='a-c-r-1-2' >
                                        <span className='username-span'>Suhap Şahin</span>
                                        <span className='usermail-span' >suhapsahin@kocaeli.edu.tr</span>
                                    </div>

                                </div>
                                <div className='divider-horizontal'></div>
                                <div className='a-c-r-2' >
                                    <div className='a-c-r-2-1' >
                                        <div className='usertitle' >
                                            <span className='usertitle-span'>Başvurulan Kadro: Doç. Dr.</span>
                                        </div>
                                        <div className='user-department' >
                                            <button>
                                                <img src={document} alt="" />

                                            </button>
                                            <button onClick={() => onSelect('Basvurudetay')}>
                                                <img src={check} alt="" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default JuriAna;
