import React from "react";
import ReactDOM from "react-dom";
import Homepage from '../homepage/Homepage';
import '../../App.css';

function home() {
  ReactDOM.render(
    <Homepage />, document.getElementById('root')
  );
}

class DisplayConc extends React.Component {
  render() {
    return (
      <div className="displayConc" id="displayConc">
        <h1>Here is the contact data that you searched for: </h1>

        <br />

        <h2>Name: {this.props.name}</h2>


        <h2>Number: {this.props.number}</h2>


        <h2>Email: {this.props.email}</h2>

        <br />

        <button className='submitBtn' onClick={home}>Home</button>
      </div>
    );
  }
}


export default DisplayConc;
