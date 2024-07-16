import {
	BadRequestException,
	Injectable,
	UnprocessableEntityException,
} from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { isBase64 } from "class-validator";

@Injectable()
export class StorageService {
	constructor() {
		cloudinary.config({
			cloud_name: "doz5jccgm",
			api_key: "752463633323874",
			api_secret: "4XXFFaEM6pPto3E_lV0il7Q140M",
		});
	}

	async uploadFile(file: Express.Multer.File): Promise<any> {
		try {
			const result = await this._uploadFile(file);

			return {
				url: result.secure_url,
			};
		} catch (e) {
			console.error(e);
			throw new UnprocessableEntityException("Cannot upload profile picture.");
		}
	}

	async uploadImage(encodedImage: string): Promise<any> {
		const base64Info = encodedImage.split(";base64,");

		if (base64Info?.length > 0 && !isBase64(base64Info[1])) {
			throw new BadRequestException("Image is not base64 format.");
		}

		const data = base64Info[1];

		try {
			const result = await this._uploadBase64(data);

			return {
				url: result.secure_url,
			};
		} catch (e) {
			console.error(e);
			throw new UnprocessableEntityException("Cannot upload profile picture.");
		}
	}

	private _uploadBase64(data): Promise<any> {
		return new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ resource_type: "image" }, (error, result) => {
					if (error) return reject(error);
					resolve(result);
				})
				.end(Buffer.from(data, "base64"));
		});
	}

	private _uploadFile(file: Express.Multer.File): Promise<any> {
		return new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ resource_type: "image" }, (error, result) => {
					if (error) return reject(error);
					resolve(result);
				})
				.end(file.buffer);
		});
	}
}
