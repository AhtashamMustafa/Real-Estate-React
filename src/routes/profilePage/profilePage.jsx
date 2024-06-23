import { Link } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";

function profilePage() {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={`/profileUpdatePage`}><button>Update Profile</button></Link>
          </div>
          <div className="info">
            <span>
              Avatar: <img src="/dp.jpg" alt="" />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>johndoe@hmail.com</b>
            </span>
            <span>
              Password: <b>********</b>
            </span>
            <span>
              Contact No: <b>+92123-1234567</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={`/newPostPage`}><button>Create New Post</button></Link>
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
            <Chat/>
        </div>
      </div>
    </div>
  );
}

export default profilePage;
