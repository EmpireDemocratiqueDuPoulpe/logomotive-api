import { Request, Response } from "express";
import APIResponse from "../../utils/APIResponse/APIResponse";
import userService from "../services/userService";
import type User from "../dataTypes/User";

function registerUser(_request: Request, response: Response) : void {
	response.send(userService.registerUser());
}

async function getAll(_request: Request, response: Response) : Promise<void> {
	const resp: APIResponse = new APIResponse(200);
	const users: User[] = await userService.getAll();

	resp.setData({ users }).send(response);
}

function loginUser(_request: Request, response: Response) : void {
	response.send(userService.loginUser());
}

export default {
	registerUser,
	getAll,
	loginUser
};