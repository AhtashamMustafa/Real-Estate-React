import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import Widget from "../../components/widget/Widget";

function ProfileUpdatePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
console.log(avatar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, email, password, contactNo } =
      Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser?.id}`, {
        username,
        email,
        password,
        contactNo,
        avatar:avatar[0]
      });

      updateUser(res.data);
      // console.log(currentUser)
      navigate("/profile");
    } catch (error) {
      console.error(error);
      // Handle specific errors if needed (e.g., validation errors)
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <div className="item">
            <label htmlFor="contactNo" defaultValue={currentUser?.contactNo}>
              Contact No
            </label>
            <input
              id="contactNo"
              name="contactNo"
              type="text"
              maxLength={12}
              minLength={11}
            />
          </div>
          <button>Update</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser?.avatar || "/noavatar.jpg"} alt="Profile" className="avatar" />
        {/* <CloudinaryUploadWidget
          uwConfig={{
            cloudname: "ahtashammustafa",
            uploadPreset: "realestate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setAvatar={setAvatar}
        /> */}
      <Widget config={{
            cloudName: "ahtashammustafa",
            uploadPreset: "realestate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }} setState={setAvatar}/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
