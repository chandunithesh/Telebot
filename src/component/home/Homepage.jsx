import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/thunk/registerThunk";
import { fetchPostData } from "../redux/thunk/postThunk";
import { FaComment, FaShare, FaHeart } from "react-icons/fa";
import Styles from "./home.module.css";
import {
  follow_followers,
  unFollow_followers,
} from "../redux/thunk/userThunk";

const Homepage = () => {
  const userId = sessionStorage.getItem("id");

  const users = useSelector((state) => state.register.userData || []);
  const posts = useSelector((state) => state.post.posts || []);
  const isFollowersUpdate = useSelector(
    (state) => state.user.isFollowersUpdate
  );

  const dispatch = useDispatch();

  const singleUserData = users.find(
    (user) => String(user.id) === String(userId)
  );

  // ✅ LOAD FROM LOCAL STORAGE
  const [likedPosts, setLikedPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("likes")) || [];
  });

  const [comments, setComments] = useState(() => {
    return JSON.parse(localStorage.getItem("comments")) || {};
  });

  const [localFollowing, setLocalFollowing] = useState([]);
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // ✅ Sync following
  useEffect(() => {
    if (singleUserData?.following) {
      setLocalFollowing(singleUserData.following);
    }
  }, [singleUserData]);

  // ✅ Like handler
  const handleLike = (id) => {
    setLikedPosts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    );
  };

  // ✅ Add comment
  const handleAddComment = (postId) => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentInput,
      userId: userId,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setCommentInput("");
  };

  useEffect(() => {
    dispatch(fetchPostData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, isFollowersUpdate]);

  if (!users.length) return <p>Loading users...</p>;
  if (!posts.length) return <p>Loading posts...</p>;

  return (
    <section className={Styles.home}>
      
      {/* USERS */}
      <section className={Styles.usersSection}>
        {users
          .filter((user) => String(user.id) !== String(userId))
          .map((user) => {
            const isFollowing = localFollowing.includes(user.id);

            return (
              <article key={user.id} className={Styles.userCard}>
                <img src={user.image} alt={user.name} />
                <p>{user.name}</p>

                <button
                  type="button"
                  onClick={() => {
                    if (!singleUserData) return;

                    if (isFollowing) {
                      setLocalFollowing((prev) =>
                        prev.filter((id) => id !== user.id)
                      );

                      dispatch(
                        unFollow_followers({
                          senderId: userId,
                          receiverId: user.id,
                        })
                      );
                    } else {
                      setLocalFollowing((prev) => [...prev, user.id]);

                      dispatch(
                        follow_followers({
                          senderId: userId,
                          receiverId: user.id,
                        })
                      );
                    }
                  }}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </article>
            );
          })}
      </section>

      {/* POSTS */}
      <section className={Styles.postSection}>
        {posts.map((post) => (
          <article key={post.id} className={Styles.postCard}>
            <img src={post.image} alt="post" />

            {/* ACTIONS */}
            <div className={Styles.actions}>
              <FaHeart
                className={
                  likedPosts.includes(post.id)
                    ? Styles.liked
                    : Styles.icon
                }
                onClick={() => handleLike(post.id)}
              />

              <FaComment
                className={Styles.icon}
                onClick={() =>
                  setActiveCommentPost(
                    activeCommentPost === post.id ? null : post.id
                  )
                }
              />

              <FaShare className={Styles.icon} />
            </div>

            {/* COMMENTS */}
            {activeCommentPost === post.id && (
              <div className={Styles.commentBox}>
                
                <div className={Styles.commentList}>
                  {(comments[post.id] || []).length === 0 ? (
                    <p>No comments yet</p>
                  ) : (
                    comments[post.id].map((c) => (
                      <div key={c.id} className={Styles.commentItem}>
                        {c.text}
                      </div>
                    ))
                  )}
                </div>

                <div className={Styles.commentInputBox}>
                  <input
                    type="text"
                    placeholder="Write comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button onClick={() => handleAddComment(post.id)}>
                    Send
                  </button>
                </div>

              </div>
            )}
          </article>
        ))}
      </section>
    </section>
  );
};

export default Homepage;