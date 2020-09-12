import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import axios from 'axios';
class Cookie extends Component {
	state = { open: false, userData: [], userRemoved: false };

	async componentDidMount() {
		await axios
			.get(`http://localhost:8080/users/getData`, {
				headers: {
					Authorization: 'Bearer ' + this.props.token,
				},
			})
			.then((res) => {
				this.setState({ userData: res.data });
			});
	}

	submitCookie = () => {
		this.props.setCookie(this.state.userData.user);
		this.setState({ open: false });
	};

	getUserData = () => {
		console.log(this.state.userData);
	};

	declineCookie = async () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		localStorage.removeItem('role');
		await axios
			.get(`http://localhost:8080/users/delete`, {
				headers: {
					Authorization: 'Bearer ' + this.props.token,
				},
			})
			.then((res) => {
				this.setState({ open: false, userRemoved: true });
			});
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleOpen = () => {
		this.setState({ open: true });
	};

	render() {
		return (
			<div id='cookieContainer'>
				{' '}
				<div>
					<p> We use cookies to make the website work and personalize your content.</p>
					<button className='acceptCookies' type='button' onClick={this.submitCookie}>
						Accept
					</button>
					<button id='manageCookies' type='button' onClick={this.handleOpen}>
						Manage Details
					</button>
				</div>
				<Modal
					className='modal'
					open={this.state.open}
					onClose={this.handleClose}
					closeAfterTransition
				>
					<div className='cookieModal'>
						<h1 id='cookieTitle'>Your Privacy</h1>
						<p>
							{' '}
							When you visit any website, it may store or retrieve information on your browser,
							mostly in the form of cookies. This information might be about you, your preferences
							or your device, and is mostly used to make the site work as you expect it to. The
							information doesn't usually directly identify you, but it can give you a more
							personalized experience. Because we respect your right to privacy, you can choose not
							to allow cookies. You may also choose to get the all the information we have stored
							about you. If this is your choice, click on "HELL NO, give me my data!"
						</p>
						<button className='acceptCookies' type='button' onClick={this.submitCookie}>
							Accept
						</button>
						<button id='getData' type='button' onClick={this.getUserData}>
							I want my data!
						</button>
						<button id='declineCookies' type='button' onClick={this.declineCookie}>
							I WANT TO BE FORGOTTEN!
						</button>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Cookie;
