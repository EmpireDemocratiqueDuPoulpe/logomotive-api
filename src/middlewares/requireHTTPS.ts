import { Request, Response, NextFunction } from "express";

function requireHTTPS(request: Request, response: Response, next: NextFunction) : void {
	if (!request.secure && process.env.NODE_ENV !== "developement") {
		return response.redirect(`https://${request.headers.host}${request.url}`);
	}

	next();
}

export default requireHTTPS;