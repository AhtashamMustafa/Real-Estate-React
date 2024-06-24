import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useContext} from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function profilePage() {
  const {updateUser, currentUser} = useContext(AuthContext);

  const navigate = useNavigate();

 
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentUser)
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={`/profile/update`}>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={currentUser?.userInfo.avatar||currentUser?.avatar?`${currentUser.userInfo.avatar}`||`${currentUser.avatar}`:"/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser?.userInfo.username||currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.userInfo.email||currentUser?.email}</b>
            </span>
            <span>
              Password: <b>********</b>
            </span>
            <span>
              Contact No: <b>{currentUser?.userInfo.contactNo||currentUser?.contactNo}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={`/newPostPage`}>
              <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default profilePage;
