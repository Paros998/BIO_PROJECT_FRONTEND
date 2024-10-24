import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import { HomeRoute, LoginRoute, RegisterRoute } from '../../routes/Routes';
import Login from '../../sites/Login/Login';
import Register from '../../sites/Register/Register';

const UnauthorisedViews = () => {
	return (
		<Routes>
			<Route path={HomeRoute} element={<Login />} />

			<Route path={LoginRoute} element={<Login />} />

			<Route path={RegisterRoute} element={<Register />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default UnauthorisedViews;
