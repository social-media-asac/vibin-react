import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
// import { Posts } from "../../dummyData";
import cookie from 'react-cookies';
import { LoginContext } from '../../context/authContext';
import AuthReducer from '../../context/authReducer';
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {remove} from '../../store/simplePost';


 function Feed( props) {
  console.log(props,'propsItem///////////////////')
  const contextType = useContext(LoginContext);
  const contextFollow = useContext(AuthReducer);

  //  console.log('contextFollow',contextFollow);

  const token = cookie.load('auth');
  let user = contextType.user;

  // console.log('user from feed @@@@@@@@@@@@@@@@@@@@@2',user)
  // console.log('token from feed',token);

  const [posts, setPosts] = useState([]);

  //  console.log('username',username)
  
  useEffect(() => {

    const fetchPosts = async () => {
      // let url = `https://vybin.herokuapp.com/api/v1/posts/timeline/${user.userId}`;
      let url2 = `https://vybin.herokuapp.com/api/v1/posts/profile/${props.username}`;

      let res =
        //  username ?
        await axios.get(url2, { headers: { "Authorization": `Bearer ${token}` } })
      //  :await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })


      // setPosts(res.data);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );


    }
    fetchPosts();

  }, [props.username,token])
  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {user.username === username && <Share />} */}
        {posts.map((p) => (
          <>
          <Post key={p.id} post={p} />
          {/* <Button onClick={ ()=>{props.remove(p)}} > X </Button> */}
          </>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state =>({
  post :state.post ? state.post : null,
 
})

const mapDispatchToProps = { remove };

export default connect(mapStateToProps,mapDispatchToProps)(Feed)