import { Link } from "react-router-dom";
import "./ProfilePage.css";
import Button from "../ui/Button";
const ProfilePage = () => {
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const address = localStorage.getItem("userAddress");
  return (
    <div className="profile_page">
      <Link to="/">
        <Button size="medium" custStyle="back_btn">
          <img
            className="nav_back_img"
            src="https://i.ibb.co/JcQ2wkX/backward.png"
            alt="backward"
            border="0"
          />
        </Button>
      </Link>
      <div className="profile_pic_holder">
        <img
          className="profile_pic"
          src="https://i.ibb.co/thkbh6Z/profile-user.png"
          alt="profile-user"
          border="0"
        />
        <h3>{name}</h3>
      </div>
      <h4>Email :</h4>
      <p>{email}</p>
      <h4>Address :</h4>
      <p>{address}</p>
    </div>
  );
};

export default ProfilePage;
