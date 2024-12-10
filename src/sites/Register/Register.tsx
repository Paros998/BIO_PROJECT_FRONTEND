import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import BackgroundImageContainer from '../../components/BackgroundImageContainer/BackgroundImageContainer';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MainWrapper from '../../components/Wrappers/MainWrapper';
import RegisterForm from '../../forms/RegisterForm';
import loginBg from '../../images/login_register.jpg';
import { RegisterFormikValues } from '../../interfaces/formik/RegisterFormikValues';
import { LoginRoute } from '../../routes/Routes';

const RegisterFormikInitialValues: RegisterFormikValues = {
	username: '',
	password: ''
};

const RegisterFormValidationSchema = yup.object().shape({
	username: yup
		.string()
		.required(`Email cannot be empty`)
		.min(7, 'Email cannot be shorter than 7 signs')
		.email(`Not a valid email address`),
	password: yup.string().required(`Password cannot be empty`).min(10, 'Password cannot be shorter than 10 signs')
});

const Register = () => {
	const navigate = useNavigate();

	const handleSignUp = async (registerBody: RegisterFormikValues) => {
		try {
			await Axios.post('/users/register', registerBody);

			toast.success('Registered successfully, you are allowed to login now.');

			navigate('/login');
		} catch (e: any) {
			if (e.response?.status === 406) {
				toast.error('Email is already taken, please choose different one.');
			} else {
				toast.error('Error occurred during registering, please try again later.');
			}
		}
	};

	return (
		<BackgroundImageContainer src={loginBg} className={'w-100 h-100'}>
			<Header>
				<div>
					<h3 className="text-light mb-0">Sign up to use application.</h3>
				</div>
			</Header>

			<MainWrapper className="text-light mt-2">
				<div className="d-flex flex-column bg-secondary-dark rounded-card-10 container-fluid align-items-center justify-content-center rounded p-4 w-75">
					<h4>Provide user register data.</h4>

					<Formik<RegisterFormikValues>
						initialValues={RegisterFormikInitialValues}
						onSubmit={handleSignUp}
						validationSchema={RegisterFormValidationSchema}
					>
						<RegisterForm />
					</Formik>

					<button onClick={() => navigate(LoginRoute)} className="btn-secondary mt-5 rounded-pill p-2">
						Or sign in here, if you already have an account .
					</button>
				</div>
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default Register;
