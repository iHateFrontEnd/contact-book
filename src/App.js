import React from "react";
import Login from "./components/login/Login";
import Homepage from "./components/homepage/Homepage";
import "./App.css";

function App() {
  if (localStorage.length === 0) {
    return <Login />;
  } else {
    //searching for the user who is logged in
    try {
      for (let i = 1; i <= localStorage.length; i++) {
        var user = JSON.parse(localStorage.getItem(`user${i}`));

        if (user.isUserLoggedIn === true) {
          return <Homepage />;
        }
      }
    } catch (err) {
      return <Login />;
    }
  }
}

export default App;
