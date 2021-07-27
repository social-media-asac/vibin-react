import {Link} from 'react-router-dom'
import {useState} from 'react';
import cookie from 'react-cookies';
export default  function SearchUser({user})  {
    let data=cookie.load('data')
    const [userI,setUser]= useState(user)
    console.log(userI,'***************************///////////')
    console.log(data,'@@@@@@@@2222222222222222222222')
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
        <Link  to={`/profile/${data.username}`}>

        <ul className="rightbarFriendList">
         {data.username}
        </ul>
        </Link>
      </>
    );
  };
