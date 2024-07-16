import { BaseCommand } from "@core/command-bus/base.command";

export class UpdateProfilePictureCommand extends BaseCommand {
	pictureFile: Express.Multer.File;
}
