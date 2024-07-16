import {
	Body,
	Controller,
	Get,
	Patch,
	Put,
	Query,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { EditProfileCommand } from "./commands/edit-profile.command";
import { GetProfileCommand } from "./commands/get-profile.command";
import { JwtGuard } from "@core/guards";
import { UpdateProfilePictureCommand } from "./commands/update-profile-picture.command";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("account")
@ApiTags("Account")
@UseGuards(JwtGuard)
export class AccountController {
	constructor(private readonly commandBus: CommandBus) {}

	@Get("profile")
	getProfile(@Req() req: any, @Query() command: GetProfileCommand) {
		command.request = req;
		return this.commandBus.execute(command);
	}

	@Put("profile")
	editProfile(@Req() req: any, @Body() command: EditProfileCommand) {
		command.request = req;
		return this.commandBus.execute(command);
	}

	@Patch("profile/picture")
	@UseInterceptors(FileInterceptor("file"))
	updateProfilePicture(@Req() req, @UploadedFile() file: Express.Multer.File) {
		const command = new UpdateProfilePictureCommand();
		command.pictureFile = file;
		command.request = req;
		return this.commandBus.execute(command);
	}
}
