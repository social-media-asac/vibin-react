import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
// import { Posts } from "../../dummyData";
import cookie from 'react-cookies';
const token = cookie.load('auth');

console.log(token, 'TOKEN TOKEN TOKEN')

export default function Feed({username}) {

  console.log('token from feed',token);
  const [posts,setPosts] = useState([]);
 console.log('username',username)
  useEffect(() => {
  
    const fetchPosts = async()=>{
      // let url =`https://vybin.herokuapp.com/api/v1/posts/timeline/60f84736f3ab2a0015e9c267`;
      let url2 =`https://vybin.herokuapp.com/api/v1/posts/profile/${username}`;

      let res = 
      // username ?
       await axios.get(url2 , { headers: {"Authorization" : `Bearer ${token}`} })
      // :await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
      
      
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      

    } 
    fetchPosts();

  },[])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}