import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { VehicleAction, VehicleModel } from '../../interfaces/models/Api';

import FinishRentalModalBody from './Modal/FinishRentalModalBody';
import FinishRepairsModalBody from './Modal/FinishRepairsModalBody';
import InsureVehicleModalBody from './Modal/InsureVehicleModalBody';
import MakeVehicleAvailableToRentModalBody from './Modal/MakeVehicleAvailableToRentModalBody';
import SendVehicleToRepairsModalBody from './Modal/SendVehicleToRepairsModalBody';

export type ModalBodyProps = {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	refresh?: () => Promise<void>;
	employeeId: string;
	vehicle: VehicleModel;
};

type EmployeeActionsProps = {
	vehicle: VehicleModel;
	refresh?: () => Promise<void>;
};

const mapActionToLabel = (action: VehicleAction): string => {
	switch (action) {
		case 'INSURE':
			return 'Insure';
		case 'MAKE_READY_TO_RENT':
			return 'Make ready to rent';
		case 'SEND_TO_REPAIRS':
			return 'Send to repairs';
		case 'RETURN_AND_MAKE_READY_TO_RENT':
			return 'Return and make available to rent';
		case 'RETURN_AND_SEND_TO_REPAIRS':
			return 'Return and send to repairs';
	}
};

const EmployeeActions: FC<EmployeeActionsProps> = ({ refresh, vehicle }) => {
	const { employeeActions, state } = vehicle;
	const { currentUser, isPending } = useCurrentUser();
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [action, setAction] = useState<VehicleAction | null>(null);

	if (isPending || !currentUser) {
		return null;
	}

	const onAction = (action: VehicleAction) => {
		setModalVisible(true);
		setAction(action);
	};

	if (employeeActions.length === 0) {
		return null;
	}

	return (
		<div className={`d-flex w-100 h-100 justify-content-center align-items-start px-2 py-3`}>
			<Dropdown>
				<Dropdown.Toggle variant="outline-info" id="dropdown-basic">
					Actions
				</Dropdown.Toggle>

				<Dropdown.Menu variant={'dark'}>
					{employeeActions.map((action, index) => (
						<Dropdown.Item onClick={() => onAction(action)} key={index}>
							{mapActionToLabel(action)}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>

			{['MAKE_READY_TO_RENT'].includes(action as string) && state === 'IN_REPAIR' && modalVisible && (
				<FinishRepairsModalBody
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					refresh={refresh}
					employeeId={currentUser.userId}
					vehicle={vehicle}
				/>
			)}

			{['INSURE'].includes(action as string) && modalVisible && (
				<InsureVehicleModalBody
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					refresh={refresh}
					employeeId={currentUser.userId}
					vehicle={vehicle}
				/>
			)}

			{['SEND_TO_REPAIRS'].includes(action as string) && modalVisible && (
				<SendVehicleToRepairsModalBody
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					refresh={refresh}
					employeeId={currentUser.userId}
					vehicle={vehicle}
				/>
			)}

			{['MAKE_READY_TO_RENT'].includes(action as string) && state === 'INSURED' && modalVisible && (
				<MakeVehicleAvailableToRentModalBody
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					refresh={refresh}
					employeeId={currentUser.userId}
					vehicle={vehicle}
				/>
			)}

			{['RETURN_AND_SEND_TO_REPAIRS', 'RETURN_AND_MAKE_READY_TO_RENT'].includes(action as string) && modalVisible && (
				<FinishRentalModalBody
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					refresh={refresh}
					employeeId={currentUser.userId}
					vehicle={vehicle}
					sendToRepairs={action === 'RETURN_AND_SEND_TO_REPAIRS'}
				/>
			)}
		</div>
	);
};

export default EmployeeActions;
