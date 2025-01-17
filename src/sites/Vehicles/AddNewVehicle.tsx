import React from 'react';
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
import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import NewVehicleForm from '../../forms/NewVehicleForm';
import background from '../../images/login_register.jpg';
import { AddVehicleRequest } from '../../interfaces/models/Api';
import { VehiclesRoute } from '../../routes/Routes';

const AddVehicleRequestInitialValues: AddVehicleRequest = {
	model: '',
	color: '#000000',
	plate: '',
	rentPerDayPrice: '',
	yearOfProduction: 2000
};

const AddVehicleRequestValidationSchema = yup.object().shape({
	model: yup.string().required(`Model cannot be empty`),
	color: yup.string().required(`Color cannot be empty`),
	plate: yup.string().required(`Plate cannot be empty`),
	rentPerDayPrice: yup.number().required(`Price cannot be empty`).min(0).max(999999),
	yearOfProduction: yup.number().required(`Year of production cannot be empty`).min(1900).max(2025)
});

const AddNewVehicle = () => {
	const navigate = useNavigate();
	const { currentUser, isPending, onClearUser } = useCurrentUser();

	const createNewVehicle = async (newVehicle: AddVehicleRequest) => {
		try {
			await Axios.post(`/vehicles`, newVehicle);

			toast.success('Added new vehicle to car rental.');

			navigate(VehiclesRoute);
		} catch (e: any) {
			toast.error('Error occured during');
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

			<MainWrapper className={`text-light mt-4`}>
				<div className="d-flex flex-column bg-secondary-dark rounded-card-10 container-fluid align-items-center justify-content-center rounded p-4 w-75">
					<h4>Provide new vehicle data</h4>

					<Formik
						initialValues={AddVehicleRequestInitialValues}
						onSubmit={createNewVehicle}
						validationSchema={AddVehicleRequestValidationSchema}
					>
						<NewVehicleForm />
					</Formik>
				</div>
			</MainWrapper>

			<Footer />
		</BackgroundImageContainer>
	);
};

export default AddNewVehicle;
