import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components/login";
import Home from "./components/home";
import firebase from "firebase/compat/app";
import List from "./components/list";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Test from "./components/test";
import axios, { Axios } from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      postUser(user)
    });
  }, []);
   function postUser(user){
    axios.post('http://localhost:3002/api/create', {user: user})
    }

  console.log(user);

  return (
    <div className="app">
      {user ? <Navbar user={user}></Navbar> : null}
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Home user={user} /> : <Login />}
          ></Route>
          <Route
            path="/list"
            element={user ? <List user={user} /> : <Login />}
          ></Route>
          <Route
            path="/profile/*"
            element={user ? <Profile user={user} /> : <Login />}
          ></Route>
          <Route
            path="/test"
            element={user ? <Test user={user} /> : <Login />}
          ></Route>
        </Routes>
      </Router>
      {/* {user ? <Home user={user} /> : <Login />} */}
    </div>
  );
}

export default App;
