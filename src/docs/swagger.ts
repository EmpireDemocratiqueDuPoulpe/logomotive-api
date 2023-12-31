import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.OAS3Options = {
	swaggerDefinition: {
		openapi: "3.1.0",
		info: {
			title: "Logomotive API",
			version: "1.0.0",
			description: "Serveur API du site web Logomotive."
		},
		servers: [
			{ url: "http://localhost:8080" }
		],
		components: {
			securitySchemes: {
				cookieAuth: {
					type: "apiKey",
					in: "cookie",
					name: `${process.env.APP_NAME}:connect.sid`
				}
			}
		}
	},
	apis: [ "**/*.ts" ]
};

const specifications: object = swaggerJSDoc(options);
export default specifications;