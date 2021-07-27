// import React from 'react';
// const RightBar= (props) =>{
//         return (
//             <>
//               <h4>Right Bar here</h4>
//             </>
//         )
// }
// export default RightBar;
import "./rightbar.css";
import {useEffect ,useState ,useContext} from "react";
import { Users } from "../../dummyData";
import Online from '../online/online';
import cookie from "react-cookies";
import axios from "axios";
import {Link} from "react-router-dom";
import {Add,Remove} from "@material-ui/icons"
import  {LoginContext}  from '../../context/authContext';
import {If,Else, Then} from "react-if";
// import {AuthContext} from '../../context/authContext2';
export default function Rightbar({ user }) {
const token =cookie.load('auth');

  // console.log('vvvvVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvvvv',user);
  
  const [friends, setFriends] = useState([]);
const [flag,setFlag] =useState(
  true
);
// console.log(flag,'flag8888888888888888888888888888888888888888')
  // const { user1, dispatch } = useContext(AuthContext);
  // console.log(user1,'user1')
  const contextType  = useContext(LoginContext);
  let userAccount = contextType.user.username;
  // console.log(userAccount,'friends');
  let data = contextType.userData.user;
  let data2=contextType.userData;
  // console.log(user._id,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  const { user:currentUser, dispatch } = useContext(LoginContext);
  const [followed, setFollowed] = useState(
    data?data.followings.includes(user?._id):false
  );
  // console.log(data2,'888888888888888888888888887777777777777777777777777777777777777');

  
  useEffect (()=>{
    const getFriends = async () =>{
      try{
        let url =`https://vybin.herokuapp.com/api/v1/users/followers/${user._id}`;
        let friendList =  await axios.get(url , { headers: {"Authorization" : `Bearer ${token}`} })
        // console.log(friendList,'friendList');
        setFriends(friendList.data);
      }
      catch(error){
       console.log(error);
      }
    }
    getFriends();
  },[user])
  const follow = async() => {
try {
    let url =`https://vybin.herokuapp.com/api/v1/users/follow/${user._id}`
   let res = await axios.put(url
    , {"body":null} 
      ,{ headers: {"Authorization" : `Bearer ${token}`}}
      )
      // console.log(res.data,'0000000000000000000000000000000000000000000000000')
      setFlag(false);
       dispatch({ type: "UNFOLLOW", payload: user._id });
} catch (error) {
  console.log(error);
}
  }
  const unFollow = async() => {
   try {
    let url =`https://vybin.herokuapp.com/api/v1/users/unfollow/${user._id}`
    await axios.put(url
      , {"body":null} 
      ,{ headers: {"Authorization" : `Bearer ${token}`}}
      )
      setFlag(true);
     dispatch({ type: "FOLLOW", payload: user._id });
   } catch (error) {
    //  console.log(error)
   }
      }
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Ahmad Arman</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {/* { console.log(friends,'farah!!')} */}
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    const currentUser =window.location.href.split('profile/').pop();
    return (
      <>
           {
            userAccount !== currentUser && 
           (
            <If condition={flag===true}>
             <button onClick={follow} type="button"className="rightBarFollowButton"> 
              Follow <Add />
              </button> 
             <Else> 
             <button onClick={unFollow} type="button"className="rightBarFollowButton"> 
              UnFollow <Remove />
              </button> 
             </Else>
             </If>
           ) }
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1 ?'Single' :user.relationship===2 ?'Married' : '-' }</span>
          </div>
        </div>
        {/* {console.log('ahmadhahahhahahhahhahahahhahah',friends)} */}
        <h4 className="rightbarTitle">User friends {`(${friends.length})`}</h4>
        <div className="rightbarFollowings"> 
        {/* { console.log(friends,'farah!!')} */}
        {friends.map((friend)=>(
        <Link to={`/profile/${friend.username}`} style={{textDecoration:"none"}}>
          <div className="rightbarFollowing">
            <img
              src={friend.profilePicture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB+CAMAAABWFa7EAAAAMFBMVEXEzeD////Y3uri5vDH0OLl6fL7/P3q7vTb4OzP1+by9Pj2+PrM1OTv8vfR2Ofo7PNNak5MAAAC/klEQVR4nO2cgXqCMAyEW0BAQX3/t90qYw61JVcKuTL+J8h9Jbk0jRpzcHBwcLB3+qJtS+0gFtK3TVfbbxrtSBbQF3c7ku+B9KfOPrlqhxPJ7WSn9NoRRdF29pVWO6YIyjcVjrN2WChF/VGHtYV2ZBD9xSMjs/rb+mV801Xa8Ulpgjqy+bwqX3b8IQdb7OdlZJEoZ5EOfouXnUcGZyLIjxFqk//s5h60gw2B6GAuXWEjzOhIrpgQ3p4eSHUH7bclr70DtBVYaoYjF+2AfRT/VUitHbAPyA4PIRtwCGHjEMLGboTc9iIENcROO2Afu2lR0E+LVgjaxtMKQdt42vvIbi5WkqnvLoWctAP2AgqhnTWCYy3bcM6D0A+L9kzQmuWgzJKYE+Ec0UUI4XxMDDxJ++DM9tnH3He0Q/4MekGkvVmh1xHaF1G8/lJWXwM+vDko/dBECLlpR+zhfc9sBs7qizeNpEXLoE5SE2/TQebOmiGO16XSIMz7Z4gn0s4ZHYgn0o4eHgAVmLOFHwGSRDvUMPLxL3WKGKBNYe2zRu7zEgaYi69DWrdoJ/G/COsWd81yyDyRPdUdon6LtYGfINDBesedIjBF7RBlzGcJ741qwry789feB/NCcqhZRlSAtUOUIRidaocoYzdVSzBLycIPJdbOPEB5Imgb2S8jA/M68mhRKoEQ7gnKg6qQ/IikLonHpQPiMQr7VVf8ox72IxE/trPfdaU67F070jDyKTb5nUQ81mLvt/byE1dkz5T5muj9x4qPkC7QGdPCe04NoZlU+EqN40JmJ33EitMPNVHSFxErZ38pOZKljFgBfOWqnizn+G9qSqe6p1nAazQhtMpxH1enQmjUsNvCBPdQnza9cFUpEtxHs9msaIFpyNgm8ZeahozVrQXvp2JZtYahu36kUrAmPQXr3OvBf29JQ3pjwffF05B6uJrexaWknbZAS5fESratVuspifkZWEqS5ckmXh4iUfelVbCeJFowUD+QREcieUpbmyQWr1uyBgSF6wti9iDUNVzcMwAAAABJRU5ErkJggg=='}
              alt=""
              className="rightbarFollowingImg"
              />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
              </Link>
          ))}
{/*           
          <div className="rightbarFollowing">
            <img
              src="assets/person/mousa.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Mousa Sabbah</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/tasnem.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Tasneem Wahebi</span>
          </div>
          <div className="rightbarFollowing"> 
            <img
              src="assets/person/anwars.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Anwar shrideh</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/farah.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Farah Wahebi</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/wesam.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Wesam almasri</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/anwara.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Anwar Abbas</span>
          </div> */}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}