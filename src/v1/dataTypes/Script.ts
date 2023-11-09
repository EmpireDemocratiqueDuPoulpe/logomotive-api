import { IsDefined, IsInt, IsPositive, IsString } from "class-validator";

export default class Script {
	@IsDefined({ groups: [ "savedScript" ], message: "Identifiant de script invalide." })
	@IsInt({ groups: [ "savedScript" ], message: "Identifiant de script invalide." })
	@IsPositive({ groups: [ "savedScript" ], message: "Identifiant de script invalide." })
	script_id: number;

	@IsDefined({ groups: [ "newScript", "savedScript" ], message: "Identifiant utilisateur invalide." })
	@IsInt({ groups: [ "newScript", "savedScript" ], message: "Identifiant utilisateur invalide." })
	@IsPositive({ groups: [ "newScript", "savedScript" ], message: "Identifiant utilisateur invalide." })
	user_id: number;

	@IsDefined({ groups: [ "newScript", "savedScript" ], message: "Le contenu du script est nécessaire." })
	@IsString({ groups: [ "newScript", "savedScript" ], message: "Le contenu du script est invalide." })
	content: string;

	constructor(data: Script) {
		this.script_id = data?.script_id;
		this.user_id = data?.user_id;
		this.content = data?.content;
	}
}