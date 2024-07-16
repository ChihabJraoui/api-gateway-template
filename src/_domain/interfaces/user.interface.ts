import { IBase } from "@domain/interfaces/base.interface";

export interface IUser extends IBase {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	mobile?: string;
	profilePicture?: string;
	emailVerificationCode?: string;
	accessToken?: string;
	createdAt?: number;
	updatedAt?: number;
}
