import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup' 

function App() {
  return (
    <div className="App">
      <header className="App-header">
       {/* <Login></Login> */}
       <Signup></Signup>

      </header>
    </div>
  );
}

export default App;
