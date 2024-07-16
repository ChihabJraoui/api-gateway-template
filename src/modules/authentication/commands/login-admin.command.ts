import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { BaseCommand } from "../../../_core/command-bus/base.command";

export class LoginAdminCommand extends BaseCommand {
	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	password: string;
}
