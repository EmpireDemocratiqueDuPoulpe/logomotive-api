import type { QueryResult } from "pg";
import database from "../../database";
import { APIException, UnexpectedException } from "../../exceptions";
import { hashPassword } from "../../utils/passwords";
import type User from "../dataTypes/User";

async function registerUser(user: User) : Promise<number> {
	const userByEmail: User | null = await getByEmail(user.email);
	if (userByEmail) throw new APIException(400, "Cette adresse-email est déjà utilisée");

	const hashedPassword: string = await hashPassword(user.password);
	const response: QueryResult<Pick<User, "userID">> = await database.query(
		"INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING user_id",
		[user.username, user.email, hashedPassword]
	);

	if (!response.rowCount) throw new UnexpectedException("Impossible de créer un nouveau compte");
	return response.rows[0].userID;
}

async function getAll() : Promise<User[]> {
	const users: QueryResult<User> = await database.query("SELECT user_id, username, email FROM users");
	return users.rows;
}

async function getByEmail(email: string) : Promise<User | null> {
	const user: QueryResult<User> = await database.query("SELECT user_id, username, email FROM users WHERE email = $1", [email]);
	return user.rowCount ? user.rows[0] : null;
}

function loginUser() : string {
	return "login user";
}

export default {
	registerUser,
	getAll,
	loginUser
};