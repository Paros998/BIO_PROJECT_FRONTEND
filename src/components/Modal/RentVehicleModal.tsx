import React, { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { CreateVehicleRentalRequest } from '../../interfaces/models/Api';
import { MyRentedVehicles } from '../../routes/Routes';
import SubmitButton from '../SubmitButton/SubmitButton';

type RentVehicleModalProps = {
	vehicleId: string;
	rentPerDay: number;
	refresh?: () => Promise<void>;
};

const RentVehicleModal: FC<RentVehicleModalProps> = ({ rentPerDay, vehicleId, refresh }) => {
	const navigate = useNavigate();
	const { currentUser, isPending } = useCurrentUser();
	const [numberOfDays, setNumberOfDays] = useState<number>(1);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	if (!currentUser || isPending) {
		return null;
	}

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			const request: CreateVehicleRentalRequest = {
				vehicleId: vehicleId,
				clientId: currentUser?.userId,
				numberOfDays: numberOfDays
			};
			await Axios.post(`/rentals`, request);

			toast.info('Car rental created successfully. Wait for an employee to approve the request.');

			navigate(MyRentedVehicles);
			if (refresh) {
				await refresh();
			}
		} catch (e: any) {
			toast.error('Error occurred during car rent.');
			if (refresh) {
				await refresh();
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Modal className={`text-light`} show={modalVisible} onHide={() => setModalVisible(false)}>
				<Modal.Header className={`bg-dark`} closeButton>
					<Modal.Title>Vehicle renting form</Modal.Title>
				</Modal.Header>
				<Modal.Body className={`bg-dark d-flex flex-column gap-2 align-items-center justify-content-center`}>
					<Form.Label>Rent per day: {rentPerDay}$</Form.Label>
					<Form.Label>Number of days: {numberOfDays}</Form.Label>
					<Form.Range
						value={numberOfDays}
						onChange={(e) => setNumberOfDays(e.target.value as unknown as number)}
						min={1}
						max={30}
						step={1}
					/>
					<Form.Label>Total costs: {numberOfDays * rentPerDay}$</Form.Label>
				</Modal.Body>
				<Modal.Footer className={`bg-dark align-items-center justify-content-around`}>
					<Button disabled={isSubmitting} variant="outline-danger" onClick={() => setModalVisible(false)}>
						Close
					</Button>
					<SubmitButton variant="outline-success" onClick={handleSubmit} isSubmitting={isSubmitting}>
						Rent Car
					</SubmitButton>
				</Modal.Footer>
			</Modal>

			<Button onClick={() => setModalVisible(true)} variant={'outline-success'}>
				Rent Vehicle
			</Button>
		</>
	);
};

export default RentVehicleModal;
