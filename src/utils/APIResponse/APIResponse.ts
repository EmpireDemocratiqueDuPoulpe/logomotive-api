import type { Response } from "express";
import type { JSONResponse } from "./APIResponse.types";

export default class APIResponse {
	private status: number;
	private message?: string;
	private data?: object;
	private error?: string;

	public constructor(status: number = 200) {
		this.status = status;
	}

	/* --- Getters -------------------------------------------------------------------------------------------------- */
	public getStatus() : number { return this.status; }
	public getMessage() : string | undefined { return this.message; }
	public getData() : object | undefined { return this.data; }
	public getError() : string | undefined { return this.error; }

	/* --- Setters -------------------------------------------------------------------------------------------------- */
	public setStatus(status: number) : this {
		this.status = status;
		return this;
	}

	public setMessage(message: string | undefined) : this {
		this.message = message;
		return this;
	}

	public setData(data: object | undefined) : this {
		this.data = data;
		return this;
	}

	public setError(error: string | undefined) : this {
		this.error = error;
		return this;
	}

	/* --- Functions ------------------------------------------------------------------------------------------------ */
	public toJSON() : JSONResponse {
		let json: JSONResponse = { status: this.status };

		if (this.message) json.message = this.message;
		if (this.data) json = { ...json, ...this.data };
		if (this.error) json.error = this.error;

		return json;
	}

	public send(response: Response) : Response {
		return response.status(this.status).json(this.toJSON());
	}
}