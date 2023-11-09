import { Router } from "express";
import scriptRoute from "./routes/scriptRoute";
import userRoute from "./routes/userRoute";

export default (): Router => {
	const router: Router = Router();

	// Middlewares

	// Routes
	scriptRoute(router);
	userRoute(router);

	return router;
};