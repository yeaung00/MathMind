import React from 'react';
import { Link } from 'react-router-dom';

function LoginButton() {
  return (
      <div className = "LoginButton">
            <button className="login-button"> 
                <Link to="/login"> Login </Link>
            </button>
      </div>
  )
}

export default LoginButton