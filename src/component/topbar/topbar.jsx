import './topbar.css';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from "react-router-dom";
import  {LoginContext}  from '../../context/authContext';
import { useState , useContext } from 'react';

export default function TopBar() {
    const contextType = useContext(LoginContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
     <Link to='/home' >   <span className="logo" >Vibein</span>  </Link> 
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
       <Link to="/"> <button  onClick={contextType.logout}>  <span className="topbarLink" >LogOut</span></button> </Link> 
          <Link to = {`user/:id`} >  <span className="topbarLink">My Profile </span>  </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="./assets/person/omar-ewies.jpg" alt="omar" className="topbarImg" />
      </div>
    </div>
  );
}