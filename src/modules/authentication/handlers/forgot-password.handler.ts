import { CommandHandler } from "@nestjs/cqrs";
import { isEmpty } from "lodash";
import { BaseHandler } from "@core/command-bus/base.handler";
import { MailService } from "@core/mail/mail.service";
import { ForgotPasswordCommand } from "../commands/forgot-password.command";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler extends BaseHandler<ForgotPasswordCommand> {
	private readonly _verificationCodeLength: number = 5;

	constructor(
		private usersRepo: UsersRepository,
		private mailService: MailService,
	) {
		super(ForgotPasswordHandler.name);
	}

	async execute(command: ForgotPasswordCommand): Promise<any> {
		const email = command.email.trim().toLowerCase();

		const user = await this.usersRepo.findByEmail(email);

		if (isEmpty(user)) {
			// Return ok even if the user is not found.
			return {
				status: "OK",
				message: "Request processed successfully.",
			};
		}

		const verificationCode = this.createVerificationCode();

		if (user) {
			await this.usersRepo.update(user.id, {
				emailVerificationCode: verificationCode,
			});
		}

		this.mailService.send({
			recipients: [
				{
					name: user.firstName + " " + user.lastName,
					email: email,
				},
			],
			subject: "Request Password Reset",
			body: this.mailService.getEmailTemplate("forget-password", {
				firstName: user ? user.firstName : "BluMarket User",
				verificationCode,
			}),
		});

		return {
			status: "OK",
			message: "Email sent successfully",
		};
	}

	/**
	 * Generate random number
	 */
	private createVerificationCode(): string {
		const result = [];
		const characters = "0123456789";

		for (let i = 0; i < this._verificationCodeLength; i++) {
			result.push(
				characters.charAt(Math.floor(Math.random() * characters.length)),
			);
		}
		return result.join("");
	}
}
