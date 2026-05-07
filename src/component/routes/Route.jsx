import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";

import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import Homepage from "../home/Homepage";
import Profile from "../profile/Profile";
import Post from "../post/Post";
import Messages from "../messages/Messages";
import DisplayMessages from "../messages/DisplayMessages";
import Notification from "../notification/Notification";

import ProtectedRoute from "./ProtectedRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // ===== PUBLIC ROUTES =====
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // ===== PROTECTED ROUTES =====
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "addPost",
        element: (
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        ),
      },
      {
        path: "messages",
        element: (
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        ),
      },
      {
        path: "displayMessages/:id",
        element: (
          <ProtectedRoute>
            <DisplayMessages />
          </ProtectedRoute>
        ),
      },
      {
        path: "notification",
        element: (
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default route;