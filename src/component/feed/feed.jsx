import Post from "../post/post";
import Share from "../share/share";
import "./feed.css";
import React ,{useState,useEffect} from "react";
import axios from 'axios';
// import { Posts } from "../../dummyData";
import cookie from 'react-cookies';
const token = cookie.load('auth');

export default function Feed() {
  console.log('token from feed',token);
  const [posts,setPosts] = useState([]);
 let url ='https://vybin.herokuapp.com/api/v1/posts/timeline/60f84736f3ab2a0015e9c267';
  useEffect(() => {
    
    const fetchPosts = async()=>{
     await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
      console.log(res.data);
      setPosts(res.data);
      })

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