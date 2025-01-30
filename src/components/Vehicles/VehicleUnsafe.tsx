import React, { FC } from 'react';
import { Card } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { Role } from '../../interfaces/enums/Role';
import { VehicleModel } from '../../interfaces/models/Api';
import EmployeeActions from '../Actions/EmployeeActions';
import RentVehicleModal from '../Modal/RentVehicleModal';

interface VehicleSafeProps {
	vehicle: VehicleModel;
	background?: string;
	refresh?: () => Promise<void>;
}

const VehicleUnsafe: FC<VehicleSafeProps> = ({ vehicle, background, refresh }) => {
	const { roles } = useCurrentUser();
	const { vehicleId, model, plate, rentPerDayPrice, state, yearOfProduction, color, employeeActions } = vehicle;

	return (
		<Card bg={background ?? 'dark'} text={'light'} className={`d-flex flex-row border-light border-1 height-300`}>
			<div className={`d-flex flex-row ${!roles.includes(Role.RoleClient) ? 'w-80' : 'w-100'}`}>
				<div className={`d-flex flex-column w-30 p-1`}>
					<div className={`w-100`}>Paint job</div>
					<div
						className={`mx-2 my-4 w-100 h-100 rounded-card-10 border-light border-1`}
						style={{ backgroundColor: `${color}` }}
					/>
				</div>

				<div className={`d-flex flex-column w-70`}>
					<Card.Body>
						<Card.Title className={`text-truncate`}>
							<span dangerouslySetInnerHTML={{ __html: `Model: ${model || 'Unknown'}` }}></span>
						</Card.Title>
						<Card.Text className={`text-truncate`}>
							<span dangerouslySetInnerHTML={{ __html: `Plate: ${plate || 'Unknown'}` }}></span>
						</Card.Text>
						<Card.Text className={`text-truncate`}>
							<span dangerouslySetInnerHTML={{ __html: `State: ${state || 'Unknown'}` }}></span>
						</Card.Text>
						<Card.Text className={`text-trunc-4`}>
							<span dangerouslySetInnerHTML={{ __html: `Year of production: ${yearOfProduction || 'Unknown'}` }}></span>
						</Card.Text>
						<Card.Text className={`text-trunc-4 ${!rentPerDayPrice && 'd-none'}`}>
							<span dangerouslySetInnerHTML={{ __html: `Rent per day: ${rentPerDayPrice || 'Unknown'}$` }}></span>
						</Card.Text>
						{state === 'READY_TO_RENT' && roles.includes(Role.RoleClient) && (
							<RentVehicleModal
								vehicleId={vehicleId}
								rentPerDay={rentPerDayPrice as unknown as number}
								refresh={refresh}
							/>
						)}
					</Card.Body>
				</div>
			</div>

			<div className={`d-flex flex-column ${!roles.includes(Role.RoleClient) ? 'w-20' : 'w-0'}`}>
				<EmployeeActions vehicle={vehicle} refresh={refresh} />
			</div>
		</Card>
	);
};

export default VehicleUnsafe;
