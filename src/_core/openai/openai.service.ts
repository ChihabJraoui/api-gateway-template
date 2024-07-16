import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OpenAI } from "openai";

@Injectable()
export class OpenAIService {
	private _openai: OpenAI;

	constructor(configService: ConfigService) {
		// this._openai = new OpenAI({
		// 	organization: configService.get<string>("OPENAI_ORGANIZATION_ID"),
		// 	project: configService.get<string>("OPENAI_PROJECT_ID"),
		// 	apiKey: configService.get<string>("OPENAI_API_KEY"),
		// });
	}

	async init(data: string) {
		const response = await this._openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"I'm using AmCharts library version 5 in my Angular application, and I support the following " +
						'charts: "pie", "line", "column" and "map". Help me determine which chart will serve best to ' +
						"visualize the data that I will send you. Answer me with a JSON format: " +
						'{ "chart": "name of the chart", "reason": "explain why in a short sentence" }.',
				},
				{
					role: "user",
					content: "This is the data sample: ```" + data + "```",
				},
			],
		});

		let content = response.choices[0].message.content;

		// Remove any code block markers (```)
		content = content.replace(/```json|\n|```/g, "");

		try {
			// Attempt to parse the JSON
			const jsonResponse = JSON.parse(content);
			return jsonResponse;
		} catch (error) {
			throw new Error("Failed to parse JSON response from OpenAI");
		}
	}
}
