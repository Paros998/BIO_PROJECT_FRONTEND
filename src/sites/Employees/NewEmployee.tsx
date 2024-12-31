import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import BackgroundImageContainer from '../../components/BackgroundImageContainer/BackgroundImageContainer';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Pending from '../../components/Pending/Pending';
import MainWrapper from '../../components/Wrappers/MainWrapper';
import { phoneRegex } from '../../constants/Regexes';
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import RegisterNewEmployeeForm from '../../forms/RegisterNewEmployeeForm';
import background from '../../images/login_register.jpg';
import { CreateEmployeeFormikValues } from '../../interfaces/formik/Formiks';

const CreateEmployeeFormikInitialValues: CreateEmployeeFormikValues = {
	username: '',
	password: '',
	firstName: '',
	lastName: '',
	nationalId: '',
	phoneNumber: ''
};

const CreateEmployeeFormValidationSchema = yup.object().shape({
	username: yup
		.string()
		.required(`Email cannot be empty`)
		.min(7, 'Email cannot be shorter than 7 signs')
		.email(`Not a valid email address`),
	password: yup.string().required(`Password cannot be empty`).min(10, 'Password cannot be shorter than 10 signs'),
	firstName: yup.string().required(`First name cannot be empty`),
	lastName: yup.string().required(`Last name cannot be empty`),
	phoneNumber: yup.string().required(`Phone cannot be empty`).matches(phoneRegex, `Phone is not a valid one`),
	nationalId: yup.string().required(`National id cannot be empty`)
});

const NewEmployee: FC = () => {
	const { currentUser, isPending, onClearUser } = useCurrentUser();
	const navigate = useNavigate();

	const handleCreateEmployee = async (registerBody: CreateEmployeeFormikValues) => {
		try {
			await Axios.post('/admins/new-employee', registerBody);

			toast.success('Employee registered successfully, he may proceed to do first login.');

			navigate('/employees');
		} catch (e: any) {
			if (e.response?.status === 422) {
				toast.error('Employee email is already taken, please choose different one.');
			} else {
				toast.error('Error occurred during registering, please try again later.');
			}
		}
	};

	if (isPending) {
		return <Pending />;
	}

	if (!currentUser) {
		onClearUser();
	}

	return (
		<BackgroundImageContainer src={background} className={'w-100 h-100'}>
			<Header>
				<div>
					<h3 className="text-light mb-0">Welcome to Car Rental service</h3>
				</div>
			</Header>

			<MainWrapper className="px-4 py-2 h-100 d-flex align-items-center justify-content-center overflow-scroll overflow-x-hidden thumb-dark mt-4">
				<div className="d-flex flex-column bg-secondary-dark rounded-card-10 container-fluid align-items-center justify-content-center rounded p-4 w-75">
					<h4 className={`text-light`}>Provide employee creation data.</h4>

					<Formik<CreateEmployeeFormikValues>
						initialValues={CreateEmployeeFormikInitialValues}
						onSubmit={handleCreateEmployee}
						validationSchema={CreateEmployeeFormValidationSchema}
					>
						<RegisterNewEmployeeForm />
					</Formik>
				</div>
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default NewEmployee;
