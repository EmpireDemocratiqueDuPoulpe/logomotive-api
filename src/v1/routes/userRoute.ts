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
	if (process.env.NODE_ENV === "developement") {
		route.get("/", isAuthenticated, userController.getAll);
	}

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
 *      - name: Users
 *        description: The user domain routes.
 *      - name: Authentication
 *        description: Authentication routes.
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
 *                                  status:
 *                                      type: number
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          user_id:
 *                                              type: number
 *      get:
 *          summary: Get all users. FOR TESTING PURPOSE ONLY. THIS ROUTE WILL BE REMOVED BEFORE PRODUCTION.
 *          tags: [Users]
 *          security:
 *              - cookieAuth: []
 *          responses:
 *              200:
 *                  description: The list of users.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: number
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: "#/components/schemas/User"
 * /api/v1/users/login:
 *      post:
 *          summary: Login a user.
 *          tags: [Authentication]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/LoginUser"
 *          responses:
 *              200:
 *                  description: The user is logged in.
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
 *                                          sessionID:
 *                                              type: string
 *                                          user:
 *                                              $ref: "#/components/schemas/User"
 * /api/v1/users/authenticate:
 *      post:
 *          summary: Authenticate a user silently. Used by the web app to check if the user is still logged in.
 *          tags: [Authentication]
 *          security:
 *              - cookieAuth: []
 *          responses:
 *              200:
 *                  description: The user is authenticated.
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
 *                                          sessionID:
 *                                              type: string
 *                                          user:
 *                                              $ref: "#/components/schemas/User"
 * /api/v1/users/logout:
 *      post:
 *          summary: Logout a user.
 *          tags: [Authentication]
 *          security:
 *              - cookieAuth: []
 *          responses:
 *              200:
 *                  description: The user is logged out.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: number
 */