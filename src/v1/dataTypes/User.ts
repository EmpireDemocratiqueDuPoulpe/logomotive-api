import {
	IsDefined,
	IsEmail,
	IsInt,
	IsPositive,
	IsString,
	IsStrongPassword,
	Length
} from "class-validator";
import { Match } from "../../decorators/Match";

export default class User {
	@IsDefined({ groups: [ "registered" ], message: "Identifiant utilisateur invalide." })
	@IsInt({ groups: [ "registered" ], message: "Identifiant utilisateur invalide." })
	@IsPositive({ groups: [ "registered" ], message: "Identifiant utilisateur invalide." })
	user_id: number;

	@IsDefined({ groups: [ "registration", "registered" ], message: "Le nom d'utilisateur est nécessaire." })
	@IsString({ groups: [ "registration", "registered" ], message: "Le nom d'utilisateur est invalide." })
	@Length(1, 32, { groups: [ "registration", "registered" ], message: "Le nom d'utilisateur doit faire entre $constraint1 et $constraint2 caractères." })
	username: string;

	@IsDefined({ groups: [ "registration", "registered", "login" ], message: "L'adresse email est nécessaire." })
	@IsEmail(undefined, { groups: [ "registration", "registered", "login" ], message: "L'adresse email est invalide." })
	email: string;

	@IsDefined({ groups: [ "login" ], message: "Le mot de passe est nécessaire." })
	@IsString({ groups: [ "login" ], message: "Le mot de passe est invalide." })
	password: string;

	@IsDefined({ groups: [ "registration" ], message: "Le mot de passe est nécessaire." })
	@IsStrongPassword(
		{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
		{
			groups: [ "registration" ],
			message: "Le mot de passe doit faire au moins huit caractères et respecter les règles suivantes : une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial."
		}
	)
	password1: string;

	@IsDefined({ groups: [ "registration" ], message: "Le mot de passe est nécessaire." })
	@Match(User, (u: User) => u.password1, { groups: [ "registration" ], message: "Les mots de passes ne correspondent pas." })
	password2: string;

	constructor(data: User) {
		this.user_id = data?.user_id;
		this.username = data?.username;
		this.email = data?.email;
		this.password = data?.password;
		this.password1 = data?.password1;
		this.password2 = data?.password2;
	}
}

/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - user_id
 *                  - username
 *                  - email
 *              properties:
 *                  user_id:
 *                      type: number
 *                      description: The auto-generated user id.
 *                  username:
 *                      type: string
 *                      description: Username.
 *                  email:
 *                      type: string.
 *                      description: User email.
 *              example:
 *                  user_id: 1
 *                  username: Johmnny McNumgget
 *                  email: johmnny.mcnumgget@chee.ms
 *          RegisteringUser:
 *              type: object
 *              required:
 *                  - username
 *                  - email
 *                  - password1
 *                  - password2
 *              properties:
 *                  username:
 *                      type: string
 *                      description: Username.
 *                  email:
 *                      type: string.
 *                      description: User email.
 *                  password1:
 *                      type: string
 *                      description: User password.
 *                  password2:
 *                      type: string
 *                      description: Password confirmation.
 *              example:
 *                  username: Johmnny McNumgget
 *                  email: johmnny.mcnumgget@chee.ms
 *                  password1: MotDePasse123!
 *                  password2: MotDePasse123!
 *          LoginUser:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                      description: User email.
 *                  password:
 *                      type: string
 *                      description: User password.
 *              example:
 *                  email: johmnny.mcnumgget@chee.ms
 *                  password: MotDePasse123!
 */