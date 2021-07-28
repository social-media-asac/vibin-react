import Post2 from "../post2/post2";
import Share from "../share/share";
import "./feed.css";
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import { LoginContext } from '../../context/authContext';
import AuthReducer from '../../context/authReducer';


export default function Feed({ username }) {
  const contextType = useContext(LoginContext);
  const contextFollow = useContext(AuthReducer);

  // console.log('contextFollow', contextFollow);

  const token = cookie.load('auth');
  let user = contextType.user;

  // console.log('user from feed @@@@@@@@@@@@@@@@@@@@@2', user)
  // console.log('token from feed', token);

  const [posts2, setPosts2] = useState([]);
  // console.log('username', username)

  useEffect(() => {

    const fetchPosts = async () => {
      let url = `https://vybin.herokuapp.com/api/v1/posts/timeline/${user.userId}`;
      let url2 = `https://vybin.herokuapp.com/api/v1/posts/profile/${username}`;

      let res =
        //  username ?
        await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
      //  :await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })



      // setPosts(res.data);
      setPosts2(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );

    }
    fetchPosts();

  }, [username])
  const sharePosts2 = (postObj) => {
    setPosts2(prev => [postObj,...prev]);
}

  return (
    <div className="feed">
      <div className="feedWrapper">
        {user.username === username && <Share sharePosts2={sharePosts2} />}
        {posts2.map((p) => (
          <Post2 key={p.id} post={p} sharePosts2={sharePosts2} />
        ))}
      </div>
    </div>
  );
}