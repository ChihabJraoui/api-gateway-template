import { Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export abstract class BaseRepository<D> {
	protected logger: Logger;

	constructor(protected model: Model<D>) {
		this.logger = new Logger(this.constructor.name);
	}

	getAll(): Promise<D[]> {
		return this.model.find();
	}

	find(filter) {
		return this.model.find(filter);
	}

	/**
	 * Find document by ID
	 *
	 * @param id
	 */
	findById(id: string): Promise<D> {
		return this.model.findById(id);
	}

	findByIdAndUpdate(id, updates, options) {
		return this.model.findByIdAndUpdate(id, updates, options);
	}

	findByIdAndDelete(id: string) {
		return this.model.findByIdAndDelete(id);
	}

	create(data: any) {
		const model = new this.model(data);
		return model.save();
	}
}
