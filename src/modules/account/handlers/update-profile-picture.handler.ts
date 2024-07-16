import { BaseHandler } from "@core/command-bus/base.handler";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";
import { CommandHandler } from "@nestjs/cqrs";
import { StorageService } from "@core/storage/storage.service";
import { UpdateProfilePictureCommand } from "../commands/update-profile-picture.command";
import { ResponseModel } from "@core/response";

@CommandHandler(UpdateProfilePictureCommand)
export class UpdateProfilePictureHandler extends BaseHandler<UpdateProfilePictureCommand> {
	constructor(
		private readonly usersRepo: UsersRepository,
		private storageService: StorageService,
	) {
		super(UpdateProfilePictureHandler.name);
	}

	async execute(command: UpdateProfilePictureCommand): Promise<any> {
		const user = command.request.user;

		const { url } = await this.storageService.uploadFile(command.pictureFile);

		const updatedUser = await this.usersRepo.update(user.id, {
			picture: url,
		});

		return new ResponseModel({
			data: {
				url,
			},
		});
	}
}
