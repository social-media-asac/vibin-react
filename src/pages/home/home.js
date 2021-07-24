import React ,{useContext} from 'react';

import TopBar from "../../component/topbar/topbar";
import SideBar from '../../component/sidebar/sidebar';
import RightBar from '../../component/rightbar/rightbar';
import  {LoginContext}  from '../../context/authContext';
import Feed from "../../component/feed/feed";
 import "./home.css"

const Home = (props) =>{
  const contextType  = useContext(LoginContext);
  console.log(contextType,'contextType from home page ')
    return (
        <>
          <TopBar />

          <div className="homeContainer">
        <SideBar />
        <Feed username={contextType.user.username}/>
        <RightBar/>
      </div>
            
        </>
    )
}
export default Home;  

  

