import { ApiProperty } from "@nestjs/swagger";
import { IResponse, IResponseData } from "./response.interface";

export class ResponseModel implements IResponse {
	@ApiProperty()
	status: "OK" | "NOK";

	@ApiProperty({
		type: String,
	})
	message: string;

	@ApiProperty({
		type: Object,
	})
	data: IResponseData;

	constructor(obj: IResponse) {
		this.status = obj.status;
		this.message = obj.message;
		this.data = obj.data;
	}
}
