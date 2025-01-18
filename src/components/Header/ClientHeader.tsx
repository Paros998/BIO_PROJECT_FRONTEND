import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { HomeRoute, MyPaymentsForRents, MyRentedVehicles } from '../../routes/Routes';

const ClientHeader = () => {
	const navigate = useNavigate();

	return (
		<Dropdown className={`me-4`}>
			<Dropdown.Toggle variant="outline-info" id="dropdown-basic">
				Vehicles
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onClick={() => navigate(HomeRoute)}>Vehicles to Rent</Dropdown.Item>
				<Dropdown.Item onClick={() => navigate(MyRentedVehicles)}>Rented Cars</Dropdown.Item>
				<Dropdown.Item onClick={() => navigate(MyPaymentsForRents)}>Vehicles Payments</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ClientHeader;
