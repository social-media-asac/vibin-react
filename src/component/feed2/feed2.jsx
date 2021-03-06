import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
// import { Posts } from "../../dummyData";
import cookie from 'react-cookies';
import { LoginContext } from '../../context/authContext';
import AuthReducer from '../../context/authReducer';



export default function Feed({ username }) {
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
      let url = `https://vybin.herokuapp.com/api/v1/posts/timeline/${user.userId}`;
      let url2 = `https://vybin.herokuapp.com/api/v1/posts/profile/${username}`;

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

  }, [username])
  const onDelete = (id)=>{
setPosts(prev=> prev.filter(post=> post._id !== id))

  }
  const onUpdate =(id , desc)=>{ setPosts(prev=>{
   return  prev.map(item =>{
      if( item._id === id){
       return {...item , desc};
     } 
     return item;
    })

  })}
  const sharePosts = (postObj) => {
    setPosts(prev => [postObj,...prev]);
}
 
  return (
    <div className="feed">
      <div className="feedWrapper">
        {console.log('post from feed2',posts)}
        {user.username === username && <Share  sharePosts={sharePosts}  />}
        {posts.map((p) => (
          <Post onDelete={onDelete} key={p.id} post={p} onUpdate={onUpdate}  sharePosts={sharePosts} />
        ))}
      </div>
    </div>
  );
}