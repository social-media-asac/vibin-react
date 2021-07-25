import "./share.css";
import { useContext  } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { LoginContext } from '../../context/authContext';
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import cookie from 'react-cookies'
const token = cookie.load('auth');

export default function Share() {
  const contextType = useContext(LoginContext);
  const desc = useRef();
  let userInfo = contextType.user;
  let userD = contextType.userData.user;
  console.log('userD', userD);
  console.log('userInfo', userInfo);
  let userId = contextType.user.userId;
  const [file, setFile]= useState(null)
  console.log('contextType from post', contextType);
  const submitHandler = async (e)=>{
    e.preventDefault();
    const newPost = {
      userId:userId,
      desc: desc.current.value
    }
    // if(file){
    //   const data = new FormData();
    //   const fileName = Date.now() + file.name;
    //   data.append('file',file);
    //   data.append('name', fileName);
    //   newPost.img = fileName;
    //   try {
    //     await axios.post('https://vybin.herokuapp.com/api/v1/upload',data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    try {
      await axios.post('https://vybin.herokuapp.com/api/v1/posts',newPost,  { headers: {"Authorization" : `Bearer ${token}`} })
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={userD?.profilePicture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB+CAMAAABWFa7EAAAAMFBMVEXEzeD////Y3uri5vDH0OLl6fL7/P3q7vTb4OzP1+by9Pj2+PrM1OTv8vfR2Ofo7PNNak5MAAAC/klEQVR4nO2cgXqCMAyEW0BAQX3/t90qYw61JVcKuTL+J8h9Jbk0jRpzcHBwcLB3+qJtS+0gFtK3TVfbbxrtSBbQF3c7ku+B9KfOPrlqhxPJ7WSn9NoRRdF29pVWO6YIyjcVjrN2WChF/VGHtYV2ZBD9xSMjs/rb+mV801Xa8Ulpgjqy+bwqX3b8IQdb7OdlZJEoZ5EOfouXnUcGZyLIjxFqk//s5h60gw2B6GAuXWEjzOhIrpgQ3p4eSHUH7bclr70DtBVYaoYjF+2AfRT/VUitHbAPyA4PIRtwCGHjEMLGboTc9iIENcROO2Afu2lR0E+LVgjaxtMKQdt42vvIbi5WkqnvLoWctAP2AgqhnTWCYy3bcM6D0A+L9kzQmuWgzJKYE+Ec0UUI4XxMDDxJ++DM9tnH3He0Q/4MekGkvVmh1xHaF1G8/lJWXwM+vDko/dBECLlpR+zhfc9sBs7qizeNpEXLoE5SE2/TQebOmiGO16XSIMz7Z4gn0s4ZHYgn0o4eHgAVmLOFHwGSRDvUMPLxL3WKGKBNYe2zRu7zEgaYi69DWrdoJ/G/COsWd81yyDyRPdUdon6LtYGfINDBesedIjBF7RBlzGcJ741qwry789feB/NCcqhZRlSAtUOUIRidaocoYzdVSzBLycIPJdbOPEB5Imgb2S8jA/M68mhRKoEQ7gnKg6qQ/IikLonHpQPiMQr7VVf8ox72IxE/trPfdaU67F070jDyKTb5nUQ81mLvt/byE1dkz5T5muj9x4qPkC7QGdPCe04NoZlU+EqN40JmJ33EitMPNVHSFxErZ38pOZKljFgBfOWqnizn+G9qSqe6p1nAazQhtMpxH1enQmjUsNvCBPdQnza9cFUpEtxHs9msaIFpyNgm8ZeahozVrQXvp2JZtYahu36kUrAmPQXr3OvBf29JQ3pjwffF05B6uJrexaWknbZAS5fESratVuspifkZWEqS5ckmXh4iUfelVbCeJFowUD+QREcieUpbmyQWr1uyBgSF6wti9iDUNVzcMwAAAABJRU5ErkJggg=='} alt="" />
          <input
            placeholder={`What's in your mind ${userInfo.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">


            <label  htmlFor = 'file'className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input 
              style = {{display : "none"}}
              type="file"
              id= "file"
              accept=".png, .jpeg, .jpg"
              onChange={(e)=>setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}