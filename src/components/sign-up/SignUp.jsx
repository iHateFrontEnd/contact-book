import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Login from '../login/Login';
import '../../App.css';

async function signUp() {
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  const confirmPassowrd = document.getElementById('confirmPassword').value;

  if (password === confirmPassowrd) {
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

    const res = await fetch(`${configFile.serverURL}/new-user`, options);

    alert('Done!');

    ReactDOM.render(
      <Login />, document.getElementById('root')
    );
  } else {
    alert('Please check if you have entered the same password');
  }
}

class SignUp extends React.Component {
  render() {
    return (
      <div className='signUp' id='signUp' >
        <h1>Enter your new username: </h1>

        <input type='text' className='username' id='newUsername' placeholder='Enter username' />

        <br />
        <br />

        <input type='password' className='password' id='newPassword' placeholder='Enter password' />


        <br />
        <br />

        <input type='password' className='password' id='confirmPassword' placeholder='Confirm password' />

        <br />
        <br />

        <button className='loginBtn' onClick={signUp}>Sign up</button>
      </div>
    );
  }
}

export default SignUp;
