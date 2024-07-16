import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh-token",
) {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
			secretOrKey: configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
		});
	}

	/**
	 * Validation if refresh token valid
	 * @param payload
	 */
	public async validate(payload: any): Promise<any> {
		return {
			id: payload.id,
			username: "test",
			email: "test@alpha10x.com",
		};
	}
}
