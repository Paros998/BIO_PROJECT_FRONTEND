import { useEffect, useState } from 'react';
import Axios from 'axios';

import { useCurrentUser } from '../contexts/UserContext/UserContext';

const base = process.env.REACT_APP_APP_SECURE_HTTP ? 'https' : 'http';

export const baseUrl = `${base}://localhost:8080/`;
export const endpointsPrefix = `api`;

export const useInitAxios = () => {
	Axios.defaults.baseURL = baseUrl + endpointsPrefix;

	const [errorCode, setErrorCode] = useState();
	const { onClearUser } = useCurrentUser();

	useEffect(() => {
		Axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const status = error?.response?.status;
				if (status === 401 || status === 499 || status === 403) {
					onClearUser();
				} else if ([404].includes(status) && error.response.config.method === 'get') {
					setErrorCode(status);
				}
				return Promise.reject(error);
			}
		);
	}, [onClearUser]);

	return errorCode;
};
