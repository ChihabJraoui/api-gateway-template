import { CacheModuleOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
	private readonly ttl: number;

	constructor(private configService: ConfigService) {
		const timeToLiveInDays = this.configService.get<number>(
			"CACHE_TTL_DAYS",
			10,
		);

		// Convert to milliseconds
		this.ttl = timeToLiveInDays * 24 * 60 * 60 * 1000;
	}

	async createCacheOptions(): Promise<CacheModuleOptions> {
		return {
			isGlobal: true,
			ttl: this.ttl,
		};
	}
}
