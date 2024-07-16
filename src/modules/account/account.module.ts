import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { EditProfileHandler } from "./handlers/edit-profile.handler";
import { GetProfileHandler } from "./handlers/get-profile.handler";
import { UpdateProfilePictureHandler } from "./handlers/update-profile-picture.handler";

@Module({
	controllers: [AccountController],
	imports: [CqrsModule],
	providers: [
		GetProfileHandler,
		EditProfileHandler,
		UpdateProfilePictureHandler,
	],
})
export class AccountModule {}
