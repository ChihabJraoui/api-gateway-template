import { SchemaOptions } from "mongoose";
import { plainToClass } from "class-transformer";

declare type ModelType<T> = {
	new (...args: any[]): T;
};

export default function (Model: ModelType<any>): SchemaOptions {
	return {
		toObject: {
			virtuals: true,
			versionKey: false,
			transform: (doc, ret) => plainToClass(Model, ret),
		},
	};
}
