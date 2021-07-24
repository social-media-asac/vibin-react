import axios from 'axios';
import  cookie  from "react-cookies";
import {ValidateToken} from "./context/authContext";
export const LoginCall = async(userCredential,dispatch)=>{
dispatch({type:"LOGIN_START"});
try {
    let token = cookie.load('auth');
    let url = `https://vybin.herokuapp.com/api/v1/auth/signin`
    let res =  await axios.post(url  ,{ headers: {"Authorization" : `Bearer ${token}`} })
    console.log(res,'8888888888888888')
   
    
     dispatch({type: "LOGIN_SUCCESS"},{payload:res.data})

} catch (error) {
    dispatch({type: "LOGIN_FAILURE"},{payload:error})  
}
}