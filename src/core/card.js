import React, { useState, useEffect } from 'react';
import Imagehelper from './helper/Imagehelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/Carthelper';
import { isAuthenticated } from '../auth/helper';

const Card = ({
	product,
	addtocart = true,
	removefromcart = false,
	reload = undefined,
	setReload = function (f) {
		return f;
	},
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const cardTitle = product ? product.name : 'A random photo..';
	const cardDescription = product
		? product.description
		: 'A random description..';
	const cardPrice = product ? product.price : 'A random price..';

	const addTocart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getARedirect = (redirect) => {
		if (redirect && isAuthenticated()) {
			return <Redirect to="/user/cart" />;
		} else if (redirect) {
			return <Redirect to="/signin" />;
		}
	};

	const showAddToCart = (addtocart) => {
		return (
			addtocart && (
				<button
					onClick={addTocart}
					className="btn btn-block text-white btn-outline-info mt-2 mb-2">
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = (removefromcart) => {
		return (
			removefromcart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2">
					Remove from cart
				</button>
			)
		);
	};

	return (
		<div className="card text-white card-colour border border-info ">
			<div className="card-header lead ">Author:- {cardTitle}</div>
			<div className="card-body">
				{getARedirect(redirect)}
				<Imagehelper product={product} />
				<p className="lead bg-info font-weight-normal text-wrap">
					{cardDescription}
				</p>
				<p className="btn price rounded  btn-sm px-4">$ {cardPrice}</p>
				<div className="row">
					<div className="col-12 ">{showAddToCart(addtocart)}</div>
					<div className="col-12">{showRemoveFromCart(removefromcart)}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
