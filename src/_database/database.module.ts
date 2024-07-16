import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "@domain/models/user";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";
import { DateTimeHelper } from "@common/helpers";
import { HttpModule } from "@nestjs/axios";

@Global()
@Module({
	imports: [
		MongooseModule.forRoot(""),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

		HttpModule,
	],
	providers: [DateTimeHelper, UsersRepository],
	exports: [UsersRepository],
})
export class DatabaseModule {}
