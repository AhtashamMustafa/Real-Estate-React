import { useState } from "react";
import "./profileUpdatePage.scss";

function ProfileUpdatePage() {
  const [profileImage, setProfileImage] = useState("defaultdp.png"); // Default profile image
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (selectedImage) {
      setProfileImage(selectedImage);
      setSelectedImage(null); // Clear the selected image
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button >Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={profileImage}
        alt="Profile" onClick={handleImageClick} className="avatar" />
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        {selectedImage && (
          <div>
            <button onClick={handleSaveProfile}>Save Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
