import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginValidation from "../../redux/thunk/loginThunc";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineSportsBaseball } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const { isLogin } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = userDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginValidation(userDetails));
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
  }, [isLogin, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          {/* Header */}
          <div className="login-header">
            <div className="login-icons">
              <FaFacebook />
              <MdOutlineSportsBaseball />
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>

            <div className="login-footer">
              Don't have an account? <a href="/register">Sign up</a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;