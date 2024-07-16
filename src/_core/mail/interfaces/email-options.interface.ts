export interface ISendMailOptions {
	subject: string;

	body: string;

	recipients: {
		email: string;
		name?: string;
	}[];

	attachments?: {
		filename: string;
		content: any;
	}[];
}
