import React, { useState } from "react";
import axios from "axios";
export default function Signup() {
  const [formData, setFormData] = useState({});
  const postData = async (e: any) => {
    e.preventDefault();
    await axios.post(
      "https://nodereact-957b5-default-rtdb.firebaseio.com/testdatabase.json",
      formData
    );
  };
  const onHandle = (value: string, fieldName: string) => {
    setFormData((prevData) => ({
      ...prevData,
        [fieldName]: value,
      
    }));
  };
  return (
    <div>
      <form method="post" style={{ display: "grid" }}>
        <span>Name</span>
        <input
          onChange={(e) => onHandle(e.target.value, "name")}
          required
          type="text"
        ></input>
        <span>Email</span>
        <input
          onChange={(e) => onHandle(e.target.value, "email")}
          type="email"
        ></input>
        <span>Password</span>
        <input
          onChange={(e) => onHandle(e.target.value, "password")}
          type="password"
        ></input>
        <span>Confirm Password</span>
        <input
          onChange={(e) => onHandle(e.target.value, "confirmaPassword")}
          type="password"
        ></input>
        <button onClick={postData} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
