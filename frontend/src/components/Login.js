import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginServices from '../services/login';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    "username": '',
    "password": '',
    "role": '',
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginData(prevLoginData => ({
      ...prevLoginData, [name]: value 
    }));
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const userData = await loginServices.loginUser(loginData);
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/home');
    } else alert('Wrong username or password')
    
  }
  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit}> 
        <div className='user-side'>
          <label htmlFor='username'>Username</label>
          <input className='user-box' onChange={handleChange} id='username' name='username' value={loginData.username} />
        </div>
        <div className='pass-side'>
          <label htmlFor='password'>Password</label>
        </div>
        <input className='pass-box' onChange={handleChange} type='password' id='password' name='password' value={loginData.password} />
        <label><input onChange={handleChange} type='radio' name='role' value='teacher' /> Teacher</label>
        <label><input onChange={handleChange} type='radio' name='role' value='student' /> Student</label>
        <button className="enter-button">Enter</button>
      </form>
    </div>
  )
}

export default Login