import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '../../components/NotFound/NotFound';
import Pending from '../../components/Pending/Pending';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { HomeRoute } from '../../routes/Routes';
import Home from '../../sites/Home/Home';
import FirstLogin from '../../sites/Login/FirstLogin';

const ClientViews = () => {
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
				<Route path={HomeRoute} element={<FirstLogin />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path={HomeRoute} element={<Home />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default ClientViews;
