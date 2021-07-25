import "./profile.css";
import TopBar from "../../component/topbar/topbar";
import Sidebar from "../../component/sidebar/sidebar";
import Feed from "../../component/feed/feed";
import RightBar from "../../component/rightbar/rightbar";
import { useState, useEffect ,useContext} from "react";
import cookie from 'react-cookies';
import axios from 'axios';
import { useParams } from "react-router";
import  {LoginContext}  from '../../context/authContext';

const token = cookie.load('auth');
export default function Profile() {
  const contextType  = useContext(LoginContext);
  // let user = contextType.userData.user;
  // console.log('user@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2', user);
  const [user, setUser] = useState([])
 console.log('contextType in profile page ',contextType)
  const username = useParams().username;
//   useEffect(() => {
//     const getAllRequest = async () => {
//       const userInfoFromAPI = await fetchUserInfo()
//       setProfile(userInfoFromAPI)
//   }
//   getAllRequest()
// }, [])
//  // Fetch allRequest
//  const fetchUserInfo = async (_id) => {
//   const res = await fetch(`https://vybin.herokuapp.com/api/v1/users/60f84736f3ab2a0015e9c267`,{
//     method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token,
//       }
//   })
//   console.log(res,'res');
//   const data = await res.json()
//   console.log(data, 'get all request');
//   return data;
// }
useEffect(() => {
  
  const fetchPosts = async()=>{
    let url =`https://vybin.herokuapp.com/api/v1/users?username=${username}`;
    let res =  await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
    
    
     setUser(res.data);
    

  } 
  fetchPosts();

},[username])
  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user?user.coverPicture :  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB+CAMAAABWFa7EAAAAMFBMVEXEzeD////Y3uri5vDH0OLl6fL7/P3q7vTb4OzP1+by9Pj2+PrM1OTv8vfR2Ofo7PNNak5MAAAC/klEQVR4nO2cgXqCMAyEW0BAQX3/t90qYw61JVcKuTL+J8h9Jbk0jRpzcHBwcLB3+qJtS+0gFtK3TVfbbxrtSBbQF3c7ku+B9KfOPrlqhxPJ7WSn9NoRRdF29pVWO6YIyjcVjrN2WChF/VGHtYV2ZBD9xSMjs/rb+mV801Xa8Ulpgjqy+bwqX3b8IQdb7OdlZJEoZ5EOfouXnUcGZyLIjxFqk//s5h60gw2B6GAuXWEjzOhIrpgQ3p4eSHUH7bclr70DtBVYaoYjF+2AfRT/VUitHbAPyA4PIRtwCGHjEMLGboTc9iIENcROO2Afu2lR0E+LVgjaxtMKQdt42vvIbi5WkqnvLoWctAP2AgqhnTWCYy3bcM6D0A+L9kzQmuWgzJKYE+Ec0UUI4XxMDDxJ++DM9tnH3He0Q/4MekGkvVmh1xHaF1G8/lJWXwM+vDko/dBECLlpR+zhfc9sBs7qizeNpEXLoE5SE2/TQebOmiGO16XSIMz7Z4gn0s4ZHYgn0o4eHgAVmLOFHwGSRDvUMPLxL3WKGKBNYe2zRu7zEgaYi69DWrdoJ/G/COsWd81yyDyRPdUdon6LtYGfINDBesedIjBF7RBlzGcJ741qwry789feB/NCcqhZRlSAtUOUIRidaocoYzdVSzBLycIPJdbOPEB5Imgb2S8jA/M68mhRKoEQ7gnKg6qQ/IikLonHpQPiMQr7VVf8ox72IxE/trPfdaU67F070jDyKTb5nUQ81mLvt/byE1dkz5T5muj9x4qPkC7QGdPCe04NoZlU+EqN40JmJ33EitMPNVHSFxErZ38pOZKljFgBfOWqnizn+G9qSqe6p1nAazQhtMpxH1enQmjUsNvCBPdQnza9cFUpEtxHs9msaIFpyNgm8ZeahozVrQXvp2JZtYahu36kUrAmPQXr3OvBf29JQ3pjwffF05B6uJrexaWknbZAS5fESratVuspifkZWEqS5ckmXh4iUfelVbCeJFowUD+QREcieUpbmyQWr1uyBgSF6wti9iDUNVzcMwAAAABJRU5ErkJggg=='}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB+CAMAAABWFa7EAAAAMFBMVEXEzeD////Y3uri5vDH0OLl6fL7/P3q7vTb4OzP1+by9Pj2+PrM1OTv8vfR2Ofo7PNNak5MAAAC/klEQVR4nO2cgXqCMAyEW0BAQX3/t90qYw61JVcKuTL+J8h9Jbk0jRpzcHBwcLB3+qJtS+0gFtK3TVfbbxrtSBbQF3c7ku+B9KfOPrlqhxPJ7WSn9NoRRdF29pVWO6YIyjcVjrN2WChF/VGHtYV2ZBD9xSMjs/rb+mV801Xa8Ulpgjqy+bwqX3b8IQdb7OdlZJEoZ5EOfouXnUcGZyLIjxFqk//s5h60gw2B6GAuXWEjzOhIrpgQ3p4eSHUH7bclr70DtBVYaoYjF+2AfRT/VUitHbAPyA4PIRtwCGHjEMLGboTc9iIENcROO2Afu2lR0E+LVgjaxtMKQdt42vvIbi5WkqnvLoWctAP2AgqhnTWCYy3bcM6D0A+L9kzQmuWgzJKYE+Ec0UUI4XxMDDxJ++DM9tnH3He0Q/4MekGkvVmh1xHaF1G8/lJWXwM+vDko/dBECLlpR+zhfc9sBs7qizeNpEXLoE5SE2/TQebOmiGO16XSIMz7Z4gn0s4ZHYgn0o4eHgAVmLOFHwGSRDvUMPLxL3WKGKBNYe2zRu7zEgaYi69DWrdoJ/G/COsWd81yyDyRPdUdon6LtYGfINDBesedIjBF7RBlzGcJ741qwry789feB/NCcqhZRlSAtUOUIRidaocoYzdVSzBLycIPJdbOPEB5Imgb2S8jA/M68mhRKoEQ7gnKg6qQ/IikLonHpQPiMQr7VVf8ox72IxE/trPfdaU67F070jDyKTb5nUQ81mLvt/byE1dkz5T5muj9x4qPkC7QGdPCe04NoZlU+EqN40JmJ33EitMPNVHSFxErZ38pOZKljFgBfOWqnizn+G9qSqe6p1nAazQhtMpxH1enQmjUsNvCBPdQnza9cFUpEtxHs9msaIFpyNgm8ZeahozVrQXvp2JZtYahu36kUrAmPQXr3OvBf29JQ3pjwffF05B6uJrexaWknbZAS5fESratVuspifkZWEqS5ckmXh4iUfelVbCeJFowUD+QREcieUpbmyQWr1uyBgSF6wti9iDUNVzcMwAAAABJRU5ErkJggg=='}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed  username={username}/>
            {console.log(user,'userfromrightbar')}
            <RightBar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}