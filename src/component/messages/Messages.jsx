import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/thunk/registerThunk";
import Style from "./Messages.module.css";
import { NavLink } from "react-router-dom";

const Messages = () => {
  const dispatch = useDispatch();

  // ✅ SAFE USER ID
  const userId = sessionStorage.getItem("id");

  // ✅ USERS
  const userData = useSelector(
    (state) => state.register.userData || []
  );

  // ✅ CURRENT USER
  const currentUser = userData.find(
    (user) => String(user.id) === String(userId)
  );

  // ✅ FOLLOWING
  const following = currentUser?.following || [];

  // ✅ FILTER USERS
  const filteredData = userData.filter((user) =>
    following.includes(user.id)
  );

  // ✅ FETCH USERS
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <section id={Style.message}>

      {filteredData.length === 0 ? (
        <p className={Style.empty}>
          No conversations yet
        </p>
      ) : (
        filteredData.map((user) => (
          <NavLink
            key={user.id}
            to={`/displayMessages/${user.id}`}
            state={user}
            className={Style.link}
          >

            <article className={Style.userCard}>
              <img
                src={user.image}
                alt={user.name}
              />

              <p>{user.name}</p>
            </article>

          </NavLink>
        ))
      )}

    </section>
  );
};

export default Messages;