import React from "react";
import configFile from '../../config.json';
import ReactDOM from "react-dom";
import DisplayConc from "../display-contact/DisplayConc";
import CreateConc from '../create-contact/CreateConc';
import Homepage from '../homepage/Homepage';
import '../../App.css';

async function searchConc() {
  const concName = document.getElementById('concName').value;

  if (concName === '') {
    alert('Please enter a contact name to search it');
  } else {
    var fileName = new String();

    for (let i = 1; i <= localStorage.length; i++) {
      var user = JSON.parse(localStorage.getItem(`user${i}`));

      if (user.isUserLoggedIn === true) {
        fileName = user.username;
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
        name: concName
      })
    }

    const res = await fetch(configFile.serverURL + '/search-conc', options);
    const returnedData = await res.json();

    if (returnedData.status === 'failed' && returnedData.reason === 'contact not found') {
      alert('The contact that you are looking for is not found :(');
    } else if (returnedData.status === 'failed' && returnedData.reason === 'file not found') {
      alert('Please create a contact to view it');

      ReactDOM.render(
        <CreateConc />, document.getElementById('root')
      );
    } else {
      ReactDOM.render(
        <DisplayConc name={returnedData.name} number={returnedData.number} email={returnedData.email} />, document.getElementById('root')
      );
    }
  }
}

function back() {
  ReactDOM.render(
    <Homepage />, document.getElementById('root')
  );
}

class SearchConc extends React.Component {
  render() {
    return (
      <div className="searchConc" id="searhcConc">
        <h1>Enter the contact name that you are searching for: </h1>

        <input type="text" id="concName" className='concInfoInps' placeholder="Enter name" required />

        <br />

        <button className="submitBtn" onClick={searchConc}>Search</button>

        <br />
        <br />

        <button className='submitBtn' onClick={back}>Back</button>
      </div>
    )
  }
}

export default SearchConc;