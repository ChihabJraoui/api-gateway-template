import {
	Injectable,
	Logger,
	UnprocessableEntityException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private _logger = new Logger(JwtStrategy.name);

	constructor(
		private authService: AuthenticationService,
		configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
			ignoreExpiration: false,
		});
	}

	/**
	 * Validates a JWT token by verifying the user's ID and handling guest access.
	 *
	 * @param payload - The decoded JWT payload containing the user's ID.
	 * @returns The validated user or guest user information.
	 * @throws UnprocessableEntityException if the token is invalid or the user cannot be found.
	 */
	async validate(payload: any) {
		this._logger.log(`Validating JWT Token...`);

		// Ensure the payload contains an ID.
		if (!payload?.id) {
			throw new UnprocessableEntityException("Invalid token object");
		}

		try {
			// Attempt to find the user by ID.
			const user = await this.authService.findUser(payload.id);
			this._logger.log(`\t User token validated: ${user.email}`);
			return user;
		} catch (error) {
			throw error;
		}
	}
}
