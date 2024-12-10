import { Role } from '../enums/Role';

export interface UserModel {
	userId: string;
	username: string;
	role: Role;
	enabled: boolean;
	firstLogin: boolean;
}
