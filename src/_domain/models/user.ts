import { UserRolesEnum } from "@domain/enums/user-roles.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "@domain/models/base.model";
import SchemaConfig from "@database/mongo-db/schema.config";

@Schema(SchemaConfig(User))
export class User extends BaseModel {
	@ApiProperty({
		type: String,
	})
	@Prop()
	firstName: string;

	@ApiProperty({
		type: String,
	})
	@Prop()
	lastName: string;

	@ApiProperty({
		type: String,
	})
	@Prop()
	phoneNumber: string;

	@ApiProperty({
		type: String,
	})
	@Prop()
	organization: string;

	@ApiProperty({
		type: String,
	})
	@Prop({
		lowercase: true,
		unique: true,
	})
	email: string;

	@Exclude()
	@Prop({
		type: String,
		select: false,
	})
	password: string;

	@ApiProperty({
		enum: UserRolesEnum,
	})
	@Prop()
	role: UserRolesEnum;

	@ApiProperty({
		type: String,
	})
	accessToken?: string;

	@ApiProperty({
		type: String,
	})
	emailVerificationCode?: string;

	@ApiProperty({
		type: String,
	})
	@Prop({
		type: String,
	})
	picture?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
