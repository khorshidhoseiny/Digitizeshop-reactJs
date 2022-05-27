import { useAuth } from "../Context/AuthProvider";
import Layout from "../Layout/Layout";
import "./profile.css";

const ProfilePage = () => {
  const user = useAuth();
  return (
    <Layout>
      <div className="userContainer">
        <div className="imgDiv">
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
            alt={user.name}
          />
          <h3>{user.name}</h3>
        </div>
        <div className="userInfo">
          <div>
            <h6>Email Address:</h6>
            <p>{user.email}</p>
          </div>
          <div>
            <h6>Phone Number:</h6>
            <p>{user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
