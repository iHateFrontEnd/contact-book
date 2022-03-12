import React from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import CreateConc from '../create-contact/CreateConc';
import Homepage from '../homepage/Homepage';
import '../../App.css';

function back() {
  ReactDOM.render(
    <Homepage />, document.getElementById('root')
  );
}

//this function makes a request to the server to delete the contact
async function deleteConc() {
  const toDeleteConc = document.getElementById('toDeleteConc').value;

  var fileName = new String();

  for (let i = 1; i <= localStorage.length; i++) {
    var user = JSON.parse(localStorage.getItem(`user${i}`));

    if (user.isUserLoggedIn === true) {
      fileName = user.username;
      break;
    }
  }

  if (toDeleteConc === '') {
    alert('Please enter a name to delete it');
  } else {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileName: fileName,
        name: toDeleteConc
      })
    }

    const res = await fetch(`${configFile.serverURL}/search-conc`, options);
    const returnedData = await res.json();

    if (returnedData.status === 'success') {
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lineNum: returnedData.lineNum,
          fileName: fileName
        })
      }

      fetch(`${configFile.serverURL}/delete-conc`, options);

      alert('Done!');

      ReactDOM.render(
        <Homepage />, document.getElementById('root')
      );
    } else if (returnedData.status === 'failed') {
      alert('Please create a contact to delete one');

      ReactDOM.render(
        <CreateConc />, document.getElementById('root')
      );
    }
  }
}

class DeleteConc extends React.Component {
  render() {
    return (
      <div className='deleteConc' id='deleteConc'>
        <h1>Enter the contact name that you want to delete</h1>

        <input className='concInfoInps' id='toDeleteConc' placeholder='Enter name' required />

        <br />
        <br />

        <button onClick={deleteConc} className='submitBtn'>Delete</button>

        <br />
        <br />

        <button onClick={back} className='submitBtn'>Back</button>
      </div>
    );
  }
}

export default DeleteConc;

