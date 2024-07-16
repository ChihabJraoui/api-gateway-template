import { BaseCommand } from "@core/command-bus/base.command";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditProfileCommand extends BaseCommand {
	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@ApiProperty({
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	lastName: string;

	@ApiProperty({
		type: String,
	})
	@IsString()
	@IsOptional()
	phoneNumber: string;

	@ApiProperty({
		type: String,
	})
	@IsString()
	@IsOptional()
	organization: string;
}
