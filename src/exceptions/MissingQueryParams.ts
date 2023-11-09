import APIException from "./APIException";

export default class MissingQueryParams extends APIException {
	constructor(...missingParams: string[]) {
		super(400, `Paramètre(s) de requête manquant(s) : ${missingParams.join(", ")}.`);
	}
}