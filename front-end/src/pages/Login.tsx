import React, { useEffect } from "react";
import axios from "axios";

export default function Login() {
  useEffect(() => {
    const temp = async() =>{
      let t = await axios.get(`/api/`);
      console.log('tt',t);
      
    }
    temp();
    return () => {};
  }, []);

  return <div>Login</div>;
}
