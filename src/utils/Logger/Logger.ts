import "@colors/colors";
import type { LoggerOptions, MessageOptions } from "./Logger.types";

export default class Logger {
	private prefix: string;
	private separator: string;
	private colors: boolean = true;

	public constructor({ prefix = undefined, separator = undefined, colors = true}: LoggerOptions) {
		this.prefix = prefix ?? "";
		this.separator = separator ?? " - ";
		this.colors = colors ?? true;
	}

	/* --- Getters -------------------------------------------------------------------------------------------------- */
	public getPrefix() : string { return this.prefix; }
	public getSeparator() : string { return this.separator; }
	public hasColors() : boolean { return this.colors; }

	/* --- Setters -------------------------------------------------------------------------------------------------- */
	public setPrefix(prefix: string) : void { this.prefix = prefix; }
	public setSeparator(separator: string) : void { this.separator = separator; }
	public enableColors(enable: boolean = true) : void { this.colors = enable; }

	/* --- Functions ------------------------------------------------------------------------------------------------ */
	private dateToString(date: Date, withTime: boolean = true, locale: string = "fr-FR") : string {
		return withTime ? date.toLocaleString(locale) : date.toLocaleDateString(locale);
	}

	private buildMessage(message: string, { withTime = true, ip = undefined, params = undefined, isSubLevel = false }: MessageOptions = {}) : string {
		const now: string = withTime ? this.dateToString(new Date()) : "";
		const ipStr: string = ip ? `[${ip}]` : "";
		const paramsStr: string = params ? (
			Object.entries(params).map(([key, value]) : string => `${key}=${value}`).join(", ")
		) : "";

		let preSeparator: string = `${this.prefix}${now ? `${now} ` : ""}${ipStr}${this.separator}`.green;
		let postSeparator: string = `${message} ${paramsStr.gray}`;

		if (isSubLevel) {
			preSeparator = `${this.prefix}${" ".repeat(3)}`.gray;
			postSeparator = postSeparator.gray;
		}

		const str: string = `${preSeparator}${postSeparator}`;
		return this.colors ? str : str.stripColors;
	}

	public log(message: string, options: MessageOptions = {}) : void { console.log(this.buildMessage(message, options)); }
	public info(message: string, options: MessageOptions = {}) : void { console.info(this.buildMessage(message, options)); }
	public warn(message: string, options: MessageOptions = {}) : void { console.warn(this.buildMessage(message, options).stripColors.yellow); }
	public error(message: string, options: MessageOptions = {}) : void { console.error(this.buildMessage(message, options).stripColors.red); }
}