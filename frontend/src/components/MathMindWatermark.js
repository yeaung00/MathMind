import React from 'react';
import logo from '../MathMindWatermark.png';

function MathMindWatermark() {
  return (
    <div className='watermark'>
        <img style={{ width: 300, height: 125 }} src={logo} alt="watermark"/>
    </div>
  )
}

export default MathMindWatermark