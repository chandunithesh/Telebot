import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFollowing_followers, singleUser } from "../apicalls";

export let follow_followers = createAsyncThunk(
  "user/follow",
  async ({ senderId, receiverId }) => {
    let senderUser = await singleUser(senderId);
    let receiverUser = await singleUser(receiverId);

    let updateSenderFollowing = {
      following: [...senderUser.data.following, receiverId],
    };
    let updateReceiverFollowers = {
      followers: [...receiverUser.data.followers, senderId],
    };

    let followingList = await addFollowing_followers(
      updateSenderFollowing,
      senderId
    );
    await addFollowing_followers(updateReceiverFollowers, receiverId);
    return followingList.data;
  }
);

export let unFollow_followers = createAsyncThunk(
  "user/unfollow",
  async ({ senderId, receiverId }) => {
    let senderUser = await singleUser(senderId);
    let receiverUser = await singleUser(receiverId);

    console.log(senderId);
    console.log(receiverId);
    let filterSenderFollowers = senderUser.data.following.filter(
      (value) => value !== receiverId
    );
    let filterReceiverFollowers = receiverUser.data.followers.filter(
      (value) => value !== senderId
    );

    let updateSenderFollowing = {
      following: filterSenderFollowers,
    };
    let updateReceiverFollowers = {
      followers: filterReceiverFollowers,
    };

    let followingList = await addFollowing_followers(
      updateSenderFollowing,
      senderId
    );
    await addFollowing_followers(updateReceiverFollowers, receiverId);
    return followingList.data;
  }
);
