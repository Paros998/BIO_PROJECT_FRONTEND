import React, { FC, ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { Role } from '../../interfaces/enums/Role';
import { HomeRoute, MyRentedVehicles } from '../../routes/Routes';

import AdminHeader from './AdminHeader';
import ClientHeader from './ClientHeader';
import EmployeeHeader from './EmployeeHeader';

interface HeaderProps {
	children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
	const { currentUser, roles, onLogOut } = useCurrentUser();
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header>
			<div className="h-100 d-inline-flex container-fluid align-items-center justify-content-between px-4 py-2 bg-dark text-light">
				{children}

				<div className={`d-inline-flex justify-content-end`}>
					<Button
						variant={'outline-primary-dark'}
						disabled={location?.pathname === HomeRoute}
						className={`me-4`}
						onClick={() => navigate(HomeRoute)}
					>
						Home
					</Button>

					{currentUser && roles?.includes(Role.RoleClient) && (
						<Button
							variant={'outline-primary-light'}
							disabled={location?.pathname === MyRentedVehicles}
							className={`me-4`}
							onClick={() => navigate(MyRentedVehicles)}
						>
							My Rented Vehicles
						</Button>
					)}

					{roles?.includes(Role.RoleAdmin) && <AdminHeader />}

					{roles?.includes(Role.RoleEmployee) && <EmployeeHeader />}

					{roles?.includes(Role.RoleClient) && <ClientHeader />}

					{currentUser && (
						<Button variant={'danger'} onClick={() => onLogOut()}>
							Logout
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
