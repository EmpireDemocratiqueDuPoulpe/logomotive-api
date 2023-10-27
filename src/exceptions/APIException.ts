export default class APIException extends Error {
	public readonly status: number;
	public readonly type: "error" | "warn";

	public constructor(status: number, message: string, type: "error" | "warn" = "error") {
		super(`Error ${status}: ${message}`);

		this.status = status;
		this.type = type;
	}
}