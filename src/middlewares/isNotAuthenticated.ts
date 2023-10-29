import { Request, Response, NextFunction } from "express";
import { APIException } from "../exceptions";

function isNotAuthenticated(request: Request, _response: Response, next: NextFunction) : void {
	if (request.session.user) { next(new APIException(403, "Vous ne pouvez pas accéder à cette ressource en étant authentifié.")); }
	else next();
}

export default isNotAuthenticated;