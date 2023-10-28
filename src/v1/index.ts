import { Router } from "express";
import userRoute from "./routes/userRoute";

export default (): Router => {
	const router: Router = Router();

	// Middlewares

	// Routes
	userRoute(router);

	return router;
};