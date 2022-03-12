import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from '../homepage/Homepage';
import configFile from '../../config.json';
import '../../App.css';

function back() {
  ReactDOM.render(
    <Homepage />, document.getElementById('root')
  );
}

function saveConc() {
  const concName = document.getElementById('concName').value;
  const concNumber = document.getElementById('concNumber').value;
  const concEmail = document.getElementById('concEmail').value;

  if (concName === '' && concEmail === '' && concNumber === '') {
    alert('Please fill the form to create a contact');
  } else if (concName === '' || concEmail === '' || concNumber === '') {
    alert('Please check the form that you filled');
  } else {
    var fileName = new String();

    //searching for the username 
    for (let i = 1; i <= localStorage.length; i++) {
      var user = JSON.parse(localStorage.getItem(`user${i}`));

      if (user.isUserLoggedIn === true) {
        fileName = user.username
        break;
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: fileName,
        name: concName,
        email: concEmail,
        number: concNumber
      })
    }

    fetch(configFile.serverURL + '/write-conc', options);

    ReactDOM.render(
      <Homepage />, document.getElementById('root')
    );
  }
}

class CreateConc extends React.Component {
  render() {
    return (
      <div className='createConcDiv' id='createConcDiv'>
        <h1>Enter the contact you new Contact name: </h1>

        <br />

        <input type='text' id='concName' className='concInfoInps' placeholder='Enter name' required />

        <br />

        <input type='number' id='concNumber' className='concInfoInps' placeholder='Enter number' required />

        <br />

        <input type='email' id='concEmail' className='concInfoInps' placeholder='Enter Email-ID' required />

        <br />

        <button className='submitBtn' onClick={saveConc}>Save</button>

        <br />
        <br />

        <button className='submitBtn' onClick={back}>Back</button>
      </div>
    );
  }
}

export default CreateConc;
