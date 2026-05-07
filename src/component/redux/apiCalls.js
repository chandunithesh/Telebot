import axios from "axios";
import Notification from './../notification/Notification';

let baseUrl = "http://localhost:3000";
export let fetchUSers = () => axios.get(`${baseUrl}/users`);
export let addUser = (user) => axios.post(`${baseUrl}/users`, user);
export let singleUser = (id) => axios.get(`${baseUrl}/users/${id}`);

// ! Followers
export let addFollowing_followers = (data, id) =>
  axios.patch(`${baseUrl}/users/${id}`, data);

export let fetchPost = () => axios.get(`${baseUrl}/posts`);
export let addPost = (post) => axios.post(`${baseUrl}/posts`, post);

// ! Messages

export let addMessage = (message) => axios.post(`${baseUrl}/messages`, message);
export let fetchMessages = () => axios.get(`${baseUrl}/messages`);

// ! Notifications

export let addNotification = (notification) =>axios.post(`${baseUrl}/notifications`, notification);

export let fetchNotifications = () => axios.get(`${baseUrl}/notifications`);

export let patchNotification = (data) =>axios.patch(`${baseUrl}/notifications/${data.id}`, data.value);
