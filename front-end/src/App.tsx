import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getFireToken, onMessageListener } from "./services/firebase";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";
function App() {
  //Implimentation of firebase real time notifications.
  const [isTokenFound, setTokenFound] = useState(false);
  const [response, setResponse] = useState("");
  getFireToken(setTokenFound);
  console.log("isTokenFound", isTokenFound);
  onMessageListener()
    .then((payload) => {
      //setShow(true);
      // setNotification({title: payload.notification.title, body: payload.notification.body})
      alert(payload.notification.title);
      console.log("payload", payload);
    })
    .catch((err) => console.log("failed: ", err));

    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", data => {
        console.log('Dataatatatat',data);
        setResponse(data);
      });
    }, [])
    

  return (
    <div className="App">
     {/*  <>
        {isTokenFound && " Notification permission enabled"}
        {!isTokenFound && "Need notification permission"}
      </> */}
      <header className="App-header">
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>
                  positronX
                </Link>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>
                        Sign up
                      </Link>
                    </li>
                    <li>
                       It's <time dateTime={response}>{response}</time>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route  path="/" element={<Login />} />
                  <Route path="/sign-in" element={<Login />} />
                  <Route path="/sign-up" element={<Signup />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
