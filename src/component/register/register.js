import React from 'react';
import { Link } from 'react-router-dom';
const Register = (props) =>{
    return (
        <>
        
          <h4>Sign UP</h4>
          <form>
              <label >User Name</label>
              <input type="text"/>
              <label >Email</label>
              <input type="email" />
              <label >Password</label>
              <input type="password" />
        <Link to='/profile/id'>     <button type="submit">Submit</button></Link> 
          </form>
        </>
    )
}
export default Register;