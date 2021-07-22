import React from 'react';
import Facebook from '../component/facebook/facebook';
import { Link } from 'react-router-dom';
import LogIn from '../component/login/login.js';
import Home from './home/home';

const LogInPage = (props) =>{
    return (
        <>
          <LogIn/>
         
           {/* <Facebook/> */}
           {/* <Link to='/home'>
               homepage
           </Link>
            */}

           
        
        </>
    )
}
export default LogInPage;  