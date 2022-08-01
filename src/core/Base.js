import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';

const Base = ({
	title = 'My Title',
	description = 'My desription',
	className = 'text-white p-4',
	children,
}) => {
	return (
		<div>
			<Navbar />
			<div className="container-fluid">
				<div id="heading" className="text-center">
					<h2 className="display-4">{title}</h2>
					<p className="lead font-weight-bold">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer mt-auto footer-padding">
				<div className="container-fluid nav-colour px-2 text-right">
					<span className="px-2 text-white font-weight-bold">For Any Query: </span>
					<a
						class="btn btn-light btn-large font-weight-bold"
						href="https://www.linkedin.com/in/manish-motwani-76729a148"
						role="button">
						Contact-Us
					</a>
				</div>
				<span className="text-muted ">
					<center>@Created With Love By: Manish Motwani</center>
				</span>
			</footer>
		</div>
	);
};

export default Base;
