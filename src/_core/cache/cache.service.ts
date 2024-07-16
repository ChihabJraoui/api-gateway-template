import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	clear(): void {
		this.cacheManager.reset().then(() => {
			Logger.log("Resetting cache", CacheService.name);
		});
	}
}
