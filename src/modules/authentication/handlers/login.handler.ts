import { BadRequestException } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";
import { isEmpty } from "lodash";
import { BaseHandler } from "@core/command-bus/base.handler";
import { LoginCommand } from "../commands/login.command";
import { AuthenticationService } from "../authentication.service";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";
import { User } from "@domain/models";
import { ResponseModel } from "@core/response";

@CommandHandler(LoginCommand)
export class LoginHandler extends BaseHandler<LoginCommand> {
	constructor(
		private usersRepo: UsersRepository,
		private authService: AuthenticationService,
	) {
		super(LoginHandler.name);
	}

	async execute(command: LoginCommand): Promise<any> {
		const user = await this.usersRepo.findByEmail(command.email);

		if (isEmpty(user)) {
			throw new BadRequestException("Email or password are incorrect");
		}

		if (!user.password) {
			throw new BadRequestException("Email or password are incorrect");
		}

		const passwordMatch = await this.authService.comparePassword(
			command.password,
			user.password,
		);

		if (!passwordMatch) {
			throw new BadRequestException("Email or password are incorrect");
		}

		// generate access token
		/*
		 * TODO: figure out why assigning accessToken directly
		 *  to the user object doesn't work.
		 */
		const accessToken = this.authService.createAccessToken(
			{ id: user.id },
			true,
		);

		return new ResponseModel({
			message: "Log in successful.",
			data: {
				...user.toObject<User>(),
				accessToken,
			},
		});
	}
}
