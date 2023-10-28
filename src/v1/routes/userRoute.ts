import { Router } from "express";
import AsyncRouter from "express-promise-router";
import userController from "../controllers/userController";

const route: Router = AsyncRouter();

export default (router: Router) : void => {
	router.use("/users", route);

	/*************************************************************
	 * CREATE
	 *************************************************************/
	route.post("/", userController.registerUser);

	/*************************************************************
	 * READ
	 *************************************************************/
	route.get("/", userController.getAll);

	/*************************************************************
	 * UPDATE
	 *************************************************************/
	/*************************************************************
	 * DELETE
	 *************************************************************/

	/*************************************************************
	 * AUTH
	 *************************************************************/
	route.post("/login", userController.loginUser);

};