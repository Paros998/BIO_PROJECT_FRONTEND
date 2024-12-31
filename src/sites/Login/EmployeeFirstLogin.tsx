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
import EmployeeFirstLoginForm from '../../forms/EmployeeFirstLoginForm';
import loginBg from '../../images/login_register.jpg';
import { FinishFirstLoginFormikValues } from '../../interfaces/formik/Formiks';
import { FinishFirstLoginRequest } from '../../interfaces/models/Api';

const FinishFirstLoginInitialValues: FinishFirstLoginFormikValues = {
	password: ''
};

const FinishFirstLoginValidationSchema = yup.object().shape({
	password: yup.string().required(`Password cannot be empty`).min(10, 'Password cannot be shorter than 10 signs')
});

const EmployeeFirstLogin = () => {
	const { logout } = useParams<{ logout: string }>();
	const navigate = useNavigate();
	const { fetchUser, currentUser } = useCurrentUser();

	const handleSubmit = async (finishFirstLoginFormikValues: FinishFirstLoginFormikValues) => {
		try {
			const finishFirstLoginBody: FinishFirstLoginRequest = {
				employeeId: currentUser?.userId as string,
				password: finishFirstLoginFormikValues.password
			};
			await Axios.post(`/employees/finish-first-login`, finishFirstLoginBody);

			toast.success('Finished registration successfully');

			navigate('/');

			await fetchUser();
		} catch (e: any) {
			toast.error(`Error occurred during first login ${',cause ' + e.businessError}`);
		}
	};

	return (
		<BackgroundImageContainer src={loginBg} className={'w-100 h-100'}>
			<Header>
				{logout ? (
					<>
						<div>
							<h3 className="text-light mb-0">Finish first login to continue.</h3>
						</div>
						<h4 className="text-danger rounded-pill p-1 mb-0">You have been logout successfully.</h4>
					</>
				) : (
					<div>
						<h3 className="text-light mb-0">Finish first login to continue.</h3>
					</div>
				)}
			</Header>

			<MainWrapper className={`text-light mt-4`}>
				<div className="d-flex flex-column bg-secondary-dark rounded-card-10 container-fluid align-items-center justify-content-center rounded p-4 w-75">
					<h4>Please finish first login by entering new password.</h4>

					<Formik<FinishFirstLoginFormikValues>
						initialValues={FinishFirstLoginInitialValues}
						onSubmit={handleSubmit}
						validationSchema={FinishFirstLoginValidationSchema}
					>
						<EmployeeFirstLoginForm />
					</Formik>
				</div>
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default EmployeeFirstLogin;
