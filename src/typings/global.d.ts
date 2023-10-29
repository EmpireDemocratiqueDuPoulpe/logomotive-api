import "express-session";
import type User from "../v1/dataTypes/User";

declare module "express-session" {
	export interface SessionData {
		user?: User
	}
}