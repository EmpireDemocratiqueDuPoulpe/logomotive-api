import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
	swaggerDefinition: {
		openapi: "3.1.0",
		info: {
			title: "Logomotive API",
			version: "1.0.0",
			description: "Serveur API du site web Logomotive."
		},
		servers: [
			{ url: "http://localhost:8080" }
		]
	},
	apis: [ "**/*.ts" ]
};

const specifications: object = swaggerJSDoc(options);
export default specifications;