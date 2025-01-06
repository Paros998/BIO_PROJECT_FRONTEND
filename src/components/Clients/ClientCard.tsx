import React, { FC, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { CheckCircle, DashCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';

import { ClientModel } from '../../interfaces/models/Api';
import { ClientPendingPaymentsRoute, ClientRentedCarsRoute } from '../../routes/Routes';

export type ClientCardProps = {
	client: ClientModel;
	fetchClients: () => Promise<void>;
	hideRentsCount?: boolean;
	hidePaymentsCount?: boolean;
	background?: string;
};

const ClientCard: FC<ClientCardProps> = ({ client, fetchClients, hideRentsCount, hidePaymentsCount, background }) => {
	const [showId, setShowId] = useState<boolean>(false);
	const navigate = useNavigate();

	const {
		userId,
		lastName,
		firstName,
		firstLoginDone,
		nationalId,
		phoneNumber,
		email,
		isActive,
		rentedCarsCount,
		duePaymentsCount
	} = client;

	const handleActivate = async () => {
		try {
			await Axios.post(`/clients/${userId}/activate?setActive=${!isActive}`);

			toast.success('Operation completed successfully');

			await fetchClients();
		} catch (e: any) {
			toast.error(e?.message);
		}
	};

	return (
		<Card
			bg={background ?? 'dark'}
			text={'light'}
			className={`border-light border-1 ${hideRentsCount || hidePaymentsCount ? 'height-300' : 'height-400'}`}
		>
			<Card.Body className={`d-flex flex-column gap-2`}>
				<Card.Title className={`text-truncate`}>Client: {firstName + ' ' + lastName || 'Unknown'}</Card.Title>
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
					<Button variant={isActive ? 'danger' : 'success'} onClick={() => handleActivate()}>
						{isActive ? 'Disable' : 'Activate'}
					</Button>
				</div>

				<Card.Text className={`text-truncate d-flex align-items-center gap-2`}>
					First login done:
					<div className={`d-flex align-items-center gap-2 ${firstLoginDone ? 'text-success' : 'text-danger'}`}>
						{firstLoginDone ? 'Yes' : 'No'}
						{firstLoginDone ? <CheckCircle /> : <DashCircle />}
					</div>
				</Card.Text>

				<div className={`d-flex justify-content-between align-items-center ${hideRentsCount && 'd-none'}`}>
					<Card.Text className={`text-truncate d-flex align-items-center gap-2`}>
						Currently renting cars:
						<div className={`d-flex align-items-center gap-2`}>{rentedCarsCount === 0 ? 'None' : rentedCarsCount}</div>
					</Card.Text>
					{rentedCarsCount > 0 && (
						<Button variant={'info'} onClick={() => navigate(ClientRentedCarsRoute + `/${userId}`)}>
							See rented cars
						</Button>
					)}
				</div>

				<div className={`d-flex justify-content-between align-items-center ${hidePaymentsCount && 'd-none'}`}>
					<Card.Text className={`text-truncate d-flex align-items-center gap-2`}>
						Client due payments:
						<div className={`d-flex align-items-center gap-2`}>
							{duePaymentsCount === 0 ? 'None' : duePaymentsCount}
						</div>
					</Card.Text>
					{duePaymentsCount > 0 && (
						<Button variant={'info'} onClick={() => navigate(ClientPendingPaymentsRoute + `/${userId}`)}>
							See client due payments
						</Button>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

export default ClientCard;
