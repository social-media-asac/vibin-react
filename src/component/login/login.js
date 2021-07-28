import React ,{useRef} from 'react';
import { Link } from 'react-router-dom';
import { useState , useContext } from 'react';
// import { When } from 'react-if';
import './login.css'
import  {LoginContext}  from '../../context/authContext';
import {LoginCall} from '../../apiCall';
import {If , Then, Else } from 'react-if';
import Home from '../../pages/home/home';
const LogIn = () =>{
  const contextType  = useContext(LoginContext);
  const [username, setUsername]= useState({});
  const [password, setPassword]= useState({});
  // const [email, setEmail]= useState({});
  // const [role, setRole]= useState('user');
//  const username = useRef();
//  const password = useRef();
//  const email = useRef();
 
 
  const handleChange = e => {
    setUsername({...username,[e.target.name]: e.target.value})
    setPassword({...password,[e.target.name]: e.target.value})
    // setEmail({...email,[e.target.name]: e.target.value})
    // setRole({...role,[e.target.name]: e.target.value})
  };
  const handleSubmit = e => {
    e.preventDefault();
    
    // console.log('username',username.username);

    contextType.login(username.username, password.password);
  };

  // const clickHandler = (e) => {
  //   e.preventDefault();
  
  //   contextType.login({username:username.current.value, password:password.current.value});
  //   //  console.log(username.current.value)
  // }

  // console.log(contextType,'contextTyp');

  let userName =contextType.user?contextType.user.username:null;
   return (
        <> 
          <If condition={contextType.loggedIn === true}>
                <Then>
                
                  <Home/>
                 
                  
                    <button onClick={contextType.logout}>Log out</button>
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
          <input onChange={handleChange} name='username' type="text" placeholder="UserName" className="loginInput1" />
            {/* <input onChange={handleChange} name='email' type="email" placeholder="Email" className="loginInput" /> */}
            <input onChange={handleChange} name='password' type="password" placeholder="Password" className="loginInput1" />
             {/* <input onChange={handleChange} name='role' type="text" placeholder="role" className="loginInput" />  */}
            
             
            <button onClick={handleSubmit} type="submit" className="loginButton" > Log In</button> 
         
            
             
            
            <span className="loginForgot">Forgot Password?</span>
            <Link to = '/register'>
         <button className="loginRegisterButton">
              Create a New Account
            </button></Link>
          </div> 
   {/* <form className="loginBox" onSubmit={clickHandler}>
          <input  
           type="text"
            placeholder="UserName" 
            className="loginInput" 
            required
             ref={username} />
            <input   type="email" placeholder="Email" className="loginInput" ref={email}/>
            <input   type="password" placeholder="Password" className="loginInput" required ref={password} />
            {/* <input onChange={handleChange} name='role' type="text" placeholder="role" className="loginInput" /> */}
            
{/*             
            <button  type="submit" className="loginButton" > Log In</button> 
         
            
            
            
            <span className="loginForgot">Forgot Password?</span>
            <Link to = '/register'> 
         <button className="loginRegisterButton">
              Create a New Account
            </button>
            </Link>
          </form> */} 

        </div>
      </div>
    </div>
    </Else> 
    </If>
          </>
    )
}
export default LogIn;