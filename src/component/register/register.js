import React from 'react';
import './register.css';
import { LoginContext } from '../../context/authContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { If, Else, Then } from 'react-if';
const Register = () => {
  const contextType = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [relationship, setRelationship] = useState('');
  // const [city, setCity] = useState('');
  // const [role, setRole] = useState('user');
   const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('userinfo', username, email, password);
    
     let user = contextType.signUp(username, email, password);
    
       history.push(`/`)
  };
  return (
        <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Vibein</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on Vibein.
            </span>
          </div>
          <div className="loginRight">
            <div className="loginBox1">
          
            <form onSubmit={handleSubmit}>
              
              <input className="loginInput" onChange={(e) => setUsername(e.target.value)} name="username" value={username} placeholder="username" type="text" />
              <br></br>
              <br></br>
              <input  className="loginInput"onChange={(e) => setEmail(e.target.value)} name="email" value={email} placeholder="email" type="email" />
              <br></br>
              <br></br>
              <input className="loginInput" onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="password"  type="password" />
              <br></br>
               <br></br>
              <button type="submit" className="loginButton">Submit</button>

            </form
            ></div>
          </div>
        </div>
        </div>

        </>
      )
}
      export default Register;