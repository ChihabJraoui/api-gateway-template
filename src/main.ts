import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { json, urlencoded } from "express";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			whitelist: true,
			forbidNonWhitelisted: true,
			validateCustomDecorators: true,
		}),
	);

	// todo: remove cors in production
	app.enableCors({
		origin: "*",
	});

	// Configure Swagger
	const config = new DocumentBuilder()
		.setTitle("API GATEWAY")
		.setDescription("API description")
		.setVersion("1.0")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("swagger", app, document);

	/**
	 * Increase the size limit of incoming JSON payloads to 4MB.
	 * Default: 100KB
	 */
	app.use(
		json({
			limit: "4mb",
		}),
	);

	/**
	 * Increase the size limit of incoming requests with URL-encoded payloads to 4MB.
	 * Default: 100KB
	 */
	app.use(
		urlencoded({
			extended: true,
			limit: "4mb",
		}),
	);

	await app.listen(process.env.PORT);
}

bootstrap();
