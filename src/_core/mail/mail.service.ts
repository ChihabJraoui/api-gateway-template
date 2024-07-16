import * as fs from "fs";
import { join } from "path";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as mjml from "mjml";
import * as mustache from "mustache";
import { ISendMailOptions } from "@core/mail/interfaces/email-options.interface";

@Injectable()
export class MailService {
	private _logger: Logger;

	private readonly _appUrl: string;
	private _logoUrl: string;
	private _confirmEmailUrl: string;

	constructor(private configService: ConfigService) {
		this._logger = new Logger(MailService.name);

		this._appUrl = this.configService.get<string>("GATEWAY_API_URL");
		this._logoUrl = this._appUrl + "/assets/images/logos/iov_logo_sm.png";
		this._confirmEmailUrl = this._appUrl + "/auth/confirm-email";
	}

	/**
	 * Send Email
	 *
	 * @param options
	 */
	send(options: ISendMailOptions): void {
		// this.azureEmailService.send(options);
	}

	getEmailTemplate(filename: string, data: any): string {
		// TODO: add verifications and exception handling
		const template = fs
			.readFileSync(join("templates", filename + ".mjml"))
			.toString();

		const mjmlOutput = mjml(template, {
			filePath: "templates",
		});

		return mustache.render(mjmlOutput.html, {
			...data,
			appUrl: this._appUrl,
		});
	}
}
