import React from 'react'
import './RectorAna.css'

function RectorAna() {
  return (
    <div className='main-rectorana'>
      <div className='rectorana-content' >
        <div className='rectorana-column-1' >
          <div className='rectorana-column-1-row-1' >
            <span className='rector-header'>Mustafa Serhat Peker</span>
            <span className='rector-desc'> Rektürlük Atama Sistemi Analiz Sayfası</span>
          </div>
          <div className='rectorana-column-1-row-2' >
            <div className='little-card'></div>
            <div className='little-card'></div>
            <div className='little-card'></div>
          </div>
          <div className='rectorana-column-1-row-3' >
            <div className='r-c-1-r-3-c'>
              <div className='value-1'></div>
            </div>
            <div className='r-c-1-r-3-c'>
              <div className='value-2'></div>
            </div>
          </div>
        </div>
        <div className='rectorana-column-2'>
          <div className='rectorana-column-2-row-1' ></div>
          <div className='rectorana-column-2-row-2' ></div>
        </div>
      </div>
    </div>
  )
}

export default RectorAna;
