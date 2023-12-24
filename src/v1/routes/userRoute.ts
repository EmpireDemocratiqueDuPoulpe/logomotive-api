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

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: The user domain routes.
 * /api/v1/users:
 *      post:
 *          summary: Create a new user.
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/RegisteringUser"
 *          responses:
 *              200:
 *                  description: The user is created.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status: number
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          user_id: number
 */