import { NextFunction } from "express";
import { validate as classValidate, ValidatorOptions, ValidationError } from "class-validator";
import { ValidationException } from "../exceptions";

export default async function validate(next: NextFunction, object: object, validatorOptions?: ValidatorOptions): Promise<void> {
	const errors: ValidationError[] = await classValidate(object, validatorOptions);

	if (errors.length) {
		next(new ValidationException(errors));
	}
}