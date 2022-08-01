import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import manageCategories from './admin/manageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
const Routes = () => {
	return (
		<div>
			{/* to set up the react routing in our application we use BrowserRouter from react-router-dom */}
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/user/cart" exact component={Cart} />
					<Route path="/signup" exact component={Signup} />
					<Route path="/signin" exact component={Signin} />
					<PrivateRoute path="/user/cart" exact component={UserDashBoard} />
					<AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
					<AdminRoute path="/admin/create/category" exact component={AddCategory} />
					<AdminRoute path="/admin/categories" exact component={manageCategories} />
					<AdminRoute path="/admin/create/product" exact component={AddProduct} />
					<AdminRoute path="/admin/products" exact component={ManageProducts} />
					<AdminRoute
						path="/admin/product/update/:productId"
						exact
						component={UpdateProduct}
					/>
					<AdminRoute
						path="/admin/category/update/:categoryId"
						exact
						component={UpdateCategory}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default Routes;
