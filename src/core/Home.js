import React, { useState, useEffect } from 'react';
import { API } from '../backend';
import '../styles.css';
import Base from './Base';
import Card from './card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);

	const loadAllProduct = () => {
		getProducts().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProduct();
	}, []);

	return (
		<div>
			{/* <h1 className="text-white">Welcome to the upside down!!</h1> */}
			<Base title="Welcome to our Store" description="Our Products">
				<div className="row text-center">
					<div className="row">
						{products.map((product, index) => {
							return (
								<div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
									<Card product={product} />
								</div>
							);
						})}
					</div>
				</div>
			</Base>
		</div>
	);
}
