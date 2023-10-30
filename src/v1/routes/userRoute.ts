import { Router } from "express";
import AsyncRouter from "express-promise-router";
import { isAuthenticated, isNotAuthenticated } from "../../middlewares";
import userController from "../controllers/userController";

const route: Router = AsyncRouter();

export default (router: Router) : void => {
	router.use("/users", route);

	/*************************************************************
	 * CREATE
	 *************************************************************/
	route.post("/", isNotAuthenticated, userController.registerUser);

	/*************************************************************
	 * READ
	 *************************************************************/
	route.get("/", isAuthenticated, userController.getAll);

	/*************************************************************
	 * UPDATE
	 *************************************************************/
	/*************************************************************
	 * DELETE
	 *************************************************************/

	/*************************************************************
	 * AUTH
	 *************************************************************/
	route.post("/login", isNotAuthenticated, userController.loginUser);
	route.post("/authenticate", isAuthenticated, userController.authenticateUser);
	route.post("/logout", isAuthenticated, userController.logoutUser);
};