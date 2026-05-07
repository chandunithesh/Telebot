import React, { useState } from "react";
import { imageData } from "./../imageFunction/imageConverting";
import { useDispatch } from "react-redux";
import { addPostData } from "../redux/thunk/postThunk";
import "./Post.css";

const Post = () => {
  const date = new Date();
  const id = sessionStorage.getItem("id");
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    image: "",
    caption: "",
    userId: id,
    date: date,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImage = async (e) => {
    const imageValue = e.target.files[0];
    const imageUrl = await imageData(imageValue);
    setPostData({ ...postData, image: imageUrl });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPostData(postData));
  };

  return (
    <div className="post-page">
      <form className="post-form" onSubmit={handleSubmit}>
        
        <h2 className="post-title">Create Post</h2>

        <div className="post-group">
          <label>Upload Image</label>
          <input type="file" onChange={handleImage} />
        </div>

        <div className="post-group">
          <label>Caption</label>
          <input
            type="text"
            name="caption"
            value={postData.caption}
            onChange={handleChange}
            placeholder="Enter caption..."
          />
        </div>

        <button className="post-btn">Post</button>
      </form>
    </div>
  );
};

export default Post;