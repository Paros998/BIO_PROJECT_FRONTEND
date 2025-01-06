import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import Pending from '../../components/Pending/Pending';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { ClientIdVariable, ClientRentedCarsRoute, ClientsRoute, HomeRoute } from '../../routes/Routes';
import ClientRentedCars from '../../sites/Clients/ClientRentedCars';
import ManageClients from '../../sites/Clients/ManageClients';
import Home from '../../sites/Home/Home';
import EmployeeFirstLogin from '../../sites/Login/EmployeeFirstLogin';

const EmployeeViews = () => {
	const { isPending, currentUser } = useCurrentUser();

	if (isPending) return <Pending />;

	if (!currentUser)
		return (
			<Routes>
				<Route path="*" element={<NotFound />} />
			</Routes>
		);

	if (currentUser.firstLogin) {
		return (
			<Routes>
				<Route path={HomeRoute} element={<EmployeeFirstLogin />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path={HomeRoute} element={<Home />} />

			<Route path={ClientsRoute} element={<ManageClients />} />

			<Route path={ClientRentedCarsRoute + ClientIdVariable} element={<ClientRentedCars />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default EmployeeViews;
