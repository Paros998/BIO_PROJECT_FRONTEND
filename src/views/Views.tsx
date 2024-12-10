import React from 'react';

import Pending from '../components/Pending/Pending';
import { useCurrentUser } from '../contexts/UserContext/UserContext';
import { useInitAxios } from '../hooks/useInitAxios';
import { Role } from '../interfaces/enums/Role';

import AdminViews from './AuthorisedViews/AdminViews';
import ClientViews from './AuthorisedViews/ClientViews';
import EmployeeViews from './AuthorisedViews/EmployeeViews';
import UnauthorisedViews from './UnauthorisedViews/UnauthorisedViews';

const Views = () => {
	useInitAxios();
	const { roles, isPending } = useCurrentUser();

	if (isPending) return <Pending />;

	if (roles?.includes(Role.RoleAdmin)) return <AdminViews />;

	if (roles?.includes(Role.RoleEmployee)) return <EmployeeViews />;

	if (roles?.includes(Role.RoleClient)) return <ClientViews />;

	return <UnauthorisedViews />;
};

export default Views;
