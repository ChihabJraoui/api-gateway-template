import { BadRequestException } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";
import { isEmpty } from "lodash";
import { BaseHandler } from "@core/command-bus/base.handler";
import { VerificationCodeCommand } from "../commands/verification-code.command";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";

@CommandHandler(VerificationCodeCommand)
export class VerificationCodeHandler extends BaseHandler<VerificationCodeCommand> {
	constructor(private usersRepo: UsersRepository) {
		super(VerificationCodeHandler.name);
	}

	async execute(command: VerificationCodeCommand): Promise<any> {
		const email = command.email.trim().toLowerCase();

		const user = await this.usersRepo.findByEmail(email);

		if (isEmpty(user)) {
			throw new BadRequestException("Oops, something went wrong..");
		}

		if (user.emailVerificationCode !== command.verificationCode) {
			throw new BadRequestException("Incorrect verification code.");
		}

		await this.usersRepo.update(user.id, {
			emailVerificationCode: null,
		});

		return {
			status: "OK",
			message: "Code verified successfully.",
			data: {},
		};
	}
}
