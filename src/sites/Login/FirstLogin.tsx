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
import FinishRegisterForm from '../../forms/FinishRegisterForm';
import loginBg from '../../images/login_register.jpg';
import { FinishRegisterFormikValues } from '../../interfaces/formik/FinishRegisterFormikValues';

const FinishRegisterInitialValues: FinishRegisterFormikValues = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	nationalId: ''
};

const phoneRegex = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/;
// const nationalIdRegex = /^[+]{1}(?:[0-9\\-\\(\\)\\/\\.]\\s?){9, 9}[0-9]{1}$/;

const FinishRegisterValidationSchema = yup.object().shape({
	firstName: yup.string().required(`First name cannot be empty`),
	lastName: yup.string().required(`Last name cannot be empty`),
	phoneNumber: yup.string().required(`Phone cannot be empty`).matches(phoneRegex, `Phone is not a valid one`),
	nationalId: yup.string().required(`National id cannot be empty`)
});

const FirstLogin = () => {
	const { logout } = useParams<{ logout: string }>();
	const navigate = useNavigate();
	const { fetchUser, currentUser } = useCurrentUser();

	const handleSubmit = async (finishRegisterBody: FinishRegisterFormikValues) => {
		try {
			await Axios.post(`/users/finish-register/${currentUser?.userId}`, finishRegisterBody);

			toast.success('Finished registration successfully');

			navigate('/');

			await fetchUser();
		} catch (e: any) {
			toast.error('Error occurred during finish registration');
		}
	};

	return (
		<BackgroundImageContainer src={loginBg} className={'w-100 h-100'}>
			<Header>
				{logout ? (
					<>
						<div>
							<h3 className="text-light mb-0">Finish registration to continue.</h3>
						</div>
						<h4 className="text-danger rounded-pill p-1 mb-0">You have been logout successfully.</h4>
					</>
				) : (
					<div>
						<h3 className="text-light mb-0">Finish registration to continue.</h3>
					</div>
				)}
			</Header>

			<MainWrapper className={`text-light mt-2`}>
				<div className="d-flex flex-column bg-secondary-dark rounded-card-10 container-fluid align-items-center justify-content-center rounded p-4 w-75">
					<h4>Please finish registration by entering personal data.</h4>

					<Formik<FinishRegisterFormikValues>
						initialValues={FinishRegisterInitialValues}
						onSubmit={handleSubmit}
						validationSchema={FinishRegisterValidationSchema}
					>
						<FinishRegisterForm />
					</Formik>
				</div>
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default FirstLogin;
