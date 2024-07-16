import { Logger } from "@nestjs/common";
import { ICommand, ICommandHandler } from "@nestjs/cqrs";

export abstract class BaseHandler<
	TCommand extends ICommand = any,
	TResult = any,
> implements ICommandHandler<TCommand, TResult>
{
	protected logger: Logger;

	protected constructor(context?: string) {
		this.logger = new Logger(context);
	}

	abstract execute(command: TCommand): Promise<TResult>;
}
