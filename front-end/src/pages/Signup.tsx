import React, { useState } from "react";
import axios from "axios";
import { string } from "joi";
export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const postData = async (e: any) => {
    e.preventDefault();
    await axios
      .post(
        "https://nodereact-957b5-default-rtdb.firebaseio.com/testdatabase.json",
        formData
      )
      .then((data) => {
        console.log("da", data);
        if (data.status == 200) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password:"",
          });
        }
      })
      .catch(() => {
        console.log("Error", e);
      });
  };
  const onHandle = (value: string, fieldName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div>
      <form method="post" onSubmit={postData}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="First name"
            value={formData?.firstName}
            onChange={(e) => onHandle(e.target.value, "firstName")}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            required
            type="text"
            className="form-control"
            placeholder="Last name"
            value={formData?.lastName}
            onChange={(e) => onHandle(e.target.value, "lastName")}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            value={formData?.email}
            onChange={(e) => onHandle(e.target.value, "email")}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={formData?.password}
            required
            onChange={(e) => onHandle(e.target.value, "password")}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
}
