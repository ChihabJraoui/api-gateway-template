import { BaseHandler } from "@core/command-bus/base.handler";
import { EditProfileCommand } from "../commands/edit-profile.command";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";
import { CommandHandler } from "@nestjs/cqrs";

@CommandHandler(EditProfileCommand)
export class EditProfileHandler extends BaseHandler<EditProfileCommand> {
	constructor(private readonly usersRepo: UsersRepository) {
		super(EditProfileHandler.name);
	}

	async execute(command: EditProfileCommand): Promise<any> {
		const user = command.request.user;
		const id = user["id"];

		return this.usersRepo.update(id, {
			firstName: command.firstName,
			lastName: command.lastName,
			organization: command.organization,
			phoneNumber: command.phoneNumber,
		});
	}
}
