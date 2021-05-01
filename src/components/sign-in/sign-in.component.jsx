import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ email: '', password: '' });
	}

	handleChange(e) {
		const { value, name } = e.target;

		this.setState({ [name]: value });
	}

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account!</h2>
				<span>Sign In with your email and password.</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='email'
						handleChange={this.handleChange}
						value={this.state.email}
						label='email'
						required
					/>
					{/* <label>Email</label> */}
					<FormInput
						name='password'
						type='password'
						handleChange={this.handleChange}
						value={this.state.password}
						label='password'
						required
					/>
					{/* <label>password</label> */}
					<CustomButton type='submit'> SIGN IN </CustomButton>
				</form>
			</div>
		);
	}
}

export default SignIn;
