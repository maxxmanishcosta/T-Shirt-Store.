import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		didRedirect: false,
		role: 0,
	});

	const { email, password, error, didRedirect, role } = values;
	const { user } = isAuthenticated();

	var emailError = document.querySelector('.email.error');
	var passwordError = document.querySelector('.password.error');

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		// console.log(emailError);
		// console.log(passwordError);
		emailError.textContent = '';
		passwordError.textContent = '';
		event.preventDefault();
		signin({ email, password })
			.then((data) => {
				// console.log('check');
				console.log(data);
				console.log(data.error);
				if (data.errors) {
					setValues({ ...values, error: data.errors });
					errorMessage(data.errors);
					// errorvalueMessage(data.error);
				} else {
					// setValues({
					// 	...values,
					// 	name: '',
					// 	email: '',
					// 	password: '',
					// 	error: '',
					// 	didRedirect: true,
					// });
					// performRedirect();
					authenticate(data, () => {
						setValues({
							...values,
							email: '',
							password: '',
							error: '',
							didRedirect: true,
							role: data.user.role,
						});
					});
				}
			})
			.catch((err) => {
				console.log('manish');
				console.log(err);
				console.log('signin process falied!!!');
			});
	};

	const SignInForm = () => (
		<div className="row">
			<div className="col-md-6 text-left mx-auto">
				<form>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							onChange={handleChange('email')}
						/>
						<div className="text-danger font-bold error email"></div>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							onChange={handleChange('password')}
						/>
						<div className="text-danger font-bold error password"></div>
					</div>
					<button
						type="button"
						className="btn btn-dark btn-lg btn-block rounded"
						onClick={onSubmit}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);

	// const successMessage = () => {
	// 	// console.log(success);
	// 	return (
	// 		<div className="row">
	// 			<div className="col-md-6 offset-sm-3 text-left">
	// 				<div
	// 					className="alert alert-success"
	// 					style={{ display: success ? '' : 'none' }}>
	// 					Signin successfull!! Redirecting to main <Page></Page>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// };

	const errorMessage = (err) => {
		err.forEach((index) => {
			if (index.param === 'email') {
				emailError.textContent = index.msg;
				// console.log(emailError);
			}
			if (index.param === 'password') {
				passwordError.textContent = index.msg;
				// console.log(passwordError);
			}
		});
	};

	const errorvalueMessage = (errorMessage) => {
		errorMessage.forEach((index) => {
			if (index.param === 'email') {
				emailError.textContent = index.msg;
				// console.log(emailError);
			}
			if (index.param === 'password') {
				passwordError.textContent = index.msg;
				// console.log(passwordError);
			}
		});
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				if (isAuthenticated()) return <Redirect to="/" />;
			} else {
				if (isAuthenticated()) return <Redirect to="/Admin/Dashboard" />;
			}
		}
		// if (isAuthenticated()) {
		// 	return <Redirect to="/" />;
		// }
	};

	const redirectUser = () => {
		if (didRedirect) {
			if (role === 0) {
				// console.log('redirecting to home page');
				return <Redirect to="/" />;
			} else {
				return <Redirect to="/admin/dashboard" />;
			}
		}
	};

	return (
		<Base
			title="Sign-in Page"
			description="This Is the form for Signin on our Website">
			{/* {successMessage()} */}
			{SignInForm()}
			{redirectUser()}
		</Base>
	);
};

export default Signin;
