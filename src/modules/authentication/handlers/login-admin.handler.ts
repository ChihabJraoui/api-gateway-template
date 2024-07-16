import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";
import { isEmpty } from "lodash";
import { BaseHandler } from "@core/command-bus/base.handler";
import { LoginAdminCommand } from "../commands/login-admin.command";
import { AuthenticationService } from "../authentication.service";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";
import { UserRolesEnum } from "@domain/enums/user-roles.enum";

@CommandHandler(LoginAdminCommand)
export class LoginAdminHandler extends BaseHandler<LoginAdminCommand> {
	constructor(
		private usersRepo: UsersRepository,
		private authService: AuthenticationService,
	) {
		super(LoginAdminHandler.name);
	}

	async execute(command: LoginAdminCommand): Promise<any> {
		const user = await this.usersRepo.findByEmail(command.email);

		if (isEmpty(user)) {
			throw new BadRequestException("Email or password are incorrect");
		}

		if (user.role !== UserRolesEnum.ADMIN) {
			throw new UnauthorizedException("Unauthorized access");
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

		user.accessToken = this.authService.createAccessToken(
			{ id: user.id },
			true,
		);
		delete user.password;

		return {
			status: 200,
			data: user,
		};
	}
}
