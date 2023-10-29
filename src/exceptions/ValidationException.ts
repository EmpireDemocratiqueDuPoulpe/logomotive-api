import { ValidationError } from "class-validator";
import APIException from "./APIException";

function getMessages(errors: ValidationError[]): string[] {
	const messages: string[] = [];

	for (const error of errors) {
		if (!error.constraints) {
			messages.push(`Erreur inconnue : La propriété ${error.property} n'a pas passé la validation`);
			continue;
		}

		for (const failedConstraint of Object.values(error.constraints)) {
			messages.push(failedConstraint);
		}

		if (error.children && (error.children.length > 0)) {
			messages.push(...getMessages(error.children));
		}
	}

	return messages;
}

export default class ValidationException extends APIException {
	constructor(errors: ValidationError[]) {
		super(400, getMessages(errors).join("\n"));
	}
}