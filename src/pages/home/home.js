import React from 'react';

import TopBar from "../../component/topbar/topbar";
import SideBar from '../../component/sidebar/sidebar';
import RightBar from '../../component/rightbar/rightbar';

import Feed from "../../component/feed/feed";
 import "./home.css"

const Home = (props) =>{
    return (
        <>
          <TopBar />

          <div className="homeContainer">
        <SideBar />
        <Feed/>
        <RightBar/>
      </div>
            
        </>
    )
}
export default Home;  

  

