import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Prop } from "@nestjs/mongoose";
import { v4 } from "uuid";

export abstract class BaseModel {
	@Exclude()
	@Prop({
		type: String,
		default: () => v4(),
	})
	_id: string;

	@ApiProperty({
		type: String,
	})
	@Prop()
	createdAt?: number;

	@ApiProperty({
		type: String,
	})
	@Prop()
	createdBy?: string;

	@ApiProperty({
		type: String,
	})
	@Prop()
	updatedAt?: number;

	@ApiProperty({
		type: String,
	})
	@Prop()
	updatedBy?: string;
}
