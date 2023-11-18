import type { QueryResult } from "pg";
import database from "../../database";
import { APIException, UnexpectedException } from "../../exceptions";
import type Script from "../dataTypes/Script";

async function createScript(script: Script) : Promise<number> {
	const response: QueryResult<Pick<Script, "script_id">> = await database.query(
		"INSERT INTO scripts(user_id, name, content, tags, is_public) VALUES($1, $2, $3, $4, $5) RETURNING script_id",
		[script.user_id, script.name, script.content, script.tags, script.is_public]
	);

	if (!response.rowCount) throw new UnexpectedException("Impossible de créer un nouveau script.");
	return response.rows[0].script_id;
}

async function getAllOfUser(user_id: number) : Promise<Script[]> {
	const scripts: QueryResult<Script> = await database.query(
		"SELECT script_id, user_id, name, content, tags, is_public FROM scripts WHERE user_id = $1",
		[user_id]
	);

	return scripts.rows;
}

async function getAllPublic() : Promise<Script[]> {
	const scripts: QueryResult<Script> = await database.query(`
		SELECT scripts.script_id, users.username, scripts.name, scripts.tags
		FROM scripts
		LEFT JOIN users ON scripts.user_id = users.user_id
		WHERE scripts.is_public = true
	`);

	return scripts.rows;
}

async function getByID(script_id: number) : Promise<Script> {
	const script: QueryResult<Script> = await database.query(
		"SELECT script_id, user_id, name, content, tags, is_public FROM scripts WHERE script_id = $1",
		[script_id]
	);

	if (!script.rowCount) throw new APIException(400, "Aucun script ne correspond à cet identifiant.");
	return script.rows[0];
}

async function saveScript(script: Script) : Promise<void> {
	const response: QueryResult = await database.query(
		"UPDATE scripts SET content = $1, tags = $2, is_public = $3 WHERE script_id = $4",
		[script.content, script.tags, script.is_public, script.script_id]
	);

	if (!response.rowCount) throw new UnexpectedException("Impossible de sauvegarder le script.");
}

export default {
	createScript,
	getAllOfUser, getAllPublic, getByID,
	saveScript
};