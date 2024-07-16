import { BaseHandler } from "@core/command-bus/base.handler";
import { GetProfileCommand } from "../commands/get-profile.command";
import { CommandHandler } from "@nestjs/cqrs";

@CommandHandler(GetProfileCommand)
export class GetProfileHandler extends BaseHandler<GetProfileCommand> {
	constructor() {
		super(GetProfileHandler.name);
	}

	async execute(command: GetProfileCommand): Promise<any> {
		return command.request.user;
	}
}
