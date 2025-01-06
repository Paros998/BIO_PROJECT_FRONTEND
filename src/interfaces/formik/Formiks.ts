import { CommonUserData, CreateEmployeeRequest, FinishRegisterRequest, PasswordData } from '../models/Api';

export type FinishRegisterFormikValues = FinishRegisterRequest;

export type FinishFirstLoginFormikValues = PasswordData;

export type LoginFormikValues = CommonUserData;

export type RegisterFormikValues = CommonUserData;

export type CreateEmployeeFormikValues = CreateEmployeeRequest;
