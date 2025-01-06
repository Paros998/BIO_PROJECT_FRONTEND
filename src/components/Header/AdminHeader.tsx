import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ClientsRoute, EmployeesRoute, NewEmployeeRoute } from '../../routes/Routes';

const AdminHeader = () => {
	const navigate = useNavigate();

	return (
		<>
			<Dropdown className={`me-4`}>
				<Dropdown.Toggle variant="outline-info" id="dropdown-basic">
					Manage Vehicles
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>All Vehicles</Dropdown.Item>
					<Dropdown.Item>Rented Cars</Dropdown.Item>
					<Dropdown.Item>Vehicles Payments</Dropdown.Item>
					<Dropdown.Item>Register New Vehicle</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Dropdown className={`me-4`}>
				<Dropdown.Toggle variant="outline-success" id="dropdown-basic">
					Manage Employees
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item onClick={() => navigate(EmployeesRoute)}>Employees</Dropdown.Item>
					<Dropdown.Item onClick={() => navigate(NewEmployeeRoute)}>Register New Employee</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Dropdown className={`me-4`}>
				<Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
					Manage Clients
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item onClick={() => navigate(ClientsRoute)}>Clients</Dropdown.Item>
					<Dropdown.Item>Clients Payments</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
};

export default AdminHeader;
