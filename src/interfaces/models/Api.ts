import { Role } from '../enums/Role';

export interface UserModel {
	userId: string;
	username: string;
	role: Role;
	enabled: boolean;
	firstLogin: boolean;
}

export interface VehicleModel {
	vehicleId: string;
	model: string;
	plate: string;
	color: string;
	yearOfProduction: number;
	state: VehicleState;
	rentPerDayPrice: string;
}

export interface PageResponse<T> {
	currentPage: number;
	totalPages: number;
	content: T[];
}

export interface PageRequest {
	page: number;
	pageLimit: number;
	sortDir?: 'asc' | 'desc';
	sortBy?: string;
}

export type VehicleState = 'RENTED' | 'JUST_RETURNED' | 'READY_TO_RENT' | 'IN_REPAIR' | 'NOT_INSURED' | 'NEW';
