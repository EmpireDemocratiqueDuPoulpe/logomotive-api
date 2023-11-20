import { Router } from "express";
import scriptRoute from "./routes/scriptRoute";
import scriptShareLinkRoute from "./routes/scriptShareLinkRoute";
import userRoute from "./routes/userRoute";

export default (): Router => {
	const router: Router = Router();

	// Middlewares

	// Routes
	scriptRoute(router);
	scriptShareLinkRoute(router);
	userRoute(router);

	return router;
};