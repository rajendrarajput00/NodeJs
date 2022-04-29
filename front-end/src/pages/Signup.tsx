import React from "react";
import axios from "axios";
export default function Signup() {
  const postData =async (e:any) => {
      e.preventDefault()
      console.log(e.target.value);
     await axios.post('https://nodereact-957b5-default-rtdb.firebaseio.com/testdatabase.json',{
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
  };
  return (
    <div>
      <form method="post" style={{ display: "grid" }}>
        <span>Name</span>
        <input required type="text"></input>
        <span>Email</span>
        <input type="email"></input>
        <span>Password</span>
        <input type="password"></input>
        <button onClick={postData} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
