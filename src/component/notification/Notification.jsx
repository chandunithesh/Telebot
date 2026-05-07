import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotificationData } from "../redux/thunk/notificationThunk";
import { fetchUserData } from "../redux/thunk/registerThunk";

import "./notification.css";

const Notification = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notification.notification || []
  );

  const users = useSelector(
    (state) => state.register.userData || []
  );

  const userId = sessionStorage.getItem("id");

  // ✅ fetch data
  useEffect(() => {
    dispatch(fetchNotificationData());
    dispatch(fetchUserData());
  }, [dispatch]);

  // ✅ current user notifications
  const myNotifications = notifications.filter(
    (item) => String(item.receiverId) === String(userId)
  );

  // ✅ get sender
  const getUser = (id) => {
    return users.find(
      (user) => String(user.id) === String(id)
    );
  };

  return (
    <section className="notificationPage">

      <div className="notificationWrapper">

        <h2 className="notificationTitle">
          Notifications
        </h2>

        {myNotifications.length === 0 ? (
          <p className="emptyNotification">
            No notifications yet
          </p>
        ) : (
          myNotifications
            .slice()
            .reverse()
            .map((item) => {
              const sender = getUser(item.senderId);

              return (
                <div
                  key={item.id}
                  className="notificationCard"
                >

                  {/* IMAGE */}
                  <div className="notificationAvatar">

                    {sender?.image ? (
                      <img
                        src={sender.image}
                        alt={sender.name}
                      />
                    ) : (
                      <div className="defaultAvatar">
                        {sender?.name?.charAt(0)}
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="notificationContent">

                    <p>
                      <span className="senderName">
                        {sender?.name || "Unknown"}
                      </span>

                      {" "}
                      {item.message}
                    </p>

                    <span className="notificationTime">
                      {item.time || "Just now"}
                    </span>

                  </div>

                </div>
              );
            })
        )}

      </div>

    </section>
  );
};

export default Notification;