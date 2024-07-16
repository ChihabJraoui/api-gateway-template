import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";
import { BaseCommand } from "@core/command-bus/base.command";
import { UserRolesEnum } from "@domain/enums/user-roles.enum";

export class SignUpCommand extends BaseCommand {
	/**
	 * Email address
	 */
	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	/**
	 * Password
	 */
	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	password: string;

	/**
	 * First name
	 */
	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	firstName: string;

	/**
	 * Last name
	 */
	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	lastName: string;

	/**
	 * Picture
	 */
	@ApiPropertyOptional({
		type: String,
	})
	@IsOptional()
	@IsString()
	image: string;

	@ApiPropertyOptional({
		type: String,
	})
	@IsOptional()
	@IsString()
	organization: string;

	@ApiPropertyOptional({
		type: String,
	})
	@IsOptional()
	@IsEnum(UserRolesEnum)
	role: UserRolesEnum;

	@ApiPropertyOptional({
		type: String,
	})
	@IsOptional()
	@IsString()
	mobile: string;
}
