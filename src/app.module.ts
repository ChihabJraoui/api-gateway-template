import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ResponseInterceptor } from "@core/interceptors";
import { HttpExceptionFilter } from "@core/exceptions/exception.filter";
import { CoreModule } from "@core/core.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { DatabaseModule } from "@database/database.module";
import { DateTimeHelper } from "@common/helpers";
import { AccountModule } from "./modules/account/account.module";
import { OpenAIModule } from "@core/openai/openai.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),

		CoreModule,
		DatabaseModule,
		OpenAIModule,

		AuthenticationModule,
		AccountModule,
	],
	providers: [
		DateTimeHelper,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
})
export class AppModule {}
