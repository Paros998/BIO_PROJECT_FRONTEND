import React, { FC, useMemo, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { InsureVehicleRequest } from '../../../interfaces/models/Api';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { ModalBodyProps } from '../EmployeeActions';

const InsureVehicleModalBody: FC<ModalBodyProps> = ({
	modalVisible,
	setModalVisible,
	employeeId,
	vehicle,
	refresh
}) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [insuranceId, setInsuranceId] = useState<string | null>(null);
	const [bankAccountNumber, setBankAccountNumber] = useState<string | null>(null);
	const [dueDate, setDueDate] = useState<Date | null>(new Date());
	const [insuranceCost, setInsuranceCost] = useState<number | null>(null);

	const request = useMemo<InsureVehicleRequest>(() => {
		return {
			employeeId,
			vehicleId: vehicle.vehicleId,
			insuranceId: insuranceId ?? '',
			bankAccountNumber: bankAccountNumber ?? '',
			dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '',
			insuranceCost: (insuranceCost as unknown as string) ?? '0'
		};
	}, [employeeId, vehicle, insuranceId, bankAccountNumber, dueDate, insuranceCost]);

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			await Axios.put(`/employees/manage-vehicles/insure-vehicle`, request);

			setModalVisible(false);
			toast.info('Car insuring finished successfully.');
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
				<Modal.Title>Insure vehicle</Modal.Title>
			</Modal.Header>

			<Modal.Body className={`bg-dark d-flex flex-column gap-2 align-items-center justify-content-center`}>
				<InputGroup>
					<Form.Control
						placeholder={'Bank account number'}
						type={'string'}
						value={bankAccountNumber ?? ''}
						onChange={(e) => setBankAccountNumber(e.target.value as unknown as string)}
					/>
				</InputGroup>

				<InputGroup>
					<Form.Control
						placeholder={'Insurance identification'}
						type={'string'}
						value={insuranceId ?? ''}
						onChange={(e) => setInsuranceId(e.target.value as unknown as string)}
					/>
				</InputGroup>

				<InputGroup>
					<InputGroup.Text>$</InputGroup.Text>
					<Form.Control
						placeholder={'Insurance cost'}
						type={'number'}
						value={insuranceCost ?? ''}
						onChange={(e) => setInsuranceCost(e.target.value as unknown as number)}
					/>
					<InputGroup.Text>.00</InputGroup.Text>
				</InputGroup>

				<InputGroup className={`d-flex justify-content-start align-items-center gap-2`}>
					<InputGroup.Text>Insured due date</InputGroup.Text>
					<DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
				</InputGroup>
			</Modal.Body>

			<Modal.Footer className={`bg-dark align-items-center justify-content-around`}>
				<Button disabled={isSubmitting} variant="danger" onClick={() => setModalVisible(false)}>
					Close
				</Button>
				<SubmitButton variant="success" onClick={handleSubmit} isSubmitting={isSubmitting}>
					Insure vehicle
				</SubmitButton>
			</Modal.Footer>
		</Modal>
	);
};

export default InsureVehicleModalBody;
