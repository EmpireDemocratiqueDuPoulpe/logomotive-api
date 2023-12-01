import type {QueryResult} from "pg";
import database from "../../database";
import {APIException, UnexpectedException} from "../../exceptions";
import type ScriptShareLink from "../dataTypes/ScriptShareLink";
import type Script from "../dataTypes/Script";
import scriptService from "./scriptService";

async function createShareLink(scriptShareLink: ScriptShareLink) : Promise<string> {
	const response: QueryResult<Pick<ScriptShareLink, "link_id">> = await database.query(
		"INSERT INTO script_sharing_links(script_id) VALUES($1) RETURNING link_id",
		[scriptShareLink.script_id]
	);

	if (!response.rowCount) throw new UnexpectedException("Impossible de créer un nouveau lien de partage.");
	return response.rows[0].link_id;
}

async function getScriptByLinkID(link_id: string) : Promise<Script> {
	const scriptShareLink: QueryResult<ScriptShareLink> = await database.query(
		"SELECT script_id FROM script_sharing_links WHERE link_id = $1",
		[link_id]
	);

	if (!scriptShareLink.rowCount) throw new APIException(400, "Lien de partage invalide.");
	return await scriptService.getByID(scriptShareLink.rows[0].script_id);
}

async function getLinksOf(script_id: number) : Promise<ScriptShareLink[]> {
	const scriptShareLinks: QueryResult<ScriptShareLink> = await database.query(
		"SELECT link_id, script_id FROM script_sharing_links WHERE script_id = $1",
		[script_id]
	);

	return scriptShareLinks.rows;
}

async function deleteShareLink(link_id: string) : Promise<void> {
	const response: QueryResult = await database.query(
		"DELETE FROM script_sharing_links WHERE link_id = $1",
		[link_id]
	);

	if (!response.rowCount) throw new UnexpectedException("Impossible de supprimer le lien de partage.");
}

export default {
	createShareLink,
	getScriptByLinkID, getLinksOf,
	deleteShareLink
};