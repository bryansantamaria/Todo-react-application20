import React from 'react';
import { Route } from 'react-router-dom';

function PrivateRouteCreate({ component: Component, ...rest }) {
	// const isAdmin = sessionStorage.getItem('role');
	return (
		<Route
			{...rest}
			render={
				(props) => <Component exact path='/create' {...props} {...rest} />
				// isAdmin === 'admin' ? (
				// 	<Component exact path='/create' {...props} {...rest} />
				// ) : (
				// 	<Redirect to='/' />
				// )
			}
		/>
	);
}

export default PrivateRouteCreate;
