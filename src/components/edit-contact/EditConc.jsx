import React from 'react';
import configFile from '../../config.json';
import ReactDOM from 'react-dom';
import Homepage from '../homepage/Homepage';
import './EditConc.css';

var lineNum = 0;

//this function makes a request to http:localhost:4000/edit-conc and edits the contacts
async function saveNewConc() {
  const newConcName = document.getElementById('newConcName').value;
  const newConcNumber = document.getElementById('newConcNumber').value;
  const newConcEmail = document.getElementById('newConcEmail').value;

  var fileName = new String();

  for (let i = 1; i <= localStorage.length; i++) {
    var user = JSON.parse(localStorage.getItem(`user${i}`));

    if (user.isUserLoggedIn == true) {
      fileName = user.username;
      break;
    }
  }

  if (newConcName === '' || newConcNumber === '' || newConcEmail === '') {
    alert("I don't think you filled the form completely");
  } else if (newConcName === '' && newConcNumber === '' && newConcEmail === '') {
    alert('Please fill the form to edit your contacts');
  } else {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: fileName,
        lineNum: lineNum,
        name: newConcName,
        number: newConcNumber,
        email: newConcEmail
      })
    }

    let res = await fetch(configFile.serverURL + '/edit-conc', options);
    let status = await res.json();

    if (status.status === 'success') {
      alert('Done!');

      ReactDOM.render(
        <Homepage />, document.getElementById('root')
      );
    } else {
      alert('Something went wrong please reload the page and try again');
    }
  }
}

class EnterNewConcData extends React.Component {
  render() {
    return (
      <div className='newConcData' id='newConcData'>
        <h1>Enter the new contact data: </h1>

        <input type='text' className='concInfoInps' id='newConcName' placeholder='Enter new name' required />

        <br />

        <input type='number' className='concInfoInps' id='newConcNumber' placeholder='Enter new number' required />

        <br />

        <input type='email' className='concInfoInps' id='newConcEmail' placeholder='Enter new Email-ID' required />

        <br />
        <br />

        <button className='submitBtn' onClick={saveNewConc}>Save</button>

        <br />
        <br />

        <button className='submitBtn' onClick={back}>Back</button>
      </div>
    );
  }
}

//this function checks if the contact exist in thier JSON file
async function editConc() {
  const concName = document.getElementById('concName').value;

  var fileName = new String();

  for (let i = 1; i <= localStorage.length; i++) {
    var user = JSON.parse(localStorage.getItem(`user${i}`));

    if (user.isUserLoggedIn === true) {
      fileName = user.username;
    }
  }

  if (concName === '') {
    alert('Please enter a proper contact name');
  } else {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: fileName,
        name: concName
      })
    }

    const res = await fetch(configFile.serverURL + '/search-conc', options);
    const returnedData = await res.json();

    if (returnedData.status === 'success') {
      lineNum = returnedData.lineNum;
      ReactDOM.render(
        <EnterNewConcData />, document.getElementById('root')
      );
    } else {
      alert('The contact that you want to edit is not found :(');
    }
  }
}

function back() {
  ReactDOM.render(
    <Homepage />, document.getElementById('root')
  );
}

class EditConc extends React.Component {
  render() {
    return (
      <div className='editConc' id='editConc'>
        <h1>Enter the contact name that you want to edit:</h1>

        <input type='text' id='concInfoInps' className='concName' placeholder='Enter name' required />

        <br />

        <button className='submitBtn' onClick={editConc}>Search</button>

        <br />
        <br />

        <button className='submitBtn' onClick={back}>Back</button>
      </div>
    );
  }
}

export default EditConc;
