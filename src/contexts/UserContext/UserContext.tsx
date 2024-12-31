import { Context, createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { Role } from '../../interfaces/enums/Role';
import { UserModel } from '../../interfaces/models/Api';
import { JwtUser } from '../../interfaces/models/JwtUser';
import { UserContextInterface } from '../../interfaces/models/UserContextInterface';

const UserContext = createContext<any>(undefined);

export const useCurrentUser = () => useContext(UserContext as Context<UserContextInterface>);

interface ProviderProps {
	children: ReactNode;
}

const CurrentUserProvider: FC<ProviderProps> = ({ children }) => {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState<UserModel>();
	const [roles, setRoles] = useState<Role[]>();
	const [isPending, setIsPending] = useState(false);

	const onClearUser = async () => {
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
			const { data } = await Axios.get<UserModel>(`/users/${userId}`);
			setCurrentUser(data);
			setRoles([data.role]);
		} catch (e: any) {
			toast.error(e);
			const status = e?.response?.status;

			if (status === 404) {
				await onClearUser();
			}
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

	const contextData = useMemo(() => {
		return {
			currentUser,
			fetchUser,
			isPending,
			setIsPending,
			onLogOut,
			onClearUser,
			roles
		};
	}, [currentUser, isPending]);

	// eslint-disable-next-line react/react-in-jsx-scope
	return <UserContext.Provider value={contextData}>{children}</UserContext.Provider>;
};

export default CurrentUserProvider;
