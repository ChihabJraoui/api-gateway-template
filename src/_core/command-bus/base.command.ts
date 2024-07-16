import { ICommand } from "@nestjs/cqrs";
import { IUser } from "@domain/interfaces";

export abstract class BaseCommand implements ICommand {
	request: {
		user: IUser;
		[key: string]: any;
	};
}
