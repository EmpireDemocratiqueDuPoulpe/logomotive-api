import { Router } from "express";
import AsyncRouter from "express-promise-router";
import { isAuthenticated } from "../../middlewares";
import scriptController from "../controllers/scriptController";

const route: Router = AsyncRouter();

export default (router: Router) : void => {
	router.use("/scripts", route);

	/*************************************************************
	 * CREATE
	 *************************************************************/
	route.post("/", isAuthenticated, scriptController.createScript);

	/*************************************************************
	 * READ
	 *************************************************************/
	route.get("/", isAuthenticated, scriptController.getAllOfUser);
	route.get("/:script_id", isAuthenticated, scriptController.getByID);

	/*************************************************************
	 * UPDATE
	 *************************************************************/
	route.put("/", isAuthenticated, scriptController.saveScript);

	/*************************************************************
	 * DELETE
	 *************************************************************/
};