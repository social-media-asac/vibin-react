import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginContext } from '../../context/authContext';
import { Add, Remove } from "@material-ui/icons";
import cookie from 'react-cookies';
const token = cookie.load('auth');


export default function Rightbar({ user }) {
  const PF = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(LoginContext);
  const loggedinUser= useContext(LoginContext)

  console.log(loggedinUser,'ZZZZZZZZZZZZZZZZZZZZZZZZz')
  // const followings= loggedinUser.userData.user.followings;

  const [followed, setFollowed] = useState(
    // followings?.includes(user?.id)
  );


  // console.log(followings,'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYy')


  console.log(user, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

  useEffect(() => {
    const getFriends = async () => {
      try {
        let userId = user._id;
        let url = `https://vybin.herokuapp.com/api/v1/users/followers/${userId}`
        const friendList = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {

        let userId = user._id;
        let url = `https://vybin.herokuapp.com/api/v1/users/unfollow/${userId}`;

        axios.put(url, {"body":null}, {headers: { "Authorization": `Bearer ${token}`}});

        // axios.put(url, { headers: { "Authorization": `Bearer ${token}` } })
        // await axios.put(url,{ headers: { "Authorization": `Bearer ${token}` } } );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        let userId = user._id;
        let url = `https://vybin.herokuapp.com/api/v1/users/follow/${userId}`;
        axios.put(url, {"body":null}, {headers: { "Authorization": `Bearer ${token}`}});
        // await axios.put(url, { headers: { "Authorization": `Bearer ${token}` } });
        dispatch({
          type: "FOLLOW", payload: user._id
        });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err)
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Anwar Shraideh</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
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
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                  ? "Married"
                  : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
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