import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { useFetchData } from '../../hooks/useFetchData';
import { PageRequest, PageResponse, VehicleModel, VehicleState } from '../../interfaces/models/Api';

import VehicleSafe from './VehicleSafe';
import VehicleUnsafe from './VehicleUnsafe';

const Vehicles = () => {
	const { roles } = useCurrentUser();
	const [page, setPage] = useState<number>(1);
	const [state, setState] = useState<VehicleState>('READY_TO_RENT');
	const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
	const [rentedVehicles, setRentedVehicles] = useState<VehicleModel[]>([]);

	const params: PageRequest & { state: VehicleState } = useMemo(() => {
		return {
			state: state,
			page: page,
			pageLimit: 15,
			sortDir: 'desc'
		};
	}, [page, state]);

	const [response, , isPending] = useFetchData<PageResponse<VehicleModel>>(`/vehicles/search`, { params });

	useEffect(() => {
		if (response?.content) {
			setVehicles(response.content);
		}
	}, [response]);

	const handleRent = async (vehicleId: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			await axios.post(
				`/api/rent/${vehicleId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			const rentedVehicle = vehicles.find((v) => v.vehicleId === vehicleId);
			if (rentedVehicle) {
				setRentedVehicles((prev) => [...prev, rentedVehicle]);
				setVehicles((prev) => prev.filter((v) => v.vehicleId !== vehicleId));
			}
		} catch (error) {
			console.error(error);
		}
	};

	enum UserRole {
		CLIENT = 'CLIENT',
		EMPLOYEE = 'EMPLOYEE',
		ADMIN = 'ADMIN'
	}

	if (isPending)
		return (
			<Row>
				<Col>
					<Spinner />
				</Col>
			</Row>
		);

	return (
		<div className="w-100 h-90 align-self-center d-flex flex-column pb-3">
			<div className="w-100 mt-3 h-100 justify-content-start d-flex flex-column align-items-center overflow-y-scroll thumb-slim thumb-info mb-2">
				<h3 className="text-light text-center pt-1 bg-secondary-dark py-1 px-2 rounded-card-10">Dostępne Pojazdy</h3>
				<Row className="row-gap-3 pb-4 w-100">
					{vehicles.map((vehicle, k) => (
						<Col key={k} xs={24} sm={12} md={6} xxl={4}>
							<div>
								{process.env.REACT_APP_APP_SECURE === 'true' ? (
									<VehicleSafe vehicle={vehicle} />
								) : (
									<VehicleUnsafe vehicle={vehicle} />
								)}
								{roles.includes(UserRole.CLIENT) && (
									<button className="btn btn-primary mt-2" onClick={() => handleRent(vehicle.vehicleId)}>
										Wynajmij
									</button>
								)}
							</div>
						</Col>
					))}
				</Row>
			</div>
			<div className="w-100 h-5 d-flex align-items-center justify-content-center">
				<Pagination
					count={response?.totalPages || 1}
					className="bg-light rounded-card-10"
					color="primary"
					page={page}
					onChange={(event, newPage) => setPage(newPage)}
				/>
			</div>
		</div>
	);
};

export default Vehicles;
