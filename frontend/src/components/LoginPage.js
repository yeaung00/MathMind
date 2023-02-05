import React, { useState } from 'react';
import loginServices from '../services/login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        "username": '',
        "password": '',
        "role": 'student',
      })
    const handleSubmit = async e => {
        const userData = await loginServices.loginUser(loginData);
        if (userData) {
          localStorage.setItem('userData', JSON.stringify(userData));
          navigate('/home');
        } else alert('Wrong username or password')
    }
    return (
      <div className="login-container">
        <div className="title">
          Login
        </div>
        <FluidInput name='username' setLoginData={setLoginData} type="text" label="Name:" id="name" style={{ margin: "15px 0" }} />
        <FluidInput name='password' setLoginData={setLoginData} type="password" label="Password:" id="password" style={{ margin: "15px 0" }} />
        <Button onClick={handleSubmit} buttonText="log in" buttonClass="login-button" />
      </div>
    );
  };
  
  const FluidInput = (props) => {
    const [focused, setFocused] = React.useState(false);
    const [value, setValue] = React.useState("");
  
    const focusField = () => {
      setFocused(!focused);
    };
  
    const handleChange = (event) => {
        const { name, value } = event.target;
       props.setLoginData(prevLoginData => ({
          ...prevLoginData, [name]: value 
        }));
      // setValue(event.target.value);
      // console.log(value)
    };
  
    const { type, label, style, id } = props;
  
    let inputClass = "fluid-input";
    if (focused) {
      inputClass += " fluid-input--focus";
    } else if (value !== "") {
      inputClass += " fluid-input--open";
    }
  
    return (
      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">
          <label className="fluid-input-label" htmlFor={id}>{label}</label>
          <input
            className="fluid-input-input"
            type={type}
            id={id}
            onFocus={focusField}
            onBlur={focusField}
            onChange={handleChange}
            name={props.name}
            autoComplete="off"
          />
        </div>
      </div>
    );
  };
  
  const Button = (props) => {
    return (
      <div className={`button ${props.buttonClass}`} onClick={props.onClick}>
        {props.buttonText}
      </div>
    );
  };
  
//  ReactDOM.render(<LoginPage />, document.getElementById("root"));
  export default LoginPage;