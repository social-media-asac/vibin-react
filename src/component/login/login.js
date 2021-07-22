import React from 'react';
import { Link } from 'react-router-dom';
import { useState , useContext } from 'react';
// import { When } from 'react-if';
import  {LoginContext}  from '../../context/authContext';
import {If , Then, Else } from 'react-if';
import Facebook from '../facebook/facebook';
import Home from '../../pages/home/home';
const LogIn = (props) =>{
  const contextType = useContext(LoginContext);
  const [username, setUsername]= useState({});
  const [password, setPassword]= useState({});
  const [email, setEmail]= useState({});
  // const [role, setRole]= useState('user');
  const handleChange = e => {
    setUsername({...username,[e.target.name]: e.target.value})
    setPassword({...password,[e.target.name]: e.target.value})
    setEmail({...email,[e.target.name]: e.target.value})
    // setRole({...role,[e.target.name]: e.target.value})
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('username',username.username);
    contextType.login(username.username, password.password);
  };
   return (
        <> 
          <If condition={contextType.loggedIn === true}>
                <Then>
                 
                  <Link to = '/home'><Home/></Link>
                 
                  
                    {/* <button onClick={contextType.logout}>Log out</button> */}
                </Then>
                <Else>
                        
           <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Vibein</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Vibein.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
          <input onChange={handleChange} name='username' type="text" placeholder="UserName" className="loginInput" />
            <input onChange={handleChange} name='email' type="email" placeholder="Email" className="loginInput" />
            <input onChange={handleChange} name='password' type="password" placeholder="Password" className="loginInput" />
            {/* <input onChange={handleChange} name='role' type="text" placeholder="role" className="loginInput" /> */}
            
            <Link to='/home'>
            <button onClick={handleSubmit} type="submit" className="loginButton" > Log In</button> 
         
            </Link>
             <Facebook/> 
            
            <span className="loginForgot">Forgot Password?</span>
            <Link to = '/register'>
         <button className="loginRegisterButton">
              Create a New Account
            </button></Link>
          </div>
        </div>
      </div>
    </div>
    </Else> 
    </If>
          </>
    )
}
export default LogIn;