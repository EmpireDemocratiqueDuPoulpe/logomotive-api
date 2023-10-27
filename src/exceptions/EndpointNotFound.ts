import type { Request } from "express";
import APIException from "./APIException";

export default class EndpointNotFound extends APIException {
	constructor(request: Request) {
		super(404, `This endpoint doesn't exist (${request.method}::${request.url}).`);
	}
}