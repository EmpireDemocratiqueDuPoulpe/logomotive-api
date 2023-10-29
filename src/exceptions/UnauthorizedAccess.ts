import APIException from "./APIException";

export default class UnauthorizedAccess extends APIException {
	constructor() {
		super(401, "Accès non autorisé : vous devez être connecté pour effectuer cette action.");
	}
}