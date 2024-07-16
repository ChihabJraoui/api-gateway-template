import { Global, Module } from "@nestjs/common";
import { OpenAIService } from "@core/openai/openai.service";

@Global()
@Module({
	imports: [],
	providers: [OpenAIService],
	exports: [OpenAIService],
})
export class OpenAIModule {}
