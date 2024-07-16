import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "@domain/models/user";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository {
	logger: Logger;

	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
		this.logger = new Logger(UsersRepository.name);
	}

	/**
	 * Find user by email
	 * @param email
	 */
	findByEmail(email: string): Promise<UserDocument> {
		return this.userModel.findOne({ email: email }).select("+password").exec();
	}

	/**
	 * Find user by ID
	 *
	 * @param id
	 */
	findById(id: string): Promise<UserDocument> {
		return this.userModel.findById(id).select("+password").exec();
	}

	create(user: any): Promise<any> {
		this.logger.log("Creating user.");
		const newUser = new this.userModel(user);
		return newUser.save();
	}

	/**
	 * Update user
	 *
	 * @param id
	 * @param payload
	 */
	update(id: string, payload: any): Promise<UserDocument> {
		return this.userModel
			.findByIdAndUpdate(id, payload, {
				new: true,
			})
			.exec();
	}

	async findOneAndRemove(query: any): Promise<any> {
		return this.userModel.findOneAndDelete(query);
	}
}
