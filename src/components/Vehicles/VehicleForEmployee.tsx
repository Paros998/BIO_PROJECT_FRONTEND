import React, { FC } from 'react';
import { Card } from 'react-bootstrap';

import { VehicleModel } from '../../interfaces/models/Api';
import EmployeeActions from '../Actions/EmployeeActions';

interface VehicleForEmployeeProps {
	vehicle: VehicleModel;
	background?: string;
	reFetch: () => Promise<void>;
}

const VehicleForEmployee: FC<VehicleForEmployeeProps> = ({ vehicle, background, reFetch }) => {
	const { model, plate, rentPerDayPrice, state, yearOfProduction, color } = vehicle;

	return (
		<Card bg={background ?? 'dark'} text={'light'} className={`d-flex flex-row border-light border-1 height-300`}>
			<div className={`d-flex flex-row w-80`}>
				<div className={`d-flex flex-column w-30 p-1`}>
					<div className={`w-100`}>Paint job</div>
					<div
						className={`mx-2 my-4 w-100 h-100 rounded-card-10 border-light border-1`}
						style={{ backgroundColor: `${color}` }}
					/>
				</div>

				<div className={`d-flex flex-column w-70`}>
					<Card.Body>
						<Card.Title className={`text-truncate`}>Model: {model || 'Unknown'}</Card.Title>
						<Card.Text className={`text-truncate`}>Plate: {plate || 'Unknown'}</Card.Text>
						<Card.Text className={`text-truncate`}>State: {state || 'Unknown'}</Card.Text>
						<Card.Text className={`text-trunc-4`}>Year of production: {yearOfProduction || 'Unknown'}</Card.Text>
						<Card.Text className={`text-trunc-4 ${!rentPerDayPrice && 'd-none'}`}>
							Rent per day: {rentPerDayPrice || 'Unknown'}$
						</Card.Text>
					</Card.Body>
				</div>
			</div>

			<div className={`d-flex flex-column w-20`}>
				<EmployeeActions vehicle={vehicle} refresh={reFetch} />
			</div>
		</Card>
	);
};

export default VehicleForEmployee;
