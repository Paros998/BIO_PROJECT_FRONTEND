import React, { FC } from 'react';
import { Card } from 'react-bootstrap';

import { RentedVehicle } from '../../interfaces/models/Api';
import VehicleSafe from '../Vehicles/VehicleSafe';
import VehicleUnsafe from '../Vehicles/VehicleUnsafe';

type RentalCardProps = {
	rented: RentedVehicle;
};

const RentalCard: FC<RentalCardProps> = ({ rented }) => {
	const { vehicle, rental } = rented;
	const { startDate, endDate, paymentsFeesPaid } = rental;
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
				<Card bg={'secondary-dark'} text={'light'} className={`d-flex flex-row border-light border-1 height-180`}>
					<Card.Body>
						<Card.Title className={`text-truncate`}>Rental data</Card.Title>
						<Card.Text className={`text-truncate`}>Start: {startDate || 'Unknown'}</Card.Text>
						<Card.Text className={`text-truncate`}>End: {endDate || 'Unknown'}</Card.Text>
						<Card.Text className={`text-trunc-4`}>Payment fees paid: {paymentsFeesPaid ? 'Yes' : 'No'}</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default RentalCard;
