import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import BackgroundImageContainer from '../../components/BackgroundImageContainer/BackgroundImageContainer';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainWrapper from '../../components/Wrappers/MainWrapper';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import LoginForm from '../../forms/LoginForm';
import { baseUrl, endpointsPrefix } from '../../hooks/useInitAxios';
import loginBg from '../../images/login_register.jpg';
import { LoginFormikValues } from '../../interfaces/formik/LoginFormikValues';
import { RegisterRoute } from '../../routes/Routes';
import { appendUrlSearchParams } from '../../utils/appendUrlSearchParams';

const LoginFormikInitialValues: LoginFormikValues = {
	username: '',
	password: ''
};

const LoginFormValidationSchema = yup.object().shape({
	username: yup.string().required(`Email cannot be empty`).email(`Not a valid email address`),
	password: yup.string().required(`Password cannot be empty`)
});

const Login = () => {
	const { logout } = useParams<{ logout: string }>();
	const navigate = useNavigate();
	const { fetchUser, setIsPending } = useCurrentUser();

	const handleSignIn = async (values: LoginFormikValues) => {
		const loginParams = appendUrlSearchParams(values);
		try {
			setIsPending(true);
			Axios.defaults.baseURL = baseUrl;
			const { headers } = await Axios.post('/login', loginParams);
			Axios.defaults.baseURL = baseUrl + endpointsPrefix;

			const accessToken = headers.authorization;
			Axios.defaults.headers.common.Authorization = accessToken;
			localStorage.setItem('JWT_USER_TOKEN', accessToken);

			toast.success('Logged successfully');

			navigate('/');

			await fetchUser();
		} catch (e: any) {
			toast.error('Email or Password incorrect');
		}
	};

	return (
		<BackgroundImageContainer src={loginBg} className={'w-100 h-100'}>
			<Header>
				{logout ? (
					<>
						<div>
							<h3 className="text-light mb-0">Please Sign in Again to continue.</h3>
						</div>
						<h4 className="text-danger rounded-pill p-1 mb-0">You have been logout successfully.</h4>
					</>
				) : (
					<div>
						<h3 className="text-light mb-0">Please Sign in to continue.</h3>
					</div>
				)}
			</Header>

			<MainWrapper className={`text-light mt-4`}>
				<div className="d-flex flex-column bg-secondary-dark rounded-card-10 container-fluid align-items-center justify-content-center rounded p-4 w-75">
					<h4>Provide login data.</h4>

					<Formik<LoginFormikValues>
						initialValues={LoginFormikInitialValues}
						onSubmit={handleSignIn}
						validationSchema={LoginFormValidationSchema}
					>
						<LoginForm />
					</Formik>

					<button onClick={() => navigate(RegisterRoute)} className="btn-secondary mt-5 rounded-pill p-2">
						{/* eslint-disable-next-line react/no-unescaped-entities */}
						Or sign up here, if you don't have an account .
					</button>
				</div>
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default Login;
