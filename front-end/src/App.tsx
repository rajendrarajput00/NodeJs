import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getFireToken, onMessageListener } from "./services/firebase";

function App() {
  //Implimentation of firebase real time notifications.
  const [isTokenFound, setTokenFound] = useState(false);
  getFireToken(setTokenFound);
  console.log("isTokenFound", isTokenFound);
  onMessageListener()
    .then((payload) => {
      //setShow(true);
      // setNotification({title: payload.notification.title, body: payload.notification.body})
      alert(payload.notification.title)
      console.log("payload", payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      <>
        {isTokenFound && " Notification permission enabled"}
        {!isTokenFound && "Need notification permission"}
      </>
      <header className="App-header">
        {/* <Login></Login> */}
        <Signup></Signup>
      </header>
    </div>
  );
}

export default App;
