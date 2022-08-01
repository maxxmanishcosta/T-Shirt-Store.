import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
const Signup = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false,
	});

	// console.log(nameError);

	const { name, email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		let nameError = document.querySelector('.name.error');
		let emailError = document.querySelector('.email.error');
		let passwordError = document.querySelector('.password.error');
		nameError.textContent = '';
		emailError.textContent = '';
		passwordError.textContent = '';
		// console.log(values);
		// setValues({ ...values, error: false });
		signup({ name, email, password })
			.then((data) => {
				console.log(data);
				// console.log(data.error);
				if (data.errors) {
					setValues({ ...values, error: data.errors, success: false });

					//handling errors
					console.log(data.errors);
					data.errors.forEach((index) => {
						if (index.param === 'name') {
							nameError.textContent = index.msg;
							// console.log(nameError);
						}
						if (index.param === 'email') {
							emailError.textContent = index.msg;
							// console.log(emailError);
						}
						if (index.param === 'password') {
							passwordError.textContent = index.msg;
							// console.log(passwordError);
						}
					});
				} else {
					setValues({
						...values,
						name: '',
						email: '',
						password: '',
						error: '',
						success: true,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				console.log('signup process failed!!');
			});
	};
	// console.log(nameError);

	const SignUpForm = () => (
		<div className="row form-margin">
			<div className="col-md-6 text-left mx-auto">
				<form className="form-margin">
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							// value={name}
							className="form-control"
							onChange={handleChange('name')}
						/>
						<div className="text-danger font-bold error name"></div>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							// value={email}
							className="form-control"
							onChange={handleChange('email')}
						/>
						<div className="text-danger font-bold error email"></div>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							// value={password}
							className="form-control"
							onChange={handleChange('password')}
						/>
						<div className="text-danger font-bold error password"></div>
					</div>
					<button
						onClick={onSubmit}
						type="button"
						className="btn btn-dark btn-lg btn-block rounded">
						Submit
					</button>
				</form>
			</div>
		</div>
	);

	const successMessage = () => {
		// console.log(success);
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? '' : 'none' }}>
						New account was created successfully. Please{' '}
						<Link to="/signin">Login Here</Link>
					</div>
				</div>
			</div>
		);
	};

	// const errorMessage = (err) => {
	// 	err.forEach((index) => {
	// 		if (index.param === 'name') {
	// 			nameError.textContent = index.msg;
	// 			// console.log(nameError);
	// 		}
	// 		if (index.param === 'email') {
	// 			emailError.textContent = index.msg;
	// 			// console.log(emailError);
	// 		}
	// 		if (index.param === 'password') {
	// 			passwordError.textContent = index.msg;
	// 			// console.log(passwordError);
	// 		}
	// 	});
	// };

	return (
		<Base
			title="Sign-Up Page"
			description="This Is the form for Registration/Signup on our Website">
			{successMessage()}
			{SignUpForm()}
		</Base>
	);
};

export default Signup;
