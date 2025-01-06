import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ClientHeader = () => {
	const navigate = useNavigate();

	return (
		<>
			<Dropdown className={`me-4`}>
				<Dropdown.Toggle variant="outline-info" id="dropdown-basic">
					Vehicles
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>All Vehicles</Dropdown.Item>
					<Dropdown.Item>Rented Cars</Dropdown.Item>
					<Dropdown.Item>Vehicles Payments</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
};

export default ClientHeader;
