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