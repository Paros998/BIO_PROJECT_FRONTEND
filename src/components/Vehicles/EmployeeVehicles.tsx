import React, { useMemo, useState } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';

import { useFetchData } from '../../hooks/useFetchData';
import { PageRequest, PageResponse, VehicleModel, VehicleState } from '../../interfaces/models/Api';

import VehicleForEmployee from './VehicleForEmployee';

const EmployeeVehicles = () => {
	const [page, setPage] = useState<number>(1);
	const [state, setState] = useState<VehicleState>('READY_TO_RENT');

	const params: PageRequest & { state: VehicleState } = useMemo(() => {
		return {
			state: state,
			page: page,
			pageLimit: 15,
			sortDir: 'desc'
		};
	}, [page, state]);

	const [response, reFetch, isPending] = useFetchData<PageResponse<VehicleModel>>(`/vehicles/search`, {
		params
	});

	if (isPending)
		return (
			<Row>
				<Col>
					<Spinner />
				</Col>
			</Row>
		);

	const vehicles = response?.content;

	if (vehicles?.length === 0) {
		return (
			<div className={`d-flex mh-100 w-50 justify-content-center align-items-center p-2 bg-dark rounded-card-10`}>
				<span className={'fw-bold fs-3 text-light text-center w-50'}>Vehicles not found. Try again later.</span>
			</div>
		);
	}

	return (
		<div className={` w-100 h-90 align-self-center d-flex flex-column pb-3`}>
			<div
				className={`w-100 mt-3 h-100 justify-content-start d-flex flex-column align-items-center overflow-y-scroll thumb-slim thumb-info mb-2`}
			>
				<div className={`d-flex flex-row align-items-center justify-content-center gap-2`}>
					<h3 className={'text-light text-center pt-1 bg-secondary-dark py-1 px-2 rounded-card-10'}>
						Available Vehicles
					</h3>
					<Form.Select onChange={(e) => setState(e.target.value as VehicleState)} value={state}>
						<option value={'READY_TO_RENT'}>READY_TO_RENT</option>
						<option value={'RENTED'}>RENTED</option>
						<option value={'JUST_RETURNED'}>JUST_RETURNED</option>
						<option value={'IN_REPAIR'}>IN_REPAIR</option>
						<option value={'NEW'}>NEW</option>
					</Form.Select>
				</div>

				<Row className={'row-gap-3 pb-4 w-100'}>
					{vehicles?.map((vehicle, k) => (
						<Col key={k} xs={24} sm={12} md={6} xxl={4}>
							<VehicleForEmployee vehicle={vehicle} reFetch={reFetch} />
						</Col>
					))}
				</Row>
			</div>

			<div className={`w-100 h-5 d-flex align-items-center justify-content-center `}>
				<Pagination
					count={response?.totalPages || 1}
					className={`bg-light rounded-card-10`}
					color={'primary'}
					page={page}
					onChange={(event, newPage) => setPage(newPage)}
				/>
			</div>
		</div>
	);
};

export default EmployeeVehicles;
