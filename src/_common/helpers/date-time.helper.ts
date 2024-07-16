import { Injectable } from "@nestjs/common";
import * as utc from "dayjs/plugin/utc";
import * as dayjs from "dayjs";

@Injectable()
export class DateTimeHelper {
	constructor() {
		dayjs.extend(utc);
	}

	isValid(value): boolean {
		return dayjs(value).isValid();
	}

	toObject(value) {
		return dayjs(value);
	}

	now(): dayjs.Dayjs {
		return dayjs.utc();
	}

	/**
	 * Return current UTC datetime ISO formated
	 */
	getDateTime(): string {
		return dayjs().toISOString();
	}

	toUTC(value: string) {
		return dayjs.utc(value).toISOString();
	}

	isBeforeNow(value): boolean {
		return dayjs.utc(value).isBefore(this.now());
	}

	getCurrentTimestamp(): number {
		return dayjs().unix();
	}
}
