import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { BaseCommand } from "@core/command-bus/base.command";

export class VerificationCodeCommand extends BaseCommand {
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
	verificationCode: string;
}
