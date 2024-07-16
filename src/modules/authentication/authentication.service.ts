import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { isEmpty } from "lodash";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { UsersRepository } from "@database/mongo-db/repositories/user.repository";
import { User } from "@domain/models";

@Injectable()
export class AuthenticationService {
	private readonly _accessTokenExpiresIn;
	private readonly _refreshTokenExpiresIn;

	private _saltOrRounds = 10;

	constructor(
		private jwtService: JwtService,
		private usersRepo: UsersRepository,
		private configService: ConfigService,
	) {
		//TODO: Refresh token logic
		this._accessTokenExpiresIn = null;
		this._refreshTokenExpiresIn = null;
	}

	/**
	 * Compare password
	 *
	 * @param password
	 * @param hash
	 */
	comparePassword(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}

	/**
	 * Find user by ID
	 *
	 * @param id
	 */
	async findUser(id: string): Promise<User> {
		const result = await this.usersRepo.findById(id);

		if (result === null) {
			throw new NotFoundException("User not found");
		}

		return result.toObject<User>();
	}

	/**
	 * Reset password
	 *
	 * @param dto
	 */
	async resetPassword(dto: ResetPasswordDto) {
		const user = await this.usersRepo.findByEmail(dto.email);

		if (isEmpty(user)) {
			throw new BadRequestException("Oops, something went wrong..");
		}

		const hashedPassword = await bcrypt.hash(dto.password, this._saltOrRounds);

		const updatedUser = await this.usersRepo.update(user.id, {
			password: hashedPassword,
		});

		return {
			status: 201,
			message: "Password created successfully",
			data: updatedUser.toObject<User>(),
		};
	}

	/**
	 *
	 * @param payload
	 * @param neverExpire
	 * @private
	 */
	createAccessToken(payload: any, neverExpire?: boolean): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
			expiresIn: neverExpire === true ? "1y" : this._accessTokenExpiresIn,
		});
	}

	/**
	 * Sign new Refresh Token
	 *
	 * @private
	 * @param payload
	 */
	createRefreshToken(payload: any): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
			expiresIn: this._refreshTokenExpiresIn,
		});
	}

	decodeToken(token: string): any {
		return this.jwtService.decode(token);
	}
}
