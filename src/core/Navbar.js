import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';

const Navbar = ({ history }) => {
	const currentTab = (history, path) => {
		if (history.location.pathname === path) {
			return { fontWeight: 'bold', color: '#FFFFFF' };
		} else {
			return { color: '#FFFFFF' };
		}
	};
	return (
		<div>
			<nav className="navbar  nav-colour navbar-expand">
				<div className="container-fluid">
					<a
						className="navbar-brand navBrand-font text-white font-weight-bold font-italic"
						href="/">
						T-Shirt Store
					</a>

					<ul className="navbar-nav ml-auto">
						<li className=" active nav-item mx-2 nav-item-size">
							<Link style={currentTab(history, '/')} className="nav-link" to="/">
								Home
							</Link>
						</li>
						{isAuthenticated() && (
							<li className="nav-item mx-2 nav-item-size">
								<Link
									style={currentTab(history, '/user/cart')}
									className="nav-link "
									to="/user/cart">
									Cart
								</Link>
							</li>
						)}
						{isAuthenticated() && isAuthenticated().user.role === 1 && (
							<li className="nav-item mx-2 text-warning nav-item-size">
								<Link
									style={currentTab(history, '/Admin/Dashboard')}
									className="nav-link"
									to="/Admin/Dashboard">
									Admin Dashboard
								</Link>
							</li>
						)}
						{!isAuthenticated() && (
							<li className="nav-item mx-2 nav-item-size">
								<button
									type="button"
									className="btn btn-lg btn-light text-white rounded p-0 px-2">
									<Link className="nav-link text-dark" to="/signin">
										Sign In
									</Link>
								</button>
							</li>
						)}
						{!isAuthenticated() && (
							<li className="nav-item mx-2 text-white nav-item-size">
								<button
									type="button"
									className="btn btn-lg btn-warning rounded p-0 px-2">
									<Link className="nav-link text-white" to="/signup">
										Sign Up
									</Link>
								</button>
							</li>
						)}
						{isAuthenticated() && (
							<li className="nav-item text-white mx-2 nav-item-size">
								<button
									type="button"
									className="btn btn-lg btn-warning rounded p-0 px-2">
									<Link
										className="nav-link"
										to="/"
										onClick={() => {
											signout(() => {
												history.push('/');
											});
										}}>
										Sign Out
									</Link>
								</button>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default withRouter(Navbar);
