import React from 'react';
import Headar from '../component/header/headar';
import SideBar from '../component/sidebar/sidebar';
import RightBar from '../component/rightbar/rightbar';
import Post from '../component/post/post';

const Home = (props) =>{
    return (
        <>
          <Headar/>
          <RightBar/>
          <Post/>
          <SideBar/>  
        </>
    )
}
export default Home;  