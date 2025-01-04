import { Role } from '../enums/Role';

export interface ErrorResponse {
	status: number;
	businessError?: string;
}

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

export interface UserPersonalData {
	userId: string;
	email: string;
	isActive: boolean;
	firstLoginDone: boolean;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	nationalId: string;
}

export interface EmployeeModel extends UserPersonalData {
	employeeId: string;
	isAdmin: boolean;
}

export interface ClientModel extends UserPersonalData {
	duePaymentsCount: number;
	rentedCarsCount: number;
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

export interface CommonUserData {
	username: string;
	password: string;
}

export interface PasswordData {
	password: string;
}

export interface FinishRegisterRequest {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	nationalId: string;
}

export interface FinishFirstLoginRequest extends PasswordData {
	employeeId: string;
}

export interface CreateEmployeeRequest extends FinishRegisterRequest, CommonUserData {}
