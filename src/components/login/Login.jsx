import React from "react";
import ReactDOM from "react-dom";
import SignUp from "../sign-up/SignUp";
import configFile from '../../config.json';
import Homepage from '../homepage/Homepage';
import '../../App.css';

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === '' && password === '') {
    alert('Please enter a username or password');
  } else {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }

    const res = await fetch(`${configFile.serverURL}/login`, options);
    const userData = await res.json();

    if (userData.status === 'failed') {
      alert('Please check the username or password');
    } else {
      //updating user data in localStorage
      var usernameFound = false;

      var i = 0;
      for (i = 1; i <= localStorage.length; i++) {
        var user = JSON.parse(localStorage.getItem(`user${i}`));

        if (user.username === username) {
          usernameFound = true;
          break;
        }
      }

      //checking if the users data is already saved 
      if (usernameFound === true) {
        user.isUserLoggedIn = true;

        localStorage.setItem(`user${i}`, user);
      } else {
        localStorage.setItem(`user${localStorage.length + 1}`, JSON.stringify({
          username: username,
          password: password,
          isUserLoggedIn: true
        }));
      }

      ReactDOM.render(
        <Homepage />, document.getElementById('root')
      );
    }
  }
}

function renderSignUp() {
  ReactDOM.render(
    <SignUp />, document.getElementById('root')
  );
}

class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <h1>Enter user name and password to login</h1>

        <input type='text' id='username' className='username' placeholder='Enter username' />

        <br />
        <br />

        <input type='password' id='password' className='password' placeholder='Enter password' />

        <br />
        <br />

        <button className='loginBtn' onClick={login}>Login</button>

        <br />
        <br />

        <p onClick={renderSignUp}>Click to sign up</p>
      </div>
    );
  }
}

export default Login;
