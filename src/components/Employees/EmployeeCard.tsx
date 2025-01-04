import React, { FC, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { CheckCircle, DashCircle } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { EmployeeModel } from '../../interfaces/models/Api';

type EmployeeCardProps = {
	employee: EmployeeModel;
	fetchEmployees: () => Promise<void>;
};

const EmployeeCard: FC<EmployeeCardProps> = ({ employee, fetchEmployees }) => {
	const [showId, setShowId] = useState<boolean>(false);

	const { userId, firstName, lastName, email, nationalId, phoneNumber, isActive, firstLoginDone, isAdmin } = employee;

	const handleActivate = async () => {
		try {
			await Axios.post(`/employees/${userId}/activate?setActive=${!isActive}`);

			toast.success('Operation completed successfully');

			await fetchEmployees();
		} catch (e: any) {
			toast.error(e?.message);
		}
	};

	return (
		<Card bg={'dark'} text={'light'} className={`border-light border-1 height-300`}>
			<Card.Body className={`d-flex flex-column gap-2`}>
				<Card.Title className={`text-truncate`}>
					{isAdmin ? 'Admin' : 'Employee'}: {firstName + ' ' + lastName || 'Unknown'}
				</Card.Title>
				<Card.Text className={`text-truncate`}>Email: {email || 'Unknown'}</Card.Text>
				<Card.Text className={`text-truncate`}>Phone: {phoneNumber || 'Unknown'}</Card.Text>

				<div className={`d-flex justify-content-between align-items-center`}>
					<Card.Text className={`text-truncate`}>
						NationalId: {(showId ? nationalId : '***********') || 'Unknown'}
					</Card.Text>
					<Button variant={'light'} onClick={() => setShowId(!showId)}>
						Toggle id showing
					</Button>
				</div>

				<div className={`d-flex justify-content-between align-items-center`}>
					<Card.Text className={`text-truncate d-flex align-items-center gap-2`}>
						Account active:
						<div className={`d-flex align-items-center gap-2 ${isActive ? 'text-success' : 'text-danger'}`}>
							{isActive ? 'Yes' : 'No'}
							{isActive ? <CheckCircle /> : <DashCircle />}
						</div>
					</Card.Text>
					{!isAdmin && (
						<Button variant={isActive ? 'danger' : 'success'} onClick={() => handleActivate()}>
							{isActive ? 'Disable' : 'Activate'}
						</Button>
					)}
				</div>

				<Card.Text className={`text-truncate d-flex align-items-center gap-2`}>
					First login done:
					<div className={`d-flex align-items-center gap-2 ${firstLoginDone ? 'text-success' : 'text-danger'}`}>
						{firstLoginDone ? 'Yes' : 'No'}
						{firstLoginDone ? <CheckCircle /> : <DashCircle />}
					</div>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default EmployeeCard;
