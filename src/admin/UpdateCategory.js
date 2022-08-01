import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { updateCategory } from './helper/adminapicall';

const UpdateCategory = (props) => {
	// console.log('props is:');
	// console.log(props);
	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const handleChange = (event) => {
		setError('');
		setName(event.target.value);
		console.log(name);
	};

	const successMessage = () => {
		if (success) {
			return <h4 className="text-white">Category Updated Successfully!!</h4>;
		}
	};

	const warningMessage = () => {
		if (error) {
			return <h4 className="tet-warning">error in updating category :(</h4>;
		}
	};

	const onSubmit = (event) => {
		console.log(event.target.value);
		event.preventDefault();
		updateCategory(props.match.params.categoryId, user._id, token, name).then(
			(data) => {
				console.log(data);
				if (data.error) {
					setError(true);
					setSuccess(false);
				} else {
					setError(false);
					setSuccess(true);
				}
			}
		);
	};

	const myCategoryForm = () => (
		<form>
			<label className="lead">Enter the Category to be Updated</label>
			<input
				type="text"
				className="form-control my-3"
				onChange={handleChange}
				autoFocus
				placeholder="input category like summer/winter"
			/>
			<button onClick={onSubmit} className="btn btn-warning">
				Update Category
			</button>
		</form>
	);

	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-warning btn-sm mb-3" to="/admin/dashboard">
				Admin Home
			</Link>
		</div>
	);

	return (
		<Base
			title="Update a Category here"
			description="this is place/route to Update categories on out tshirt store"
			className="container bg-info p-4">
			<div className="row bg-success rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()} {warningMessage()} {myCategoryForm()} {goBack()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateCategory;
