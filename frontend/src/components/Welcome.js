import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className='Welcome'>
        <button className='welcome-button'> 
            <Link to="/home"> Welcome. </Link>
        </button>
    </div>
  )
}

export default Welcome