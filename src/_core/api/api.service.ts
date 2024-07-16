import { HttpService } from "@nestjs/axios";
import { BadGatewayException, Injectable, Logger } from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { UrlProviderService } from "@core/url-provider/url-provider.service";

@Injectable()
export class ApiService {
	private _baseUrl: string;
	protected _logger: Logger;
	protected httpService: HttpService;

	constructor(private urlProvider: UrlProviderService) {
		this._logger = new Logger();
		this.httpService = new HttpService(axios.create());
	}

	set baseUrl(value: string) {
		this._baseUrl = value;
	}

	protected setHeaders(headers: any) {
		for (const key in headers) {
			this.httpService.axiosRef.defaults.headers.common[key] = headers[key];
		}
	}

	/**
	 * Build the API url
	 *
	 * @param endpoint
	 * @param params
	 */
	buildUrl(endpoint: string, params?: any, options?: any): string {
		let url = `${this._baseUrl}/${endpoint}`;

		if (params) {
			url += "?" + this.urlProvider.convertToQueryStrings(params, options);
		}

		return url;
	}

	async get<T>(url: string): Promise<T> {
		try {
			const res = await this.httpService.axiosRef.get<T>(url);
			return res.data;
		} catch (error) {
			this._handleError(error);
		}
	}

	async post<T>(url: string, data: any, headers: any = {}): Promise<T> {
		try {
			const config = {
				headers: {
					...headers,
				},
			};

			const res = await this.httpService.axiosRef.post<T>(url, data, config);
			return res.data;
		} catch (error) {
			this._handleError(error);
		}
	}

	async put<T>(url: string, data: any, headers: any = {}): Promise<T> {
		try {
			const config = {
				headers: {
					...headers,
				},
			};

			const res = await this.httpService.axiosRef.put<T>(url, data, config);
			return res.data;
		} catch (error) {
			this._handleError(error);
		}
	}

	private _handleError(error: AxiosError) {
		throw new BadGatewayException({
			error: `Request failed with status: ${error.response?.status}`,
			message: error.message,
			data: error.response?.data,
		});
	}
}
