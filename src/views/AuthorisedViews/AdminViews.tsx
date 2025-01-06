import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import Pending from '../../components/Pending/Pending';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import {
	ClientIdVariable,
	ClientRentedCarsRoute,
	ClientsRoute,
	EmployeesRoute,
	HomeRoute,
	NewEmployeeRoute
} from '../../routes/Routes';
import ClientRentedCars from '../../sites/Clients/ClientRentedCars';
import ManageClients from '../../sites/Clients/ManageClients';
import ManageEmployees from '../../sites/Employees/ManageEmployees';
import NewEmployee from '../../sites/Employees/NewEmployee';
import Home from '../../sites/Home/Home';

const AdminViews = () => {
	const { isPending, currentUser } = useCurrentUser();

	if (isPending) return <Pending />;

	if (!currentUser)
		return (
			<Routes>
				<Route path="*" element={<NotFound />} />
			</Routes>
		);

	return (
		<Routes>
			<Route path={HomeRoute} element={<Home />} />

			<Route path={NewEmployeeRoute} element={<NewEmployee />} />

			<Route path={EmployeesRoute} element={<ManageEmployees />} />

			<Route path={ClientsRoute} element={<ManageClients />} />

			<Route path={ClientRentedCarsRoute + ClientIdVariable} element={<ClientRentedCars />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AdminViews;
