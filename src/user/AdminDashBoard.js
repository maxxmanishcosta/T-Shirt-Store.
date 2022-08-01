import React from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import Base from '../core/Base';

const AdminDashBoard = () => {
	const {
		user: { name, email, role },
	} = isAuthenticated();

	const adminLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-dark text-white">Admin Navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/admin/create/category" className="nav-link text-info">
							Create Category
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/categories" className="nav-link text-info">
							Manage Category
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/create/product" className="nav-link text-info">
							Create Product
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/order" className="nav-link text-info">
							Manage Orders
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/admin/products" className="nav-link text-info">
							Manage Products
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header bg-dark text-white">Admin Information</h4>
				<ul className="list-group">
					<li className="list-group-item ">
						<span className="badge badge-sucess mr-2 font-weight-bold">Name:-</span>{' '}
						{name}
					</li>
					<li className="list-group-item ">
						<span className="badge badge-sucess mr-2 font-weight-bold">Email:-</span>{' '}
						{email}
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Base
			title="Welcome to admin area"
			description="Manage all of your products here"
			className="container card-colour pd-4 admin-card">
			{/* <h1>this is AdminDashBoard page</h1> */}
			<div className="row admin-card-padding">
				<div className="col-3">{adminLeftSide()}</div>
				<div className="col-9">{adminRightSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
