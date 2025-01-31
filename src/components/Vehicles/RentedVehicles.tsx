import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { useFetchData } from '../../hooks/useFetchData';
import { Role } from '../../interfaces/enums/Role';
import { ClientRentedVehicles } from '../../interfaces/models/Api';
import ClientCard from '../Clients/ClientCard';
import RentalCard from '../Rents/RentalCard';

type RentedVehiclesProps = {
	clientId: string;
};

const RentedVehicles: FC<RentedVehiclesProps> = ({ clientId }) => {
	const { roles } = useCurrentUser();

	const [response, fetchClientData, isPending] = useFetchData<ClientRentedVehicles>(
		`/clients/${clientId}/rented-vehicles`
	);

	if (isPending) {
		return <Spinner />;
	}

	if (!response) return null;

	if (roles.includes(Role.RoleClient)) {
		return (
			<div
				className={`w-100 h-100 d-flex flex-column p-1 gap-3 shadow-lg overflow-scroll overflow-x-hidden thumb-danger justify-content-start align-items-center`}
			>
				{response.vehicles.map((vehicle, key) => (
					<RentalCard key={key} rented={vehicle} />
				))}
			</div>
		);
	}

	return (
		<div className={`w-100 h-100 d-flex p-1 gap-5 justify-content-center align-items-start overflow-hidden shadow-lg`}>
			<div className={`w-25`}>
				<ClientCard
					background={`salmon`}
					client={response.client}
					fetchClients={fetchClientData}
					hidePaymentsCount
					hideRentsCount
				/>
			</div>

			<div className={`w-75 h-100 d-flex flex-column gap-3 overflow-scroll overflow-x-hidden thumb-danger`}>
				{response.vehicles.map((vehicle, key) => (
					<RentalCard key={key} rented={vehicle} />
				))}
			</div>
		</div>
	);
};

export default RentedVehicles;
