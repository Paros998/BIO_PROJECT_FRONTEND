import React from 'react';

import Pending from '../components/Pending/Pending';
import { useCurrentUser } from '../contexts/UserContext/UserContext';
import { useInitAxios } from '../hooks/useInitAxios';
import { Roles } from '../interfaces/enums/Roles';

import AdminViews from './AuthorisedViews/AdminViews';
import UserViews from './AuthorisedViews/UserViews';
import UnauthorisedViews from './UnauthorisedViews/UnauthorisedViews';

const Views = () => {
	useInitAxios();
	const { roles, isPending } = useCurrentUser();

	if (isPending) return <Pending />;

	if (roles && roles.includes(Roles.RoleAdmin)) return <AdminViews />;

	if (roles && roles.includes(Roles.RoleUser)) return <UserViews />;

	return <UnauthorisedViews />;
};

export default Views;
