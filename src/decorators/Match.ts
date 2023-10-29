import { ClassConstructor } from "class-transformer";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

// https://github.com/typestack/class-validator/issues/486#issuecomment-888484124
export const Match = <T>(type: ClassConstructor<T>, property: (o: T) => unknown, validationOptions?: ValidationOptions) => {
	return (object: object, propertyName: string) : void => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: MatchConstraint,
		});
	};
};

@ValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {
	validate(value: unknown, args: ValidationArguments) : boolean {
		const [fn] = args.constraints;
		return fn(args.object) === value;
	}

	defaultMessage(args: ValidationArguments) : string {
		const [constraintProperty]: (() => unknown)[] = args.constraints;
		return `${constraintProperty} and ${args.property} does not match`;
	}
}