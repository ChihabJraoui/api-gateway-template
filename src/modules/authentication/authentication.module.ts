import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MailModule } from "@core/mail/mail.module";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { ForgotPasswordHandler } from "./handlers/forgot-password.handler";
import { LoginAdminHandler } from "./handlers/login-admin.handler";
import { LoginHandler } from "./handlers/login.handler";
import { SignUpHandler } from "./handlers/sign-up.handler";
import { VerificationCodeHandler } from "./handlers/verification-code.handler";
import { JwtRefreshTokenStrategy } from "./strategies/jwt-refresh-token.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	controllers: [AuthenticationController],
	imports: [
		PassportModule.register({
			defaultStrategy: "jwt",
			property: "user", // Define the property that will hold user info in request object
			session: false,
		}),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
			}),
			inject: [ConfigService],
		}),
		CqrsModule,
		MailModule,
	],
	providers: [
		JwtService,

		// Strategies
		JwtStrategy,
		JwtRefreshTokenStrategy,

		// Services
		AuthenticationService,

		// Handlers
		ForgotPasswordHandler,
		VerificationCodeHandler,
		SignUpHandler,
		LoginHandler,
		LoginAdminHandler,
	],
	exports: [],
})
export class AuthenticationModule {}
