import React from 'react';
import { Link } from 'react-router-dom';
const LogIn = (props) =>{
    return (
        <>
          
          <h4>Sign In</h4>
          <form>
              <label >User Name</label>
              <input type="text" />
              <label >Email</label>
              <input type="email" />
              <label >Password</label>
              <input type="password" />
        <Link to='/home'>
             <button type="submit">Sign In</button>
             </Link>
              
          </form>
        </>
    )
}
export default LogIn;