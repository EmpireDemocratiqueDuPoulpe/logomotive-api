import "dotenv/config";
import express, { Express, Request } from "express";
import http from "http";
import https from "https";
import fs from "fs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import requestIP from "request-ip";
import session, {MemoryStore} from "express-session";
import { errorHandler, requireHTTPS } from "./middlewares/";
import { EndpointNotFound } from "./exceptions";
import v1 from "./v1";

function serverReady(protocol: "http" | "https", port: string | number) : void {
	console.log(`~~~ ${process.env.APP_NAME} | Now listening on port ${port} (${protocol}).`);
}

function startServer() : void {
	// Set HTTPS certificates
	const httpsOptions = {
		key: fs.readFileSync(`${__dirname}/security/cert.key`, "utf-8"),
		cert: fs.readFileSync(`${__dirname}/security/cert.pem`, "utf-8")
	};

	// Initialize servers
	const app: Express = express();
	const server = http.createServer(app);
	const secureServer = https.createServer(httpsOptions, app);
	const port: string | number = process.env.HTTP_PORT || 3000;
	const securePort: string | number = process.env.HTTPS_PORT || 3443;

	// CORS
	app.use(cors({
		origin: process.env.CORS_ALLOWED_ORIGINS?.split(","),
		methods: process.env.CORS_ALLOWED_METHODS?.split(","),
		allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(","),
		credentials: process.env.CORS_CREDENTIALS === "true"
	}));

	// Force HTTPS
	app.use(requireHTTPS);

	// IP
	app.use(requestIP.mw({ attributeName: "clientIp" }));

	// Session system
	// TODO BEFORE PROD: Change the secret for a rotating key stored outside of the repo.
	// TODO BEFORE PROD: Change the MemoryStore for a RedisStore (cf. connect-redis).
	app.use(session({
		name: `${process.env.APP_NAME}:connect.sid`,
		secret: process.env.FOR_DEV_ONLY_SESSION_SECRET!,
		store: new MemoryStore(),
		resave: false,
		saveUninitialized: false,
		cookie: {
			sameSite: false,
			secure: (process.env.NODE_ENV !== "developement"),
			maxAge: (process.env.NODE_ENV === "developement") ? undefined : 604_800_000,
			httpOnly: true
		}
	}));

	// Transform raw and x-www-form-urlencoded to nice JSON
	app.use(bodyParser.json({ limit: "1mb" }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());

	// Add API routes
	const apiPath: string = process.env.API_PREFIX ?? "";
	app.use(`${apiPath}/v1`, v1());

	// Handle 404
	app.use((request: Request) : void => {
		throw new EndpointNotFound(request);
	});

	// Error handling
	app.use(errorHandler.expressLogger);
	app.use(errorHandler.errorForwarder);

	// Start listening
	server.listen(port, () => serverReady("http", port))
		.on("error", (err: Error) : void => {
			console.error(err);
			process.exit(1);
		});

	secureServer.listen(securePort, () => serverReady("https", securePort))
		.on("error", (err: Error) : void => {
			console.error(err);
			process.exit(1);
		});
}

startServer();