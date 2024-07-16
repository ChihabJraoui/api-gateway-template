export interface IResponse {
	status?: "OK" | "NOK";
	message?: string;
	data?: IResponseData;
}

export interface IResponseData {
	[key: string]: any;
}
