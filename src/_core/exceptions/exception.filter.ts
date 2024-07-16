import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

type CustomException = {
	status: string;
	exception?: string;
	message?: string;
	error?: string;
	path?: string;
	details?: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	async catch(exception: any, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();

		const obj: CustomException = {
			status: "NOK",
			path: request.url,
			message: "Something went wrong. Please try again later.",
		};

		let status: number;

		if (exception instanceof HttpException) {
			const data: any = exception.getResponse();
			status = exception.getStatus();

			if (
				data.statusCode == HttpStatus.BAD_REQUEST &&
				Array.isArray(data.message)
			) {
				obj.exception = "BadRequestException";
				obj.error = "Validation error";
				obj.details = data.message;
			} else {
				obj.exception = exception.name;
				obj.error = data.message;
				obj.details =
					data.statusCode !== HttpStatus.UNAUTHORIZED
						? exception.stack
						: undefined;
			}
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			obj.exception = "InternalServerError";
			obj.message = exception.name;
			obj.error = exception.code;
			obj.details = exception.stack;
		}

		// Log exception
		Logger.error(
			`\nError: ${obj.error} \nMessage: ${obj.message}`,
			obj.details,
			HttpExceptionFilter.name,
		);

		if (process.env.ENVIRONMENT !== "local") {
			delete obj.details;
		}

		response.status(status).json(obj);
	}
}
