import React from 'react';

import BackgroundImageContainer from '../../components/BackgroundImageContainer/BackgroundImageContainer';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Pending from '../../components/Pending/Pending';
import EmployeeVehicles from '../../components/Vehicles/EmployeeVehicles';
import MainWrapper from '../../components/Wrappers/MainWrapper';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import background from '../../images/login_register.jpg';

const ManageVehicles = () => {
	const { currentUser, isPending, onClearUser } = useCurrentUser();

	if (isPending) {
		return <Pending />;
	}

	if (!currentUser) {
		onClearUser();
	}

	return (
		<BackgroundImageContainer src={background} className={'w-100 h-100'}>
			<Header>
				<div>
					<h3 className="text-light mb-0">Welcome to Car Rental service</h3>
				</div>
			</Header>

			<MainWrapper className="px-4 py-2 h-100 d-flex align-items-center justify-content-center overflow-scroll overflow-x-hidden thumb-dark mt-4">
				<EmployeeVehicles />
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default ManageVehicles;
