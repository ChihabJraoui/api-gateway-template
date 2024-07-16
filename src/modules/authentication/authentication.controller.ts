import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { LoginCommand } from "./commands/login.command";
import { SignUpCommand } from "./commands/sign-up.command";

@Controller("auth")
@ApiTags("Authentication")
export class AuthenticationController {
	constructor(private commandBus: CommandBus) {}

	/**
	 * Login endpoint
	 *
	 * @param command
	 */
	@Post("login")
	login(@Body() command: LoginCommand) {
		return this.commandBus.execute(command);
	}

	/**
	 * Login endpoint
	 *
	 * @param command
	 */
	@Post("sign-up")
	signUp(@Body() command: SignUpCommand) {
		return this.commandBus.execute(command);
	}
}
