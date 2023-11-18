import { Request, Response, NextFunction } from "express";
import { MissingQueryParams } from "../../exceptions";
import APIResponse from "../../utils/APIResponse/APIResponse";
import Logger from "../../utils/Logger/Logger";
import scriptService from "../services/scriptService";
import Script, { ScriptInfo } from "../dataTypes/Script";
import validate from "../../utils/validate";

const logger: Logger = new Logger({ prefix: "[ROUTE] ➟" });

async function createScript(request: Request, response: Response) : Promise<void> {
	const script: Script = new Script(request.body);
	script.user_id = request.session.user!.user_id;
	await validate(script, { groups: ["newScript"] });

	const script_id: number = await scriptService.createScript(script);
	new APIResponse(200).setData({ script_id }).send(response);

	logger.log("Created a new script", { ip: request.clientIp, params: {user_id: request.session.user!.user_id, script_id} });
}

async function getAllOfUser(request: Request, response: Response) : Promise<void> {
	const scripts: Script[] = await scriptService.getAllOfUser(request.session.user!.user_id);
	const scriptsInfo: ScriptInfo[] = [];

	for (const script of scripts) {
		const scriptSize: number = new Blob([ script.content ]).size;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { content: _, ...filteredScriptProps } = script;

		scriptsInfo.push({ ...filteredScriptProps, fileSize: scriptSize });
	}

	new APIResponse(200).setData({ scripts: scriptsInfo }).send(response);
	logger.log("Get all scripts of a user", { ip: request.clientIp, params: {user_id: request.session.user!.user_id} });
}

async function getAllPublic(request: Request, response: Response) : Promise<void> { // TODO: Pagination system
	const scripts: Script[] = await scriptService.getAllPublic();

	new APIResponse(200).setData({ scripts }).send(response);
	logger.log("Get all public scripts", { ip: request.clientIp, params: {user_id: request.session.user!.user_id} });
}

async function getByID(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const script_id: number | null = request.params.script_id ? parseInt(request.params.script_id, 10) : null;
	if (script_id === null) return next(new MissingQueryParams("script_id"));

	const script: Script = await scriptService.getByID(script_id);

	new APIResponse(200).setData({ script }).send(response);
	logger.log("Get a script by ID", { ip: request.clientIp, params: {user_id: request.session.user!.user_id, script_id} });
}

async function saveScript(request: Request, response: Response) : Promise<void> {
	const script: Script = new Script(request.body);
	script.user_id = request.session.user!.user_id;
	await validate(script, { groups: ["savedScript"] });

	await scriptService.saveScript(script);
	new APIResponse(200).send(response);

	logger.log("Saved a script", { ip: request.clientIp, params: {user_id: request.session.user!.user_id, script_id: script.script_id} });
}

export default {
	createScript,
	getAllOfUser, getAllPublic, getByID,
	saveScript
};