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

	const userID: number = await userService.registerUser(user);
	new APIResponse(200).setData({ userID }).send(response);

	logger.log("Registered a new user", { ip: request.clientIp, params: {userID} });
}

async function getAll(request: Request, response: Response) : Promise<void> {
	const users: User[] = await userService.getAll();

	new APIResponse(200).setData({ users }).send(response);
	logger.log("Get all users", { ip: request.clientIp });
}

async function loginUser(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const user: User = new User(request.body);
	await validate(next, user, { groups: ["login"] });

	const fullUser: User = await userService.getByEmailAndPassword(user.email, user.password);
	request.session.regenerate(err => {
		if (err) next(err);

		request.session.user = fullUser;
		request.session.save((saveErr) : void => {
			if (saveErr) next(saveErr);

			new APIResponse(200).send(response);
			logger.log("Login user", { ip: request.clientIp, params: {userID: user.userID} });
		});
	});
}

export default {
	registerUser,
	getAll,
	loginUser
};