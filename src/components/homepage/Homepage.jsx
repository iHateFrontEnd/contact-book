import React from 'react';
import ReactDOM from 'react-dom';
import CreateConc from '../create-contact/CreateConc';
import SearchConc from '../search-contact/SearchConc';
import EditConc from '../edit-contact/EditConc';
import DeleteConc from '../delete-contact/DeleteConc';
import Login from '../login/Login';
import '../../App.css';

class NavBar extends React.Component {
	render() {
		return (
			<table>
				<tbody>
					<tr>
						<td className='navBarTd'>
							<div className="navBar" id="navBar">
								<button className='navBarBtn' onClick={renderCreateConc}>Create contact</button>

								<br />

								<button className='navBarBtn' onClick={renderViewConc}>View Contacts</button>

								<br />

								<button className="navBarBtn" onClick={renderEditConc}>Edit contacts</button>

								<br />

								<button className='navBarBtn' onClick={renderDeletConc}>Delete contact</button>

								<br />

								<button className='navBarBtn' onClick={logout}>Logout</button>
							</div>
						</td>

						<td className='renderTd'>
							<div className='render' id='render'>
								<div className="logo" id="logo">
									<h1>contact book</h1>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

ReactDOM.render(
	<NavBar />, document.getElementById('root')
);

//this contact renders the page to create a contact 
function renderCreateConc() {
	ReactDOM.render(
		<CreateConc />, document.getElementById('root')
	);
}

//this function renders the page to view a contact
function renderViewConc() {
	ReactDOM.render(
		<SearchConc />, document.getElementById('root')
	);
}

//this function renders the page to delete a contact
function renderDeletConc() {
	ReactDOM.render(
		<DeleteConc />, document.getElementById('root')
	);
}

//this function renders the page to edit contacts
function renderEditConc() {
	ReactDOM.render(
		<EditConc />, document.getElementById('root')
	);
}

//this function logs out the user
function logout() {
	for (let i = 1; i <= localStorage.length; i++) {
		var user = JSON.parse(localStorage.getItem(`user${i}`));

		if (user.isUserLoggedIn === true) {
			localStorage.removeItem(`user${i}`);
			break;
		}
	}

	ReactDOM.render(
		<Login />, document.getElementById('root')
	);
}

export default NavBar;
