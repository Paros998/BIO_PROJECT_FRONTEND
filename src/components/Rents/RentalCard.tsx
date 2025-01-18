import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { Role } from '../../interfaces/enums/Role';
import { RentedVehicle } from '../../interfaces/models/Api';
import { ClientPendingPaymentsRoute, MyPaymentsForRents } from '../../routes/Routes';
import VehicleSafe from '../Vehicles/VehicleSafe';
import VehicleUnsafe from '../Vehicles/VehicleUnsafe';

type RentalCardProps = {
	rented: RentedVehicle;
};

const RentalCard: FC<RentalCardProps> = ({ rented }) => {
	const navigate = useNavigate();
	const { roles } = useCurrentUser();
	const { vehicle, rental } = rented;
	const { startDate, endDate, paymentsFeesPaid, clientId } = rental;
	return (
		<div className={`w-100 d-flex flex-row gap-1 align-items-start`}>
			<div className={`w-50`}>
				{process.env.REACT_APP_APP_SECURE === 'true' ? (
					<VehicleSafe background={`secondary-dark`} vehicle={vehicle} />
				) : (
					<VehicleUnsafe background={`secondary-dark`} vehicle={vehicle} />
				)}
			</div>
			<div className={`w-50`}>
				<Card bg={'secondary-dark'} text={'light'} className={`d-flex flex-row border-light border-1 height-220`}>
					<Card.Body>
						<Card.Title className={`text-truncate`}>Rental data</Card.Title>
						<Card.Text className={`text-truncate`}>Start: {startDate || 'Unknown'}</Card.Text>
						<Card.Text className={`text-truncate`}>End: {endDate || 'Unknown'}</Card.Text>
						<Card.Text className={`text-trunc-4`}>Payment fees paid: {paymentsFeesPaid ? 'Yes' : 'No'}</Card.Text>
						{roles.includes(Role.RoleClient) && !paymentsFeesPaid && (
							<Button variant={'outline-warning'} onClick={() => navigate(MyPaymentsForRents)}>
								Check Payments
							</Button>
						)}
						{!roles.includes(Role.RoleClient) && !paymentsFeesPaid && (
							<Button variant={'outline-warning'} onClick={() => navigate(ClientPendingPaymentsRoute + `/${clientId}`)}>
								Check Client Payments
							</Button>
						)}
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default RentalCard;
