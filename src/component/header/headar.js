import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = (props) =>{
    return (
        <>
          <nav>
          <Link to='/home'> <button>VibeIn</button></Link> 
            
         <Link to='/user/:id'>  
              <button>My Profile</button> </Link>
      
          </nav>
        </>
    )
}
export default Navbar ;