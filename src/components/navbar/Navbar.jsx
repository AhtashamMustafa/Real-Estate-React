import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  
  return (
    <nav>
      <div className="left">
        <Link to={"/"} className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>RealEstate</span>
        </Link>
        <Link to={"/"} className="home">
          Home
        </Link>
        <Link to={"/about"} className="about">
          About
        </Link>
        <Link to={"/contacts"} className="contacts">
          Contacts
        </Link>
        <Link to={"/agents"} className="agents">
          Agents
        </Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <Link to={"/profile"}>
              <img
                src={currentUser.avatar?`${currentUser.avatar}`:"/noavatar.jpg"}
                alt=""
              />
            </Link>

            <Link to={"/profile"}>
              <span>{currentUser?.username}</span>
            </Link>

            <div className="profile">
              <Link to={"/profile"}>
                <div className="notification">3</div>
                <span>Profile</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="login-signup">
              <Link to={"/login"} className="login">
                <span>Sign In</span>
              </Link>
              <Link to={"/register"} className="register">
                <span>Sign Up</span>
              </Link>
            </div>
          </>
        )}

        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to={"/"} className="home">
            Home
          </Link>
          <Link to={"/about"} className="about">
            About
          </Link>
          <Link to={"/contacts"} className="contacts">
            Contacts
          </Link>
          <Link to={"/agents"} className="agents">
            Agents
          </Link>
          <Link to={"/login"} className="login">
            Sign In
          </Link>
          <Link to={"/register"} className="register">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
