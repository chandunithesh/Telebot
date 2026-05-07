import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/thunk/registerThunk";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Profile.css"; // import external CSS

const Profile = () => {
  const userData = useSelector((state) => state.register.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (!userData) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profiles</h2>

      <div className="profile-grid">
        {userData.map((user, index) => (
          <div key={user.id || index} className="profile-card">
            <img
              src={user.image || "/default-avatar.png"}
              alt={user.name}
              className="profile-img"
            />

            <div className="profile-name">
              {user.name || "Anonymous"}
            </div>

            <div className="profile-email">
              {user.email || "No email"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;