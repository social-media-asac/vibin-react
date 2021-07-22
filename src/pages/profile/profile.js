import "./profile.css";
import TopBar from "../../component/topbar/topbar";
import Sidebar from "../../component/sidebar/sidebar";
import Feed from "../../component/feed/feed";
import RightBar from "../../component/rightbar/rightbar";

export default function Profile() {
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
                src="https://scontent.famm3-1.fna.fbcdn.net/v/t1.6435-9/84876462_10215169205647787_3189860721701683200_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=e3f864&_nc_eui2=AeHDBV9LGJrbybWG1x6-Z8QHA6TPgvgy2GsDpM-C-DLYawyqTTd8gzIasteI3hKIhww&_nc_ohc=xU74E8yILPQAX9DXkGE&_nc_oc=AQnvVUOvvfQ7ZBd3ENI24flu4urrUWW51zG27J1Wi3hqF0qBfuj2iwpu_u4ycaE8_nI&_nc_ht=scontent.famm3-1.fna&oh=221c4240823a962ed06d35c9b973a1d5&oe=60FA8A02"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/omar-ewies.jpg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Omar Ewies</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <RightBar profile/>
          </div>
        </div>
      </div>
    </>
  );
}