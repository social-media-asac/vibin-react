import React,{useEffect, useState ,useContext} from 'react'

import {LoginContext} from '../../context/authContext'
import axios from 'axios';
import { Button,Modal,Form} from 'react-bootstrap';
import { Redirect ,Link} from 'react-router-dom';
import { When } from 'react-if';
import cookie from 'react-cookies';
// import { LoginContext } from '../../context/authContext';
const token = cookie.load('auth');

const Delete = (props) =>{
    const contextType =useContext(LoginContext);
const username =contextType.user.username;
  // console.log(props.Provider.desc,'***********')
  const [user, setUser] = useState({});
  const [boolean, setBoolean] = useState(false);
  const [redirect,setRedirect] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const deletePost = e =>{
    e.preventDefault();
    deleteHandler();
}
console.log(props.Provider.userId);
    useEffect(() => {
        // const id = setInterval(() => {
        let url = `https://vybin.herokuapp.com/api/v1/users?userId=${props.Provider.userId}`;
        const fetchUser = async () => {
          await axios
            .get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
    
              // console.log(res.data);
    
              setUser(res.data);
            });
        };
    
        fetchUser();
        // }, WAIT_TIME);
        // return () => clearInterval(id);
      }, [props.Provider.userId]);

const deleteHandler = async () => {
    setBoolean(true);
    let postId = props.Provider._id;
    let url = `https://vybin.herokuapp.com/api/v1/posts/${postId}`;
    await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    // window.location.reload();
  };









        return (
            <>
            <When condition={redirect}><Redirect to={redirect}></Redirect></When>
              <Button variant='primary' onClick={handleShow}>Delete</Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
              >
              <Modal.Header closeButton>
               <Modal.Title>Delete Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
                  <Form.Group>
                      <Form.Label>Are you sure to remove your post ?</Form.Label>
                      {/* <Form.Control name='desc' type='text' ></Form.Control> */}
                  </Form.Group>
                  {/* <Form.Group>
                  <Form.Label>Updated Date</Form.Label>
                  <Form.Control
                    name='createdAt'
                    required
                    type='time'
                    defaultValue={new Date ()}
                  />
                  </Form.Group> */}
              </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='primary' onClick={deletePost}>
                    {console.log(username)}
              <Link to={'/'}>
                    <Button onClick={handleClose}>YES</Button>
                </Link>
                    </Button>
              </Modal.Footer>
                  
              </Modal>
            </>
        )
}
export default Delete;