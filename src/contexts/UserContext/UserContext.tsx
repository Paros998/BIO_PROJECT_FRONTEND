import { Context, createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { Roles } from '../../interfaces/enums/Roles';
import { JwtUser } from '../../interfaces/JwtUser';
import { UserModel } from '../../interfaces/models/Api';
import { UserContextInterface } from '../../interfaces/models/UserContextInterface';

const UserContext = createContext<any>(undefined);

export const useCurrentUser = () => useContext(UserContext as Context<UserContextInterface>);

interface ProviderProps {
	children: ReactNode;
}

const CurrentUserProvider: FC<ProviderProps> = ({ children }) => {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState<UserModel>();
	const [roles, setRoles] = useState<Roles[]>();
	const [isPending, setIsPending] = useState(false);

	const onClearUser = async () => {
		setCurrentUser(undefined);

		await onLogOut();
	};

	const fetchUser = useCallback(async () => {
		setIsPending(true);

		const token = localStorage.getItem('JWT_USER_TOKEN');

		if (!token) {
			setIsPending(false);
			setCurrentUser(undefined);
			return;
		}

		if (Axios.defaults.headers.common.Authorization === undefined) {
			Axios.defaults.headers.common.Authorization = token;
		}

		const { userId }: JwtUser = jwtDecode(token);

		try {
			const { data } = await Axios.get<UserModel>(`/users/find/${userId}`);
			setCurrentUser(data);
			setRoles(data.roles);
		} catch (e: any) {
			toast.error(e);
		} finally {
			setIsPending(false);
		}
	}, []);

	useEffect(() => {
		fetchUser().catch();
	}, [fetchUser]);

	const onLogOut = async () => {
		localStorage.removeItem('JWT_USER_TOKEN');

		if (currentUser) {
			toast.info('We hope to see you again soon');
		}

		setCurrentUser(undefined);
		setRoles([]);

		delete Axios.defaults.headers.common['Authorization'];

		navigate('/');

		await fetchUser();
	};

	// TODO useMemo
	const contextData = {
		currentUser,
		fetchUser,
		isPending,
		setIsPending,
		onLogOut,
		onClearUser,
		roles
	};

	// eslint-disable-next-line react/react-in-jsx-scope
	return <UserContext.Provider value={contextData}>{children}</UserContext.Provider>;
};

export default CurrentUserProvider;
