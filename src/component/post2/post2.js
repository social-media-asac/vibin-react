import "./post.css";
// import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import cookie from "react-cookies";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { If, Then, Else } from "react-if";
import Update from "../update/Update";
// import Delete from '../delete/Delete';
import Share from "../share/share";
import { LoginContext } from "../../context/authContext";
import { Button } from "react-bootstrap";
const token = cookie.load("auth");
let IconLike =
  "https://image.similarpng.com/very-thumbnail/2020/06/Icon-like-button-transparent-PNG.png";
let IconLove =
  "https://icon-library.com/images/facebook-love-icon-png/facebook-love-icon-png-23.jpg";
export default function Post2({ post , sharePosts2 }) {
  const contextType = useContext(LoginContext);
  let userInfo = contextType.user;
  // console.log('userInfo', userInfo);
  // let userId = contextType.user.userId;
  // console.log('contextType from post', contextType);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const [boolean, setBoolean] = useState(false);
   const WAIT_TIME = 5000
  useEffect(() => {
    // const id = setInterval(() => {
    let url = `https://vybin.herokuapp.com/api/v1/users?userId=${post.userId}`;
    const fetchUser = async () => {
      await axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          // console.log(res.data);
          setUser(res.data);
        });
    };
    
    fetchUser();
  // }, WAIT_TIME);
  // return () => clearInterval(id);
  }, [post]);

  // const likeHandler = () => {
  //   setLike(isLiked ? like - 1 : like + 1)
  //   setIsLiked(!isLiked)
  // }

  // const [boolean, setBoolean] = useState(false);

  // const deleteHandler = async () => {
  useEffect(() => {
    // console.log(userInfo.userId, "userInfo.userId@@@@@@@");

    setIsLiked(post.likes.includes(userInfo.userId));
  }, [userInfo.userId, post.likes]);
  const likeHandler = async () => {
    let url = `https://vybin.herokuapp.com/api/v1/posts/like/${post._id}`;
    // console.log(url, "|||||||||||||||||||||||||||||||||");
    let res = await axios.put(
      url,
      { body: null },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(res, "eeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = async () => {
    setBoolean(true);
    let postId = post._id;
    let url = `https://vybin.herokuapp.com/api/v1/posts/${postId}`;
    await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    // window.location.reload();
  };
  // console.log(post, "POST POST");
  console.log('sharePosts2 from post 2',sharePosts2);

  return (
    <If>
      <Then>
        <Share sharePosts2={sharePosts2}  />
       
      </Then>

      <Else>
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/user/${post.userId}`}>
                  <img
                    className="postProfileImg"
                    src={
                      user.profilePicture ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB+CAMAAABWFa7EAAAAMFBMVEXEzeD////Y3uri5vDH0OLl6fL7/P3q7vTb4OzP1+by9Pj2+PrM1OTv8vfR2Ofo7PNNak5MAAAC/klEQVR4nO2cgXqCMAyEW0BAQX3/t90qYw61JVcKuTL+J8h9Jbk0jRpzcHBwcLB3+qJtS+0gFtK3TVfbbxrtSBbQF3c7ku+B9KfOPrlqhxPJ7WSn9NoRRdF29pVWO6YIyjcVjrN2WChF/VGHtYV2ZBD9xSMjs/rb+mV801Xa8Ulpgjqy+bwqX3b8IQdb7OdlZJEoZ5EOfouXnUcGZyLIjxFqk//s5h60gw2B6GAuXWEjzOhIrpgQ3p4eSHUH7bclr70DtBVYaoYjF+2AfRT/VUitHbAPyA4PIRtwCGHjEMLGboTc9iIENcROO2Afu2lR0E+LVgjaxtMKQdt42vvIbi5WkqnvLoWctAP2AgqhnTWCYy3bcM6D0A+L9kzQmuWgzJKYE+Ec0UUI4XxMDDxJ++DM9tnH3He0Q/4MekGkvVmh1xHaF1G8/lJWXwM+vDko/dBECLlpR+zhfc9sBs7qizeNpEXLoE5SE2/TQebOmiGO16XSIMz7Z4gn0s4ZHYgn0o4eHgAVmLOFHwGSRDvUMPLxL3WKGKBNYe2zRu7zEgaYi69DWrdoJ/G/COsWd81yyDyRPdUdon6LtYGfINDBesedIjBF7RBlzGcJ741qwry789feB/NCcqhZRlSAtUOUIRidaocoYzdVSzBLycIPJdbOPEB5Imgb2S8jA/M68mhRKoEQ7gnKg6qQ/IikLonHpQPiMQr7VVf8ox72IxE/trPfdaU67F070jDyKTb5nUQ81mLvt/byE1dkz5T5muj9x4qPkC7QGdPCe04NoZlU+EqN40JmJ33EitMPNVHSFxErZ38pOZKljFgBfOWqnizn+G9qSqe6p1nAazQhtMpxH1enQmjUsNvCBPdQnza9cFUpEtxHs9msaIFpyNgm8ZeahozVrQXvp2JZtYahu36kUrAmPQXr3OvBf29JQ3pjwffF05B6uJrexaWknbZAS5fESratVuspifkZWEqS5ckmXh4iUfelVbCeJFowUD+QREcieUpbmyQWr1uyBgSF6wti9iDUNVzcMwAAAABJRU5ErkJggg=="
                    }
                    alt=""
                  />
                </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                {/* <Update Provider={post} />
                <Button onClick={deleteHandler}>Delete</Button> */}
              </div>
              {boolean? <Link to={`/`}>ssssssssssssssssss</Link>:true}
            </div>
            <div className="postCenter">
              <span className="postText">{post?.desc}</span>
              {/* {console.log(post,'ppppppppppp')} */}
              <img className="postImg" src={post.img} alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src={IconLike}
                  onClick={likeHandler}
                  alt=""
                />
                <img
                  className="likeIcon"
                  src={IconLove}
                  onClick={likeHandler}
                  alt=""
                />
                <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
              </div>
            </div>
          </div>
        </div>
      </Else>
    </If>
  );
}
