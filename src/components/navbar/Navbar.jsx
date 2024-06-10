import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const user = true;
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
        {user ? (
          <div className="user">
            <Link to={"/profile"}>
              <img src="/dp.jpg" alt="" />
            </Link>

            <Link to={"/profile"}>
              <span>John Doe</span>
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
            <Link to={"/login"} className="login">
              Sign In
            </Link>
            <Link to={"/register"} className="register">
              Sign Up
            </Link>
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
