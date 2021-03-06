import React, { Component } from 'react';
import { TextField, Button, Card } from '@material-ui/core';
import { postLogin } from '../utils/api';

class Login extends Component {
	state = { email: '', password: '' };

	login = async () => {
		const { email, password } = this.state;
		const res = await postLogin(email, password);

		if (res.data) {
			window.sessionStorage.setItem('token', res.data);
			console.log(res.data);
			return this.props.auth(res.data);
		}
	};

	onSubmit = (e) => {
		e.preventDefault();

		this.setState({ email: '', password: '' });
	};

	render() {
		return (
			<div id='login-container'>
				<form onSubmit={this.onSubmit} className='accForm'>
					<Card className='card'>
						<h1>Sign in</h1>

						<label htmlFor='email'>
							<h3 className='logInTitles'>Email adress</h3>
							<TextField
								id='loginEmail'
								className='createInputs'
								type='email'
								name='email'
								variant='outlined'
								size='small'
								required
								value={this.state.email}
								onChange={(e) => this.setState({ email: e.target.value })}
								placeholder='Enter email...'
							/>
						</label>
						<label htmlFor='password'>
							<h3 className='logInTitles'>Password</h3>
						</label>
						<TextField
							id='loginPassword'
							className='createInputs'
							type='password'
							name='password'
							variant='outlined'
							size='small'
							required
							value={this.state.password}
							onChange={(e) => this.setState({ password: e.target.value })}
							placeholder='Enter password...'
						/>
						<div>
							<div id='loginBottomContainer'>
								<Button
									type='submit'
									value='submit'
									variant='contained'
									id='submitLogin'
									color='inherit'
									onClick={this.login}
								>
									Submit
								</Button>{' '}
							</div>
							<div id='createAccLink'>
								<span>Dont have an account?</span> <br />
								<a className='createAnchor' href='/create'>
									<span>Create Account</span>
								</a>{' '}
							</div>
						</div>
					</Card>
				</form>
			</div>
		);
	}
}

export default Login;
