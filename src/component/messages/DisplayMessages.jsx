import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Style from "./Messages.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  addMessageData,
  fetchMessagesData,
} from "../redux/messageThunk";

import { fetchUserData } from "../redux/thunk/registerThunk";

import { addNotification } from "../redux/apiCalls";

const DisplayMessages = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const dispatch = useDispatch();

  // ✅ ALWAYS SAFE
  const userId = sessionStorage.getItem("id");

  // ✅ REDUX DATA
  const messagesData = useSelector(
    (state) => state.message.messages || []
  );

  const userData = useSelector(
    (state) => state.register.userData || []
  );

  // ✅ RECEIVER SAFE AFTER REFRESH
  const receiver =
    state ||
    userData.find((user) => String(user.id) === String(id));

  // ✅ INPUT STATE
  const [message, setMessage] = useState("");

  // ✅ FETCH DATA
  useEffect(() => {
    dispatch(fetchMessagesData());
    dispatch(fetchUserData());
  }, [dispatch]);

  // ✅ FILTER CHAT
  const filterMessages = messagesData.filter(
    (msg) =>
      (String(msg.senderId) === String(userId) &&
        String(msg.receiverId) === String(receiver?.id)) ||
      (String(msg.senderId) === String(receiver?.id) &&
        String(msg.receiverId) === String(userId))
  );

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // ✅ SEND MESSAGE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;
    if (!receiver) return;

    const newMessage = {
      senderId: userId,
      receiverId: receiver.id,
      messageData: message,
    };

    // ✅ SEND MESSAGE
    await dispatch(addMessageData(newMessage));

    // ✅ REFRESH CHAT
    dispatch(fetchMessagesData());

    // ✅ NOTIFICATION
    await addNotification({
      senderId: userId,
      receiverId: receiver.id,
      message: "sent you a message",
      isNotification: false,
    });

    // ✅ CLEAR INPUT
    setMessage("");
  };

  // ✅ LOADING
  if (!receiver) {
    return (
      <h2 className={Style.loading}>
        Loading Chat...
      </h2>
    );
  }

  return (
    <section className={Style.displayMessages}>

      {/* HEADER */}
      <div className={Style.header}>
        <img
          src={receiver.image}
          alt={receiver.name}
        />

        <h3>{receiver.name}</h3>
      </div>

      {/* CHAT AREA */}
      <div className={Style.chatBox}>

        {filterMessages.length === 0 ? (
          <p className={Style.empty}>
            Start Conversation 👋
          </p>
        ) : (
          filterMessages.map((msg, index) => (
            <div
              key={index}
              className={
                String(msg.senderId) === String(userId)
                  ? `${Style.message} ${Style.right}`
                  : `${Style.message} ${Style.left}`
              }
            >
              {msg.messageData}
            </div>
          ))
        )}

      </div>

      {/* INPUT */}
      <form
        className={Style.inputBox}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
        />

        <button type="submit">
          Send
        </button>
      </form>

    </section>
  );
};

export default DisplayMessages;