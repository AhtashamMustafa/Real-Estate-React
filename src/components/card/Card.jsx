import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {
  const post = item;
  const [saved, setSaved] = useState(post.isSaved);//
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(post)

  // const handleSave = async () => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   }
  //   // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
  //   setSaved((prev) => !prev);
  //   try {
  //     await apiRequest.post("/users/save", { postId: post.id });
  //   } catch (err) {
  //     console.log(err);
  //     setSaved((prev) => !prev);
  //   }
  // };
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <div className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </div>
        <div className="price">$ {item.price}</div>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
          <button
              // onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
              className="icon"
            >
              <img src="/save.png" alt="" />
              {/* {saved ? "Place Saved" : "Save the Place"} */}
            </button>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
