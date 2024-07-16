import { Injectable } from "@nestjs/common";
import { stringify } from "qs";

@Injectable()
export class UrlProviderService {
	private _apiRootUrl: string;

	/**
	 *
	 * @param args
	 * @returns {string}
	 */
	public getApiEndpoint(...args: any[]) {
		return this._apiRootUrl + "/" + Array.prototype.slice.call(args).join("/");
	}

	/**
	 *  Convert object of key => value to a query string
	 *
	 * @param obj
	 * @returns {string}
	 */
	public convertToQueryStrings(obj: any, options?: any): string {
		if (obj) {
			return stringify(obj, options);
		}

		return "";
	}

	/**
	 *  Join url with Query string.
	 *
	 * @param apiEndpoint
	 * @param queryString
	 * @returns {string}
	 */
	public join(apiEndpoint: string, queryString: string): string {
		if (!queryString) {
			return apiEndpoint;
		}

		return [apiEndpoint, queryString].join("?");
	}
}
