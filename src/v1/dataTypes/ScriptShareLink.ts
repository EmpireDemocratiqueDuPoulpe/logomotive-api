import { IsDefined, IsInt, IsPositive, IsUUID } from "class-validator";

export default class ScriptShareLink {
	@IsDefined({ groups: [ "createdLink" ], message: "Identifiant de lien invalide." })
	@IsUUID(4, { groups: [ "createdLink" ], message: "Identifiant de lien invalide." })
	link_id: string;

	@IsDefined({ groups: [ "createdLink", "newLink" ], message: "Identifiant de script invalide." })
	@IsInt({ groups: [ "createdLink", "newLink" ], message: "Identifiant de script invalide." })
	@IsPositive({ groups: [ "createdLink", "newLink" ], message: "Identifiant de script invalide." })
	script_id: number;

	constructor(data: ScriptShareLink) {
		this.link_id = data?.link_id;
		this.script_id = data?.script_id;
	}
}

/**
 * @swagger
 * components:
 *      schemas:
 *          ScriptShareLink:
 *              type: object
 *              required:
 *                  - link_id
 *                  - script_id
 *              properties:
 *                  link_id:
 *                      type: number
 *                      description: The auto-generated link id.
 *                  script_id:
 *                      type: number
 *                      description: The auto-generated script id.
 *              example:
 *                  link_id: a1475b58-532b-4c14-969d-78483190a8bd
 *                  script_id: 1
 *          NewScriptShareLink:
 *              type: object
 *              required:
 *                  - script_id
 *              properties:
 *                  script_id:
 *                      type: number
 *                      description: The auto-generated script id.
 *              example:
 *                  script_id: 1
 */