import { validate as classValidate, ValidatorOptions, ValidationError } from "class-validator";
import { ValidationException } from "../exceptions";

export default async function validate(object: object, validatorOptions?: ValidatorOptions): Promise<void> {
	const errors: ValidationError[] = await classValidate(object, validatorOptions);

	if (errors.length) {
		throw new ValidationException(errors);
	}
}