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
	route.get("/all", scriptController.getAllPublic);
	route.get("/:script_id", scriptController.getByID);

	/*************************************************************
	 * UPDATE
	 *************************************************************/
	route.put("/", isAuthenticated, scriptController.saveScript);

	/*************************************************************
	 * DELETE
	 *************************************************************/
};

/**
 * @swagger
 * tags:
 *      - name: Script
 *        description: The script domain routes.
 * /api/v1/scripts:
 *      post:
 *          summary: Create a new script.
 *          tags: [Script]
 *          security:
 *              - cookieAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/NewScript"
 *          responses:
 *              200:
 *                  description: The script is created.
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
 *                                          script_id:
 *                                              type: number
 *      get:
 *          summary: Get all scripts of a user.
 *          tags: [Script]
 *          security:
 *              - cookieAuth: []
 *          responses:
 *              200:
 *                  description: All script of the user are returned.
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
 *                                          scripts:
 *                                              type: array
 *                                              items:
 *                                                  $ref: "#/components/schemas/Script"
 *      put:
 *          summary: Update a script.
 *          tags: [Script]
 *          security:
 *              - cookieAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdatingScript"
 *          responses:
 *              201:
 *                  description: The script is updated.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: number
 * /api/v1/scripts/{scriptID}:
 *      get:
 *          summary: Get a script by its id.
 *          tags: [Script]
 *          parameters:
 *              - in: path
 *                name: scriptID
 *                description: The auto-generated script id.
 *                schema:
 *                  type: number
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
 * /api/v1/scripts/all:
 *      get:
 *          summary: Get all public scripts.
 *          tags: [Script]
 *          responses:
 *              200:
 *                  description: All public script are returned.
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
 *                                          scripts:
 *                                              type: array
 *                                              items:
 *                                                  $ref: "#/components/schemas/Script"
 */