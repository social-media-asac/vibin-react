import './topbar.css';
import { Search, Person, Chat, Notifications  } from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from "react-router-dom";
import  {LoginContext}  from '../../context/authContext';
import { useState , useContext ,useEffect} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Setting from '../setting/setting'
import { connect } from "react-redux";
 function TopBar(props) {
  console.log(props,
    'props from topbar')
    const contextType = useContext(LoginContext);
    const[extra,setExtra]=useState({});
    const [user,setUser] =useState({});
    const [username1,setUsername] =useState('')
    const token = cookie.load('auth');
    let userId = contextType.user.userId;
    const WAIT_TIME = 5000
    // useEffect(() => {
    //   const id = setInterval(() => {
    //   let url = `https://vybin.herokuapp.com/api/v1/users?userId=${userId}`;
    //   const fetchUser = async () => {
    //     await axios
    //       .get(url, { headers: { Authorization: `Bearer ${token}` } })
    //       .then((res) => {
    //         // console.log(res.data);
    //         setExtra(res.data);
    //       });
    //   };
      
    //   fetchUser();
    // }, WAIT_TIME);
    // return () => clearInterval(id);
    // }, [extra]);


    // useEffect(() => {
  
    //   const fetchPosts = async()=>{
    //     let url =`https://vybin.herokuapp.com/api/v1/users?username=${props.username}`;
    //     let res =  await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
        
    //     // console.log(res.data,'res.data');
    //      setUser(res.data);
        
    
    //   } 
    //   fetchPosts();
    
    // },[props.username,token])
    const handlerChange = (e) => {
      e.preventDefault();
      let value = document.getElementById('search').value
     //  let value = e.target.search.value;
      const fetchPosts = async()=>{
         let url =`https://vybin.herokuapp.com/api/v1/users?username=${value}`;
         let res =  await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
        //  console.log(res.data,'res.data');
         //  setUser(res.data);
         document.getElementById('search').value='';
         document.getElementById('search').placeholder='';
         
         // e.target.search.value='';
         // e.target.search.placeholder='';
         // e.target.btn.value='';
     setUsername(res.data);
       } 
       fetchPosts();
       setUsername('');
     }
  return (
    <div className="topbarContainer">
      {/* <div className="topbarLeft">
     <Link to='/' >   <span className="logo" >Vibein</span>  </Link> 
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div> */}
        <div className="topbarLeft">
     <Link to='/' style={{textDecoration: 'none'}}>   <span className="logo"   >Vibein</span>  </Link> 
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          {/* <Search className="searchIcon" /> */}
          {/* <form onSubmit={handlerChange}> */}
<input
  placeholder="Search for friend, post or video"
  className="searchInput"
  id="search"
  />
{/* { console.log(username1,'!!!!!@@@@@@@#####$$$$$%%%%%^^^^^')     }   */}
<button type="submit" className="search" id="btn" onClick={handlerChange} > <Search className="searchIcon"  /> </button>
  {/* </form>  */}
            {username1? <Link  to={"/profile/"+username1.username} style={{textDecoration:"none"}}>
          {/* <div  >
           <span> <img className="searchImg" src={username1.profilePicture} alt="" /> </span> 
          </div> */}
        </Link> :null}
        {username1? <Link  to={"/profile/"+username1.username} style={{textDecoration:"none"}}>
          <div  >
            <span className="searchUser" style={{marginBottom:"30px"}}>{username1.username}</span>
          </div>
        </Link> :null}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        
       <Link to="/"> <Button  onClick={contextType.logout}>  <span className="topbarLink" ><ExitToAppIcon/></span></Button> </Link> 
       {/* <Link to={`/profile/${contextType.user.username}`}>
            <span className="topbarLink">My Profile </span>  </Link> */}
          {/* <Link to='/setting' >  <span className="topbarLink">Setting </span>  </Link> */}
        </div>
        <div className="topbarIcons">
        <Link to='/setting' >
          <div className="topbarIconItem2">
            <SettingsIcon />
            {/* <span className="topbarIconBadge">new</span> */}
          </div>
          </Link>
          <div className="topbarIconItem2">
           
            <a href={'https://video-chat-vybin.herokuapp.com/'} target={"_blank"} > <Chat /> </a>
            {/* <span className="topbarIconBadge">5</span> */}
          </div>
          {/* <Button  onClick={contextType.logout}> <ExitToAppIcon/></Button> */}
          {/* <Link to="/"> 
          { <div className="topbarIconItem">
            {/* <span className="topbarIconBadge">1</span> */}
          {/* </div> 
           </Link>*/} 
         </div>  
        <Link to={`/profile/${contextType.user.username}`}>

        <img   src={extra.profilePicture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB+CAMAAABWFa7EAAAAMFBMVEXEzeD////Y3uri5vDH0OLl6fL7/P3q7vTb4OzP1+by9Pj2+PrM1OTv8vfR2Ofo7PNNak5MAAAC/klEQVR4nO2cgXqCMAyEW0BAQX3/t90qYw61JVcKuTL+J8h9Jbk0jRpzcHBwcLB3+qJtS+0gFtK3TVfbbxrtSBbQF3c7ku+B9KfOPrlqhxPJ7WSn9NoRRdF29pVWO6YIyjcVjrN2WChF/VGHtYV2ZBD9xSMjs/rb+mV801Xa8Ulpgjqy+bwqX3b8IQdb7OdlZJEoZ5EOfouXnUcGZyLIjxFqk//s5h60gw2B6GAuXWEjzOhIrpgQ3p4eSHUH7bclr70DtBVYaoYjF+2AfRT/VUitHbAPyA4PIRtwCGHjEMLGboTc9iIENcROO2Afu2lR0E+LVgjaxtMKQdt42vvIbi5WkqnvLoWctAP2AgqhnTWCYy3bcM6D0A+L9kzQmuWgzJKYE+Ec0UUI4XxMDDxJ++DM9tnH3He0Q/4MekGkvVmh1xHaF1G8/lJWXwM+vDko/dBECLlpR+zhfc9sBs7qizeNpEXLoE5SE2/TQebOmiGO16XSIMz7Z4gn0s4ZHYgn0o4eHgAVmLOFHwGSRDvUMPLxL3WKGKBNYe2zRu7zEgaYi69DWrdoJ/G/COsWd81yyDyRPdUdon6LtYGfINDBesedIjBF7RBlzGcJ741qwry789feB/NCcqhZRlSAtUOUIRidaocoYzdVSzBLycIPJdbOPEB5Imgb2S8jA/M68mhRKoEQ7gnKg6qQ/IikLonHpQPiMQr7VVf8ox72IxE/trPfdaU67F070jDyKTb5nUQ81mLvt/byE1dkz5T5muj9x4qPkC7QGdPCe04NoZlU+EqN40JmJ33EitMPNVHSFxErZ38pOZKljFgBfOWqnizn+G9qSqe6p1nAazQhtMpxH1enQmjUsNvCBPdQnza9cFUpEtxHs9msaIFpyNgm8ZeahozVrQXvp2JZtYahu36kUrAmPQXr3OvBf29JQ3pjwffF05B6uJrexaWknbZAS5fESratVuspifkZWEqS5ckmXh4iUfelVbCeJFowUD+QREcieUpbmyQWr1uyBgSF6wti9iDUNVzcMwAAAABJRU5ErkJggg=='}
                alt=""
                className="topbarImg" />
                </Link>
      </div>
    </div>
  );
}

const mapStateToProps = state =>({
  post :state.post ? state.post : null,
 
})

// const mapDispatchToProps = { remove };

export default connect(mapStateToProps)(TopBar)