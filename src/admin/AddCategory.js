import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const handleChange = (event) => {
		setError('');
		setName(event.target.value);
	};

	const successMessage = () => {
		if (success) {
			return <h4 className="text-white">Category Created Successfully!!</h4>;
		}
	};

	const warningMessage = () => {
		if (error) {
			return <h4 className="tet-warning">error in creating category :(</h4>;
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setError('');
		setSuccess(false);
		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError('');
				setSuccess(true);
				setName('');
			}
		});
	};

	const myCategoryForm = () => (
		<form>
			<label className="lead text-white font-weight-bold">
				Enter the Category
			</label>
			<input
				type="text"
				className="form-control my-3"
				onChange={(e) => handleChange(e)}
				autoFocus
				value={name}
				placeholder="input category like summer/winter"
			/>
			<button onClick={onSubmit} className="btn btn-info">
				Create Category
			</button>
		</form>
	);

	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-info btn-sm mb-3" to="/admin/dashboard">
				Admin Home
			</Link>
		</div>
	);

	return (
		<Base
			title="Create a new Category here"
			description="this is place/route to add new category like summer/winter on out tshirt store"
			className="container p-4 card-colour admin-card-padding">
			<div className="col-md-8 offset-md-2 admin-card-padding card-colour">
				{successMessage()} {warningMessage()} {myCategoryForm()} {goBack()}
			</div>
		</Base>
	);
};

export default AddCategory;
