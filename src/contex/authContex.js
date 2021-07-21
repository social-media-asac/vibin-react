import React from 'react';
import jwt from 'jsonwebtoken';
// import superagent from 'superagent';
import cookie from 'react-cookies';
//https://www.npmjs.com/package/react-dotenv//
import { useState ,useEffect  } from 'react';
import base64 from 'base-64';
const API =process.env.REACT_APP_API_URL;
const SECRET ='tasnim';
export const LoginContext = React.createContext();

function LoginProvider(props){
  const [loggedIn, setLoggedIn]= useState(false);
  const [user, setUser]= useState({});
  const [isValid, setInvalid] = useState(true);
  useEffect(()=>{
    const token = cookie.load('auth');
    validateToken(token);
},[]);
const login = async(username, password)=>{
    console.log(username,password);
    try{
        const encoded = base64.encode(`${username}:${password}`)
        // const response = await superagent.post(`${API}/api/v1/auth/signin`)
        // .set('authorization', `Basic ${encoded}`);
    let url = `https://tas-vybin.herokuapp.com/api/v1/auth/signin`
    const result = await fetch(
        url,
        {
            method: 'post',
            mode: 'cors',
            cache: 'no-cache',
            headers: { Authorization: `Basic ${encoded}` },
        }
    );
    let data = await result.json();
    console.log('data', data);
        validateToken(data.token);
    } catch(error){
        setInvalid(false);
        console.log('Failed to signIn', error.message)
    }
    
}
 const validateToken = (token) => {
    try {
        console.log('secret',SECRET, 'token',token);

      let user = jwt.verify(token,SECRET);
      console.log('all good',user);
      
      setLoginState(true, token, user);
    }
    catch (e) {
        console.log('User is not verified', e.message);
      setLoginState(false, null, {});
    }
  };
 const logout = () => {
     console.log('loggedOut')
    setLoginState(false, null, {});
  };
//   const signUp = async( username,email, password,relationship,city, role)=>{

//     console.log('RESPONSE===',typeof(username),username,typeof(password),password)
//         try{
//           console.log('hhhhhhh')
//         const response = await superagent.post(`${API}/api/v1/auth/register`)
//         .send({ username:username,email:email, password:password,relationship:relationship,
//             city:city, role:role})
           
//             .set('X-API-Key', 'foobar')
//              .set('accept', 'json')
//         validateToken(response.body.token);
//         console.log('response.body.token', response.body.token)
//         }catch(error){
//             setInvalid(false);
//             console.log('Try again error in registeration', error.message);
//         }
//   }
const signUp = async function (username,email, password,relationship,city, role) {
    console.log('here**********');
    let url = `https://tas-vybin.herokuapp.com/api/v1/auth/register`;
    let body = {username,email, password,relationship,city, role };
    let result = await fetch(
        url,
        {
            method: 'post',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
    )
    let user = await result.json();
    console.log('user',user);
}
 const setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setUser(user);
    setLoggedIn(loggedIn);
    setInvalid(isValid)
  };
const state = {login, logout, signUp, loggedIn, user, isValid};
    return (
      <LoginContext.Provider value={state}>
        {props.children}
      </LoginContext.Provider>
    );
}
export default LoginProvider;