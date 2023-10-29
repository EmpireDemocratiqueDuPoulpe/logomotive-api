import APIException from "./APIException";

export default class UnexpectedException extends APIException {
	constructor(message: string) {
		super(500, `Erreur inattendue : ${message}`);
	}
}