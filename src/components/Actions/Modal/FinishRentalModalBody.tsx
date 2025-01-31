import React, { FC, useMemo, useState } from 'react';
import { Button, Card, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { useFetchData } from '../../../hooks/useFetchData';
import { FinishVehicleRentalRequest, RentalModel } from '../../../interfaces/models/Api';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { ModalBodyProps } from '../EmployeeActions';

type FinishRentalModalBodyProps = ModalBodyProps & {
	sendToRepairs: boolean;
};

const FinishRentalModalBody: FC<FinishRentalModalBodyProps> = ({
	modalVisible,
	setModalVisible,
	employeeId,
	vehicle,
	refresh,
	sendToRepairs
}) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const [rental, , isPending] = useFetchData<RentalModel>(`/rentals/for-vehicle/${vehicle.vehicleId}`);

	const request = useMemo<FinishVehicleRentalRequest>(() => {
		return {
			employeeId,
			rentalId: rental?.rentalId
		};
	}, [employeeId, vehicle, rental]);

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			if (sendToRepairs) {
				await Axios.put(`/rentals/finish-rental/send-to-repairs`, request);
				toast.info('Vehicle rental has been finished and the vehicle has been sent to repairs.');
			} else {
				await Axios.put(`/rentals/finish-rental/make-ready-to-rent`, request);
				toast.info('Vehicle rental has been finished and the vehicle has been made available to rent again.');
			}

			setModalVisible(false);
		} catch (e: any) {
			toast.error('Error occurred, try again later.');
		} finally {
			if (refresh) {
				await refresh();
			}
			setIsSubmitting(false);
		}
	};

	if (isPending) {
		return (
			<Modal className={`text-light`} show={modalVisible} onHide={() => setModalVisible(false)}>
				<Modal.Header className={`bg-dark`} closeButton>
					<Modal.Title>Acquiring rental data</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Spinner />
				</Modal.Body>

				<Modal.Footer className={`bg-dark align-items-center justify-content-around`}>
					<Button disabled={isSubmitting} variant="danger" onClick={() => setModalVisible(false)}>
						No
					</Button>
					<SubmitButton variant="success" disabled={isPending} onClick={handleSubmit} isSubmitting={isSubmitting}>
						Yes, make it.
					</SubmitButton>
				</Modal.Footer>
			</Modal>
		);
	}

	if (!rental) {
		return (
			<Modal className={`text-light`} show={modalVisible} onHide={() => setModalVisible(false)}>
				<Modal.Header className={`bg-dark`} closeButton>
					<Modal.Title>Rental unavailable, refreshing data.</Modal.Title>
				</Modal.Header>
			</Modal>
		);
	}

	const { startDate, endDate, paymentsFeesPaid } = rental;

	return (
		<Modal className={`text-light`} show={modalVisible} onHide={() => setModalVisible(false)}>
			<Modal.Header className={`bg-dark`} closeButton>
				<Modal.Title>
					{sendToRepairs
						? 'Finish vehicle rental and send vehicle to repairs.'
						: 'Finish vehicle rental and make vehicle available to rent again.'}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Card.Body>
					<Card.Title className={`text-truncate`}>Rental data</Card.Title>
					<Card.Text className={`text-truncate`}>Start: {startDate || 'Unknown'}</Card.Text>
					<Card.Text className={`text-truncate`}>End: {endDate || 'Unknown'}</Card.Text>
					<Card.Text className={`text-trunc-4`}>Payment fees paid: {paymentsFeesPaid ? 'Yes' : 'No'}</Card.Text>
				</Card.Body>
			</Modal.Body>

			<Modal.Footer className={`bg-dark align-items-center justify-content-around`}>
				<Button disabled={isSubmitting} variant="danger" onClick={() => setModalVisible(false)}>
					No
				</Button>
				<SubmitButton variant="success" disabled={isPending} onClick={handleSubmit} isSubmitting={isSubmitting}>
					Yes, make it.
				</SubmitButton>
			</Modal.Footer>
		</Modal>
	);
};

export default FinishRentalModalBody;
