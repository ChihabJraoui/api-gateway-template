import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { isEmpty } from "lodash";
import { BaseHandler } from "@core/command-bus/base.handler";
import { SignUpCommand } from "../commands/sign-up.command";
import { UserRolesEnum } from "@domain/enums/user-roles.enum";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";

@CommandHandler(SignUpCommand)
export class SignUpHandler extends BaseHandler<SignUpCommand> {
	private readonly _accessTokenExpiresIn;
	private readonly _saltOrRounds = 10;

	constructor(
		private usersRepo: UsersRepository,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {
		super(SignUpCommand.name);
	}

	async execute(command: SignUpCommand): Promise<any> {
		const email = command.email.trim().toLowerCase();

		let user = await this.usersRepo.findByEmail(email);

		if (!isEmpty(user)) {
			throw new BadRequestException("Email already used");
		}

		// hash password
		const hashedPassword = await bcrypt.hash(
			command.password,
			this._saltOrRounds,
		);

		user = await this.usersRepo.create({
			email: command.email,
			password: hashedPassword,
			firstName: command.firstName,
			lastName: command.lastName,
			role: command.role ? command.role : UserRolesEnum.USER,
		});

		user.accessToken = this.createAccessToken({ id: user.id }, true);
		delete user.password;

		return {
			status: "OK",
			message: "User created successfully",
			data: user,
		};
	}

	/**
	 *
	 * @param payload
	 * @param doNotExpire
	 * @private
	 */
	createAccessToken(payload: any, doNotExpire?: boolean): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
			expiresIn: doNotExpire === true ? "1y" : this._accessTokenExpiresIn,
		});
	}
}
