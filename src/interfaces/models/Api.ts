import { Roles } from '../enums/Roles';

export interface UserModel {
	userId: string;
	username: string;
	roles: Roles[];
	enabled: boolean;
}

