import React, { FC, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { MakeVehicleReadyToRentRequest } from '../../../interfaces/models/Api';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { ModalBodyProps } from '../EmployeeActions';

const MakeVehicleAvailableToRentModalBody: FC<ModalBodyProps> = ({
	modalVisible,
	setModalVisible,
	employeeId,
	vehicle,
	refresh
}) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const request = useMemo<MakeVehicleReadyToRentRequest>(() => {
		return {
			employeeId,
			vehicleId: vehicle.vehicleId
		};
	}, [employeeId, vehicle]);

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			await Axios.put(`/employees/manage-vehicles/make-ready-to-rent`, request);

			setModalVisible(false);
			toast.info('Car has been made available to rent for customers.');
		} catch (e: any) {
			toast.error('Error occurred, try again later.');
		} finally {
			if (refresh) {
				await refresh();
			}
			setIsSubmitting(false);
		}
	};

	return (
		<Modal className={`text-light`} show={modalVisible} onHide={() => setModalVisible(false)}>
			<Modal.Header className={`bg-dark`} closeButton>
				<Modal.Title>Are you sure to make vehicle available to rent for customers</Modal.Title>
			</Modal.Header>

			<Modal.Footer className={`bg-dark align-items-center justify-content-around`}>
				<Button disabled={isSubmitting} variant="danger" onClick={() => setModalVisible(false)}>
					No
				</Button>
				<SubmitButton variant="success" onClick={handleSubmit} isSubmitting={isSubmitting}>
					Yes, make it.
				</SubmitButton>
			</Modal.Footer>
		</Modal>
	);
};

export default MakeVehicleAvailableToRentModalBody;
