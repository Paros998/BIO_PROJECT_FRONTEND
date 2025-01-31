import React, { FC, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { SendVehicleToRepairsRequest } from '../../../interfaces/models/Api';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { ModalBodyProps } from '../EmployeeActions';

const SendVehicleToRepairsModalBody: FC<ModalBodyProps> = ({
	modalVisible,
	setModalVisible,
	employeeId,
	vehicle,
	refresh
}) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const request = useMemo<SendVehicleToRepairsRequest>(() => {
		return {
			employeeId,
			vehicleId: vehicle.vehicleId
		};
	}, [employeeId, vehicle]);

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			await Axios.put(`/employees/manage-vehicles/send-to-repairs`, request);

			setModalVisible(false);
			toast.info('Car has been sent to repairs successfully.');
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
				<Modal.Title>Are you sure to send vehicle to repairs</Modal.Title>
			</Modal.Header>

			<Modal.Footer className={`bg-dark align-items-center justify-content-around`}>
				<Button disabled={isSubmitting} variant="danger" onClick={() => setModalVisible(false)}>
					No
				</Button>
				<SubmitButton variant="success" onClick={handleSubmit} isSubmitting={isSubmitting}>
					Yes, send it.
				</SubmitButton>
			</Modal.Footer>
		</Modal>
	);
};

export default SendVehicleToRepairsModalBody;
