import type { QueryResult } from "pg";
import database from "../../database";
import type User from "../dataTypes/User";

function registerUser() : string {
	return "create user";
}

async function getAll() : Promise<User[]> {
	const users: QueryResult<User> = await database.query("SELECT user_id, username, email FROM users");
	return users.rows;
}

function loginUser() : string {
	return "login user";
}

export default {
	registerUser,
	getAll,
	loginUser
};