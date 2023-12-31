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

/**
 * @swagger
 * tags:
 *      - name: Script share links
 *        description: The script share links domain routes.
 * /api/v1/scripts/share:
 *      post:
 *          summary: Create a new share link.
 *          tags: [Script share links]
 *          security:
 *              - cookieAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/NewScriptShareLink"
 *          responses:
 *              200:
 *                  description: The share link is created.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: number
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          link_id:
 *                                              type: string
 *      delete:
 *          summary: Delete a share link.
 *          tags: [Script share links]
 *          security:
 *              - cookieAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ScriptShareLink"
 *          responses:
 *              201:
 *                  description: The share link is deleted.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: number
 * /api/v1/scripts/share/{linkID}:
 *      get:
 *          summary: Get a script by a link id.
 *          tags: [Script share links]
 *          parameters:
 *              - in: path
 *                name: linkID
 *                description: The auto-generated link id.
 *                schema:
 *                  type: string
 *                required: true
 *          responses:
 *              200:
 *                  description: The script is returned.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: number
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          script:
 *                                              $ref: "#/components/schemas/Script"
 * /api/v1/scripts/share/links-of/{scriptID}:
 *      get:
 *          summary: Get all share links of a script.
 *          tags: [Script share links]
 *          security:
 *              - cookieAuth: []
 *          parameters:
 *              - in: path
 *                name: scriptID
 *                description: The auto-generated script id.
 *                schema:
 *                  type: number
 *                required: true
 *          responses:
 *              200:
 *                  description: All share links are returned.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: number
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          links:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 */