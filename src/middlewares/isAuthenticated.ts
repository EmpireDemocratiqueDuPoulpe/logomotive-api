import { Request, Response, NextFunction } from "express";
import { UnauthorizedAccess } from "../exceptions";

function isAuthenticated(request: Request, _response: Response, next: NextFunction) : void {
	if (request.session?.user) { next(); }
	else next(new UnauthorizedAccess());
}

export default isAuthenticated;