import { Request, Response, NextFunction } from "express";
import { MissingQueryParams } from "../../exceptions";
import APIResponse from "../../utils/APIResponse/APIResponse";
import Logger from "../../utils/Logger/Logger";
import scriptShareLinkService from "../services/scriptShareLinkService";
import scriptService from "../services/scriptService";
import ScriptShareLink from "../dataTypes/ScriptShareLink";
import type Script from "../dataTypes/Script";
import validate from "../../utils/validate";

const logger: Logger = new Logger({ prefix: "[ROUTE] ➟" });

async function createShareLink(request: Request, response: Response) : Promise<void> {
	const scriptShareLink: ScriptShareLink = new ScriptShareLink(request.body);
	await validate(scriptShareLink, { groups: ["newLink"] });

	const script: Script = await scriptService.getByID(scriptShareLink.script_id);
	if (script.user_id !== request.session.user!.user_id) {
		new APIResponse(403).setError("Vous n'avez pas la permission de créer un lien de partage de ce script !");
	}

	const link_id: string = await scriptShareLinkService.createShareLink(scriptShareLink);
	new APIResponse(200).setData({ link_id }).send(response);

	logger.log("Created a new script sharing link", { ip: request.clientIp, params: {user_id: request.session.user!.user_id, script_id: scriptShareLink.script_id, link_id} });
}

async function getScriptID(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const link_id: string | null = request.params.link_id ? request.params.link_id : null;
	if (link_id === null) return next(new MissingQueryParams("link_id"));

	const scriptShareLink: ScriptShareLink = await scriptShareLinkService.getScriptID(link_id);
	new APIResponse(200).setData({ script_id: scriptShareLink.script_id }).send(response);

	logger.log("Get a script ID by sharing link", { ip: request.clientIp, params: {user_id: request.session.user!.user_id, script_id: scriptShareLink.script_id} });
}

async function getLinksOf(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const script_id: number | null = request.params.script_id ? parseInt(request.params.script_id, 10) : null;
	if (script_id === null) return next(new MissingQueryParams("script_id"));

	const scriptShareLinks: ScriptShareLink[] = await scriptShareLinkService.getLinksOf(script_id);
	new APIResponse(200).setData({ links: scriptShareLinks.map((l: ScriptShareLink) => l.link_id) }).send(response);

	logger.log("Get every share links of a script", { ip: request.clientIp, params: {user_id: request.session.user!.user_id, script_id} });
}

async function deleteShareLink(request: Request, response: Response) : Promise<void> {
	const scriptShareLink: ScriptShareLink = await scriptShareLinkService.getScriptID(request.body);
	const script: Script = await scriptService.getByID(scriptShareLink.script_id);

	if (script.user_id !== request.session.user!.user_id) {
		new APIResponse(403).setError("Vous n'avez pas la permission de supprimer ce lien de partage !");
	}

	await scriptShareLinkService.deleteShareLink(scriptShareLink.link_id);
	new APIResponse(201).send(response);

	logger.log("Deleted a script sharing link", { ip: request.clientIp, params: {user_id: request.session.user!.user_id, script_id: script.script_id, link_id: scriptShareLink.link_id} });
}

export default {
	createShareLink,
	getScriptID, getLinksOf,
	deleteShareLink
};