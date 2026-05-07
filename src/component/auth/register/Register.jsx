import React, { useState } from "react";
import Form from "../../form/Form";
import { useDispatch } from "react-redux";
import { addUserData } from "../../redux/thunk/registerThunk";
import { imageData } from "../../imageFunction/imageConverting";
import "./Register.css";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    contact: "",
    gender: "",
    image: "",
    followers: [],
    following: [],
  });

  const { name, email, password, confirmPassword, dob, contact, gender } =
    userDetails;

  const registerData = [
    { name: "name", type: "text", value: name },
    { name: "email", type: "email", value: email },
    { name: "password", type: "password", value: password },
    { name: "confirmPassword", type: "password", value: confirmPassword },
    { name: "dob", type: "date", value: dob },
    { name: "contact", type: "tel", value: contact },
  ];

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(addUserData(userDetails));
    } else {
      alert("Password Mismatch");
    }
  };

  const handleImage = async (e) => {
    const image = e.target.files[0];
    const convertedImage = await imageData(image);
    setUserDetails({ ...userDetails, image: convertedImage });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">

          {/* Header */}
          <div className="register-header">
            <h2>Create an account</h2>
            <p>Join our social community today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-form">

            {/* Dynamic Inputs */}
            <Form data={registerData} handleChange={handleChange} />

            {/* Gender */}
            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="gender-group">
                {["male", "female", "others"].map((option) => (
                  <label key={option} className="gender-option">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={gender === option}
                      onChange={handleChange}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label className="form-label">Profile Picture</label>
              <input
                type="file"
                onChange={handleImage}
                accept="image/*"
                className="file-input"
              />
              <p className="file-hint">
                Upload JPG, PNG (max 2MB)
              </p>
            </div>

            {/* Submit */}
            <button type="submit" className="register-btn">
              Sign Up
            </button>

            {/* Footer */}
            <div className="register-footer">
              Already have an account? <a href="/login">Log in</a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;