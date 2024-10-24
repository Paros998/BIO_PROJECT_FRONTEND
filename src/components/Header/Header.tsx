import React, { FC, ReactNode } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { Roles } from '../../interfaces/enums/Roles';

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
					{/*{currentUser && (*/}
					{/*	<Button*/}
					{/*		variant={'outline-primary-light'}*/}
					{/*		disabled={location?.pathname === MyLendsRoute}*/}
					{/*		className={`me-4`}*/}
					{/*		onClick={() => navigate(MyLendsRoute)}*/}
					{/*	>*/}
					{/*		My lent books*/}
					{/*	</Button>*/}
					{/*)}*/}

					{roles?.includes(Roles.RoleAdmin) && (
						<>
							<Dropdown className={`me-4`}>
								<Dropdown.Toggle variant="outline-info" id="dropdown-basic">
									Manage Books
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item>Books</Dropdown.Item>
									<Dropdown.Item>Stocks</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>

							<Dropdown className={`me-4`}>
								<Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
									Manage Users
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item>Users</Dropdown.Item>
									<Dropdown.Item>User Lends</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</>
					)}

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
