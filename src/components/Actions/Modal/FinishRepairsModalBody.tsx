import React, { FC, useMemo, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { FinishRepairsRequest } from '../../../interfaces/models/Api';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { ModalBodyProps } from '../EmployeeActions';

const FinishRepairsModalBody: FC<ModalBodyProps> = ({
	modalVisible,
	setModalVisible,
	employeeId,
	vehicle,
	refresh
}) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [chargeCustomer, setChargeCustomer] = useState<boolean>(false);
	const [bankAccountNumber, setBankAccountNumber] = useState<string | null>(null);
	const [dueDate, setDueDate] = useState<Date | null>(new Date());
	const [totalCost, setTotalCost] = useState<number | null>(null);

	const request = useMemo<FinishRepairsRequest>(() => {
		return {
			employeeId,
			vehicleId: vehicle.vehicleId,
			chargeCustomer,
			bankAccountNumber: bankAccountNumber ?? '',
			dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '',
			totalCost: (totalCost as unknown as string) ?? '0'
		};
	}, [employeeId, vehicle, chargeCustomer, bankAccountNumber, dueDate, totalCost]);

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			await Axios.put(`/employees/manage-vehicles/finish-repairs`, request);

			setModalVisible(false);
			toast.info('Car repairs finished successfully.');
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
				<Modal.Title>Finish vehicle repairs</Modal.Title>
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
					<InputGroup.Text>$</InputGroup.Text>
					<Form.Control
						placeholder={'Total cost'}
						type={'number'}
						value={totalCost ?? ''}
						onChange={(e) => setTotalCost(e.target.value as unknown as number)}
					/>
					<InputGroup.Text>.00</InputGroup.Text>
				</InputGroup>

				<InputGroup className={`d-flex justify-content-start align-items-center gap-2`}>
					<InputGroup.Text>Due date</InputGroup.Text>
					<DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
				</InputGroup>

				{/*TODO fixme*/}
				<Form.Check
					checked={chargeCustomer}
					onChange={(e) => {
						setChargeCustomer(e.target.value === 'on');
					}}
					type="switch"
					label="Charge customer"
				/>
			</Modal.Body>

			<Modal.Footer className={`bg-dark align-items-center justify-content-around`}>
				<Button disabled={isSubmitting} variant="danger" onClick={() => setModalVisible(false)}>
					Close
				</Button>
				<SubmitButton variant="success" onClick={handleSubmit} isSubmitting={isSubmitting}>
					Finish repairs
				</SubmitButton>
			</Modal.Footer>
		</Modal>
	);
};

export default FinishRepairsModalBody;
