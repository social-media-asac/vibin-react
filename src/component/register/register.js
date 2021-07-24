import React from 'react';
import './register.css';
import { LoginContext } from '../../context/authContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { If, Else, Then } from 'react-if';
const Register = () =>{
  const contextType = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState('user');
  const history=useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('userinfo',username,email, password,relationship,city, role);
    let user = contextType.signUp( username,email, password,relationship,city, role);
    
     history.push(`/profile/${user.username}`)
  };
    return (
        <>
          
          <h4>Sign UP</h4>
          <form onSubmit={handleSubmit}>
              <label >User Name</label>
              <input onChange={(e) => setUsername(e.target.value)} name="username" value={username} type="text"/>

              <label >Email</label>
              <input onChange={(e) => setEmail(e.target.value)} name="email"  value={email} type="email" />

              <label >Password</label>
              <input onChange={(e) =>setPassword (e.target.value)} name="password"  value={password} type="password" />

              <label >relationship</label>
              <input onChange={(e) => setRelationship(e.target.value)} name="relationship"  value={relationship} type="text" />

              <label >city</label>
              <input onChange={(e) => setCity(e.target.value)} name="city"  value={city} type="text" />

              <label >role</label>
              <input onChange={(e) => setRole(e.target.value)} name="role"  value={role} type="text" />

             
          <button type="submit">Submit</button>
          
          </form>
       
        </>
    )
}
export default Register;