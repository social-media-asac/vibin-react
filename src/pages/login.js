import React from 'react';
import Facebook from '../component/facebook/facebook';
import { Link } from 'react-router-dom';
import LogIn from '../component/login/login';

const LogInPage = (props) =>{
    return (
        <>
          <LogIn/>
          <h2>OR</h2>
           <Facebook/>
         <Link to = '/register'>
           <button>Register</button></Link>
        </>
    )
}
export default LogInPage;  