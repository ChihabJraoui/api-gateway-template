import { Global, Module } from "@nestjs/common";
import { ApiService } from "@core/api";
import { UrlProviderService } from "@core/url-provider/url-provider.service";
import { StorageService } from "@core/storage/storage.service";

@Global()
@Module({
	imports: [],
	providers: [UrlProviderService, ApiService, StorageService],
	exports: [UrlProviderService, ApiService, StorageService],
})
export class CoreModule {}
