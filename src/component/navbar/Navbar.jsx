import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../redux/slice/loginSlice";
import {
  fetchNotificationData,
  patchNotificationData,
} from "../redux/thunk/notificationThunk";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLogin = useSelector((state) => state.login.isLogin);

  const notificationData = useSelector(
    (state) => state.notification.notification || []
  );

  const userId = sessionStorage.getItem("id");

  const filterNotification = useMemo(() => {
    return notificationData.filter(
      (value) =>
        String(value.receiverId) === String(userId) &&
        value.isNotification === false
    );
  }, [notificationData, userId]);

  const notificationLength = filterNotification.length;

  useEffect(() => {
    dispatch(fetchNotificationData());
  }, [dispatch]);

  const handleLogOut = () => {
    sessionStorage.removeItem("id");
    dispatch(logOut());   // ✅ FIXED
    navigate("/login");
  };

  const handleNotification = () => {
    navigate("/notification");

    filterNotification.forEach((value) => {
      dispatch(
        patchNotificationData({
          id: value.id,
          value: { isNotification: true },
        })
      );
    });
  };

  return (
    <div className="navbar">
      <div className="nav-logo">TeleBot</div>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        {/* ❌ NOT LOGGED IN */}
        {!isLogin && (
          <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </NavLink>
          </>
        )}

        {/* ✅ LOGGED IN */}
        {isLogin && (
          <>
            <NavLink to="/home" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </NavLink>
            <NavLink to="/addPost" onClick={() => setMenuOpen(false)}>
              Add Post
            </NavLink>
            <NavLink to="/messages" onClick={() => setMenuOpen(false)}>
              Messages
            </NavLink>

            <button
              className="nav-btn notification"
              onClick={() => {
                handleNotification();
                setMenuOpen(false);
              }}
            >
              Notification <sup>{notificationLength}</sup>
            </button>

            <button
              className="nav-btn"
              onClick={() => {
                handleLogOut();
                setMenuOpen(false);
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;