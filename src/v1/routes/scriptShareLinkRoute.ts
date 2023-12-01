import { Router } from "express";
import AsyncRouter from "express-promise-router";
import { isAuthenticated } from "../../middlewares";
import scriptShareLinkController from "../controllers/scriptShareLinkController";

const route: Router = AsyncRouter();

export default (router: Router) : void => {
	router.use("/scripts/share", route);

	/*************************************************************
	 * CREATE
	 *************************************************************/
	route.post("/", isAuthenticated, scriptShareLinkController.createShareLink);

	/*************************************************************
	 * READ
	 *************************************************************/
	route.get("/:link_id", scriptShareLinkController.getScriptByLinkID);
	route.get("/links-of/:script_id", isAuthenticated, scriptShareLinkController.getLinksOf);

	/*************************************************************
	 * UPDATE
	 *************************************************************/

	/*************************************************************
	 * DELETE
	 *************************************************************/
	route.delete("/", isAuthenticated, scriptShareLinkController.deleteShareLink);
};