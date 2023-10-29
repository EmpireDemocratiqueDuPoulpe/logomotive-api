import { Request, Response, NextFunction } from "express";
import APIResponse from "../../utils/APIResponse/APIResponse";
import Logger from "../../utils/Logger/Logger";
import userService from "../services/userService";
import User from "../dataTypes/User";
import validate from "../../utils/validate";

const logger: Logger = new Logger({ prefix: "[ROUTE] ➟" });

async function registerUser(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const user: User = new User(request.body);
	await validate(next, user, { groups: ["registration"] });

	const resp: APIResponse = new APIResponse(200);
	const userID: number = await userService.registerUser(user);
	resp.setData({ userID }).send(response);

	logger.log("Registered a new user", { params: {userID} });
}

async function getAll(_request: Request, response: Response) : Promise<void> {
	const resp: APIResponse = new APIResponse(200);
	const users: User[] = await userService.getAll();

	resp.setData({ users }).send(response);
	logger.log("Get all users");
}

function loginUser(_request: Request, response: Response) : void {
	response.send(userService.loginUser());
	// logger.log("Login user", { params: {email: user.email, success: !!userID} }); TODO
}

export default {
	registerUser,
	getAll,
	loginUser
};