import { Request, Response, NextFunction } from "express";
import APIResponse from "../../utils/APIResponse/APIResponse";
import Logger from "../../utils/Logger/Logger";
import userService from "../services/userService";
import User from "../dataTypes/User";
import validate from "../../utils/validate";

const logger: Logger = new Logger({ prefix: "[ROUTE] ➟" });

async function registerUser(request: Request, response: Response) : Promise<void> {
	const user: User = new User(request.body);
	await validate(user, { groups: ["registration"] });

	const user_id: number = await userService.registerUser(user);
	new APIResponse(200).setData({ user_id }).send(response);

	logger.log("Registered a new user", { ip: request.clientIp, params: {user_id} });
}

async function getAll(request: Request, response: Response) : Promise<void> {
	const users: User[] = await userService.getAll();

	new APIResponse(200).setData({ users }).send(response);
	logger.log("Get all users", { ip: request.clientIp });
}

async function loginUser(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const user: User = new User(request.body);
	await validate(user, { groups: ["login"] });

	const fullUser: User = await userService.getByEmailAndPassword(user.email, user.password);
	request.session.regenerate(err => {
		if (err) return next(err);

		request.session.user = fullUser;
		request.session.save((saveErr) : void => {
			if (saveErr) return next(saveErr);

			new APIResponse(200).setData({ sessionID: request.session.id, user: fullUser }).send(response);
			logger.log("Login user", { ip: request.clientIp, params: {user_id: fullUser.user_id} });
		});
	});
}

async function authenticateUser(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const user: User = new User(request.session.user!);
	const storedUser: User = await userService.getByID(user.user_id);

	request.session.regenerate(err => {
		if (err) return next(err);

		request.session.user = storedUser;
		request.session.save((saveErr) : void => {
			if (saveErr) return next(saveErr);

			new APIResponse(200).setData({ sessionID: request.session.id, user: storedUser }).send(response);
			logger.log("Authenticated user", { ip: request.clientIp, params: {user_id: storedUser.user_id} });
		});
	});
}

async function logoutUser(request: Request, response: Response, next: NextFunction) : Promise<void> {
	const user_id: number = request.session.user!.user_id;

	request.session.user = undefined;
	request.session.save((saveErr) : void => {
		if (saveErr) return next(saveErr);

		request.session.regenerate(err => {
			if (err) return next(err);

			new APIResponse(200).send(response);
			logger.log("Logout user", { ip: request.clientIp, params: {user_id} });
		});
	});
}

export default {
	registerUser,
	getAll,
	loginUser, authenticateUser, logoutUser
};