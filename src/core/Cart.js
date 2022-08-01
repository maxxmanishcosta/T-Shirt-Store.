import React, { useState, useEffect } from 'react';
import { API } from '../backend';
import '../styles.css';
import Base from './Base';
import Card from './card';
import { loadCart } from './helper/Carthelper';
import Paymentb from './PaymentB';

export default function Cart() {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = (products) => {
		return (
			<div>
				<h2 id="heading">Your Products</h2>
				{products.map((product, index) => (
					<Card
						key={index}
						product={product}
						removefromcart={true}
						addtocart={false}
						setReload={setReload}
						reload={reload}
					/>
				))}
			</div>
		);
	};

	const loadCheckout = () => {};

	return (
		<div>
			{/* <h1 className="text-white">Welcome to the upside down!!</h1> */}
			<Base title="Cart Page" description="Ready to checkout!!">
				<div className="row text-center">
					<div className="col-6">
						{products.length > 0 ? (
							loadAllProducts(products)
						) : (
							<h3 id="heading">No Products in Cart!!</h3>
						)}
					</div>
					<div className="col-6">
						<Paymentb products={products} setReload={setReload} />
					</div>
				</div>
			</Base>
		</div>
	);
}
