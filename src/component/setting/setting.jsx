import { useState, useContext } from 'react';
import { LoginContext } from '../../context/authContext';
import { Link, Redirect } from 'react-router-dom';
import { When } from 'react-if';
import axios from 'axios';
import './setting.css';
import TopBar from '../topbar/topbar';

// import {AuthContextProvider} from './context/authContext2';
import { Form, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
const token = cookie.load('auth');
// console.log('token 5555555555', token);
function Setting() {
  const contextType = useContext(LoginContext);
  let userAccount = contextType.user;

  const [userInfo, setuserInfo] = useState({});
  const [redirect, setRedirect] = useState(null);
  // console.log('userInfo /////////', userInfo);

  
  const updateHandler = (e) => {
    e.preventDefault();
    fetchUpdPost(userInfo);
    // console.log('e.target **********', e.target.relationship.value);
    setuserInfo(
      {
        profilePicture: e.target.profilePicture.value,
        coverPicture: e.target.coverPicture.value,
        desc: e.target.desc.value,
        city: e.target.city.value,
        from: e.target.from.value,
        relationship: e.target.relationship.value,
        password: e.target.password.value,
      }
    )
    
  }
  let userId = contextType.user.userId
  const fetchUpdPost = async (user) => {
    // console.log('click',user);
    let res = await fetch(`https://vybin.herokuapp.com/api/v1/users/${userAccount.userId}`,{
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
          let result = await res.json();
          // console.log(result, 'update  result');
          // setRedirect('/');
          return result;
    // let url = `https://vybin.herokuapp.com/api/v1/users/${userId}`;
    // let result = await axios.put(
    //   url,
    //   { body: JSON.stringify(user) },
    //   { headers: { "Authorization": `Bearer ${token}` } }
    // )
    // let res = await result;
    // console.log('USER####################',user)
    // console.log('body********',JSON.stringify(user));
    // console.log('data666666666666rrrrrrrrrrrr', res);
    // return res;
  }
  
  // const changeHandle = e => {
  //   setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
  // }
  const deleteAccount = async()=>{
    
    let url = `https://vybin.herokuapp.com/api/v1/users/${userId}`
    await axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } })
    setRedirect('/');
  }
  return (

    <>
    <TopBar/>
    <div id="formSetting">
      {/* <When condition={redirect}><Redirect to={redirect}></Redirect></When> */}
      <Form  onSubmit={updateHandler}>
        <Form.Group className="mb-3" >
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control name="profilePicture" type="text" placeholder="Change your profile picture" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Cover Picture </Form.Label>
          <Form.Control name="coverPicture" type="text" placeholder="Change you cover picture" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Bio </Form.Label>
          <Form.Control name="desc" type="text" placeholder="Describe yourself"  />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>City </Form.Label>
          <Form.Control  name="city" type="text" placeholder="Where do you live" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>From </Form.Label>
          <Form.Control name="from" type="text" placeholder="Where are you from?" />
        </Form.Group>
     
        {/* <Form.Group className="mb-3" >
          <Form.Label>Relationship : </Form.Label>
          <Form.Control name="relationship" type="number" placeholder="Where are you from?" />
        </Form.Group> */}

        <select class="form-select" aria-label="Default select example" name="relationship">
          <option id="relationship" name="relationship" value="1"> single </option>
          <option id="relationship" name="relationship" value="2"> Married </option>
          <option id="relationship" name="relationship" value="3"> other </option>
        </select>
        <Form.Group className="mb-3" >
          <Form.Label>Password </Form.Label>
          <Form.Control name="password" type="password" placeholder="Change your password" />
        </Form.Group>

        {/* <Link to ={`/`}>  */}
        <Button variant="primary" type="submit" >
          Submit
        </Button>
       {/* </Link> */}
      </Form>
      
       <br></br>
       <Form>
       <Form.Group>
    <Link to ={`/`}> <Button className="deactivateAcoount" > Cancle</Button></Link></Form.Group></Form> 
      <Form>
       <Form.Group>
<When condition={redirect}><Redirect to={redirect}></Redirect></When>
     <Button  onClick={deleteAccount}> Deactivate my account</Button></Form.Group></Form>
     
    </div>
    </>
  );
}

export default Setting;