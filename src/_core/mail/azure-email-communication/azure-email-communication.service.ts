// import { Injectable, Logger } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { EmailClient, EmailMessage } from "@azure/communication-email";
// import { ISendMailOptions } from "../interfaces/email-options.interface";
//
// @Injectable()
// export class AzureEmailCommunicationService {
// 	private _client: EmailClient;
//
// 	constructor(private configService: ConfigService) {
// 		this._client = new EmailClient(configService.get("AZURE_EMAIL_CONNECTION_STRING"));
// 	}
//
// 	send(options: ISendMailOptions) {
// 		const emailMessage: EmailMessage = {
// 			senderAddress: "no-reply@alpha10x.com",
// 			content: {
// 				subject: options.subject,
// 				html: options.body,
// 			},
// 			recipients: {
// 				to: [],
// 			},
// 		};
//
// 		for (const recipient of options.recipients) {
// 			emailMessage.recipients.to.push({
// 				displayName: recipient.name,
// 				address: recipient.email,
// 			});
// 		}
//
// 		this._client
// 			.beginSend(emailMessage)
// 			.then(() => {
// 				Logger.debug("Email sent successfully", AzureEmailCommunicationService.name);
// 			})
// 			.catch((err) => {
// 				Logger.error("Error while sending email", err, AzureEmailCommunicationService.name);
// 			});
// 	}
// }
