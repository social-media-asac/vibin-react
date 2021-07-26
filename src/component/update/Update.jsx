import React,{useEffect, useState } from 'react'

// function Update() {
//     return (
//         <button> update </button>

//     )
// }

// export default Update

import { Button,Modal,Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { When } from 'react-if';
import cookie from 'react-cookies';
const token = cookie.load('auth');

const Update = (props) =>{
    
  console.log(props.Provider.desc,'***********')
  const [post,setUpdPost] = useState({});
  const [redirect,setRedirect] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeHandle = e =>{
    setUpdPost({...post,[e.target.name]:e.target.value})
  }
  const updatePost = e =>{
    e.preventDefault();
    fetchUpdPost(post);
}




// Fetch Request to update it
const fetchUpdPost = async (updPost) =>{
  console.log('click',updPost);
  let res = await fetch(`https://vybin.herokuapp.com/api/v1/posts/${props.Provider._id}`,{
    method: 'PUT',
    body: JSON.stringify(updPost),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
        let result = await res.json();
        console.log(result, 'update post result');
        setRedirect('/');
        return result;
      }
        return (
            <>
            <When condition={redirect}><Redirect to={redirect}></Redirect></When>
              <Button variant='primary' onClick={handleShow}>edit</Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
              >
              <Modal.Header closeButton>
               <Modal.Title>Update Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
                  <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control name='desc' type='text' defaultValue={props.Provider.desc} onChange={changeHandle}></Form.Control>
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
                <Button variant='primary' onClick={updatePost}><Button onClick={handleClose}>Update</Button></Button>
              </Modal.Footer>
              </Modal>
            </>
        )
}
export default Update;