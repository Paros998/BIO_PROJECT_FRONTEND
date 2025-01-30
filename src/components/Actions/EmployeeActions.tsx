import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import { useCurrentUser } from '../../contexts/UserContext/UserContext';
import { VehicleAction, VehicleModel } from '../../interfaces/models/Api';

import FinishRepairsModalBody from './Modal/FinishRepairsModalBody';
import InsureVehicleModalBody from './Modal/InsureVehicleModalBody';

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

const EmployeeActions: FC<EmployeeActionsProps> = ({ refresh, vehicle }) => {
	const { employeeActions } = vehicle;
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
							{action}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>

			{['MAKE_READY_TO_RENT'].includes(action as string) && modalVisible && (
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
		</div>
	);
};

export default EmployeeActions;
