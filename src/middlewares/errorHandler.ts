import type { Request, Response, NextFunction } from "express";
import Logger from "../utils/Logger/Logger";
import APIResponse from "../utils/APIResponse/APIResponse";
import { APIException } from "../exceptions";
import type { ForwardedError } from "./errorHandler.types";

const logger: Logger = new Logger({ separator: ": " });

/*************************************************************
 * Logger
 *************************************************************/
function expressLogger(err: Error, request: Request, _response: Response, next: NextFunction) : void {
	const url: string = `${request.protocol}://${request.headers.host}${request.originalUrl}`;
	const stack: string | null = err.stack ? (`\t${err.stack.replace(/\n\r?/g, "\n\t")}`) : null;
	const message: string = (!stack ? err.message : (`${err.message}${err.message ? "\n" : ""}${stack}`));

	if (err instanceof APIException) {
		(err.type === "warn" ? logger.warn : logger.error)(
			`At ${url}\n${message}`,
			{ ip: request.clientIp }
		);
	} else {
		logger.error(`Unexpected error: ${message}`);
	}

	next({ url, ref: err });
}

/*************************************************************
 * Error forwarder
 *************************************************************/
function errorForwarder(err: ForwardedError, _request: Request, response: Response, next: NextFunction) : void {
	const resp: APIResponse = new APIResponse((err.ref instanceof APIException) ? err.ref.status : 500).setError(err.ref.message);

	if (!response.headersSent) {
		resp.send(response);
	}

	next(resp);
}

/*************************************************************
 * Export
 *************************************************************/
export default { expressLogger, errorForwarder };