import axios from "axios";

const baseUrl = "http://localhost:3000";

// ✅ USERS
export const fetchUsers = () => axios.get(`${baseUrl}/users`);

export const addUser = (user) =>
  axios.post(`${baseUrl}/users`, user);

export const singleUser = (id) =>
  axios.get(`${baseUrl}/users/${id}`);

// ✅ FOLLOWERS
export const addFollowing_followers = (data, id) =>
  axios.patch(`${baseUrl}/users/${id}`, data);

// ✅ POSTS
export const fetchPost = () =>
  axios.get(`${baseUrl}/posts`);

export const addPost = (post) =>
  axios.post(`${baseUrl}/posts`, post);

// ✅ MESSAGES
export const addMessage = (message) =>
  axios.post(`${baseUrl}/messages`, message);

export const fetchMessages = () =>
  axios.get(`${baseUrl}/messages`);

// ✅ NOTIFICATIONS
export const addNotification = (notification) =>
  axios.post(`${baseUrl}/notifications`, notification);

export const fetchNotifications = () =>
  axios.get(`${baseUrl}/notifications`);

export const patchNotification = (data) =>
  axios.patch(
    `${baseUrl}/notifications/${data.id}`,
    data.value
  );