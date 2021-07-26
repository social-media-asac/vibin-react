import './topbar.css';
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from "react-router-dom";
import  {LoginContext}  from '../../context/authContext';
import { useState , useContext ,useEffect} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Setting from '../setting/setting'
export default function TopBar({username}) {
    const contextType = useContext(LoginContext);
    const [user,setUser] =useState({});
    const token = cookie.load('auth');
    useEffect(() => {
  
      const fetchPosts = async()=>{
        let url =`https://vybin.herokuapp.com/api/v1/users?username=${username}`;
        let res =  await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
        
        console.log(res.data,'res.data');
         setUser(res.data);
        
    
      } 
      fetchPosts();
    
    },[])

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
     <Link to='/' >   <span className="logo" >Vibein</span>  </Link> 
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
       <Link to={`/profile/${contextType.user.username}`}>
            <span className="topbarLink">My Profile </span>  </Link>
          <Link to='/setting' >  <span className="topbarLink">Setting </span>  </Link>
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
        <img   src={user.profilePicture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB+CAMAAABWFa7EAAAAMFBMVEXEzeD////Y3uri5vDH0OLl6fL7/P3q7vTb4OzP1+by9Pj2+PrM1OTv8vfR2Ofo7PNNak5MAAAC/klEQVR4nO2cgXqCMAyEW0BAQX3/t90qYw61JVcKuTL+J8h9Jbk0jRpzcHBwcLB3+qJtS+0gFtK3TVfbbxrtSBbQF3c7ku+B9KfOPrlqhxPJ7WSn9NoRRdF29pVWO6YIyjcVjrN2WChF/VGHtYV2ZBD9xSMjs/rb+mV801Xa8Ulpgjqy+bwqX3b8IQdb7OdlZJEoZ5EOfouXnUcGZyLIjxFqk//s5h60gw2B6GAuXWEjzOhIrpgQ3p4eSHUH7bclr70DtBVYaoYjF+2AfRT/VUitHbAPyA4PIRtwCGHjEMLGboTc9iIENcROO2Afu2lR0E+LVgjaxtMKQdt42vvIbi5WkqnvLoWctAP2AgqhnTWCYy3bcM6D0A+L9kzQmuWgzJKYE+Ec0UUI4XxMDDxJ++DM9tnH3He0Q/4MekGkvVmh1xHaF1G8/lJWXwM+vDko/dBECLlpR+zhfc9sBs7qizeNpEXLoE5SE2/TQebOmiGO16XSIMz7Z4gn0s4ZHYgn0o4eHgAVmLOFHwGSRDvUMPLxL3WKGKBNYe2zRu7zEgaYi69DWrdoJ/G/COsWd81yyDyRPdUdon6LtYGfINDBesedIjBF7RBlzGcJ741qwry789feB/NCcqhZRlSAtUOUIRidaocoYzdVSzBLycIPJdbOPEB5Imgb2S8jA/M68mhRKoEQ7gnKg6qQ/IikLonHpQPiMQr7VVf8ox72IxE/trPfdaU67F070jDyKTb5nUQ81mLvt/byE1dkz5T5muj9x4qPkC7QGdPCe04NoZlU+EqN40JmJ33EitMPNVHSFxErZ38pOZKljFgBfOWqnizn+G9qSqe6p1nAazQhtMpxH1enQmjUsNvCBPdQnza9cFUpEtxHs9msaIFpyNgm8ZeahozVrQXvp2JZtYahu36kUrAmPQXr3OvBf29JQ3pjwffF05B6uJrexaWknbZAS5fESratVuspifkZWEqS5ckmXh4iUfelVbCeJFowUD+QREcieUpbmyQWr1uyBgSF6wti9iDUNVzcMwAAAABJRU5ErkJggg=='}
                alt=""
                 className="topbarImg" />
      </div>
    </div>
  );
}