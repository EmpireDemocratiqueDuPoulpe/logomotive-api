import type { QueryResult } from "pg";
import database from "../../database";
import { APIException, UnexpectedException } from "../../exceptions";
import { hashPassword, passwordMatchHash } from "../../utils/passwords";
import type User from "../dataTypes/User";

async function registerUser(user: User) : Promise<number> {
	let userByEmail: User | null = null;

	try { userByEmail = await getByEmail(user.email); }
	catch (err) { /* It is a good thing if an error in caught */ }

	if (userByEmail) {
		throw new APIException(400, "Cette adresse-email est déjà utilisée");
	}

	const hashedPassword: string = await hashPassword(user.password1);
	const response: QueryResult<Pick<User, "userID">> = await database.query(
		"INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING user_id",
		[user.username, user.email, hashedPassword]
	);

	if (!response.rowCount) throw new UnexpectedException("Impossible de créer un nouveau compte.");
	return response.rows[0].userID;
}

async function getAll() : Promise<User[]> {
	const users: QueryResult<User> = await database.query("SELECT user_id, username, email FROM users");
	return users.rows;
}

async function getByEmail(email: string) : Promise<User> {
	const user: QueryResult<User> = await database.query("SELECT user_id, username, email FROM users WHERE email = $1", [email]);

	if (!user.rowCount) throw new APIException(400, "Aucun utilisateur ne correspond à cette adresse e-mail.");
	return user.rows[0];
}

async function getByEmailAndPassword(email: string, password: string) : Promise<User> {
	const user: QueryResult<User> = await database.query("SELECT user_id, username, email, password FROM users WHERE email = $1", [email]);
	if (!user.rowCount) throw new APIException(400, "Adresse e-mail ou mot de passe incorrect.");

	if (!await passwordMatchHash(password, user.rows[0].password)) {
		throw new APIException(400, "Adresse e-mail ou mot de passe incorrect.");
	}

	user.rows[0].password = "";
	return user.rows[0];
}

export default {
	registerUser,
	getByEmail, getByEmailAndPassword, getAll,
};