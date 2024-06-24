import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(currentUser?.userInfo.avatar||currentUser?.avatar?`${currentUser.userInfo.avatar}`||`${currentUser.avatar}`:"/noavatar.jpg"
  ); // Default profile image
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, email, password, contactNo } = Object.fromEntries(formData);

    try {
      if (selectedImage) {
        setProfileImage(selectedImage);
        setSelectedImage(null); // Clear the selected image
      }
      const res = await apiRequest.put(`/users/${currentUser?.userInfo.id||currentUser?.id}`, {
        username,
        email,
        password,
        contactNo,
        avatar: profileImage, // Assuming avatar property in API accepts image data
      });

      updateUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      // Handle specific errors if needed (e.g., validation errors)
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (event) => {
    const file = await event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
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
              defaultValue={currentUser?.userInfo.username||currentUser?.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" defaultValue={currentUser?.userInfo.email||currentUser?.email} />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <div className="item">
            <label htmlFor="contactNo" defaultValue={currentUser?.userInfo.contactNo||currentUser?.contactNo}>Contact No</label>
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
        <img src={profileImage} alt="Profile" onClick={handleImageClick} className="avatar" />
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;