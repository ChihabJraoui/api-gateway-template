import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseCommand } from "@core/command-bus/base.command";

export class ForgotPasswordCommand extends BaseCommand {
	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
