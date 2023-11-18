import {IsDefined, IsInt, IsPositive, IsString, Length, MaxLength} from "class-validator";

export default class Script {
	@IsDefined({ groups: [ "savedScript" ], message: "Identifiant de script invalide." })
	@IsInt({ groups: [ "savedScript" ], message: "Identifiant de script invalide." })
	@IsPositive({ groups: [ "savedScript" ], message: "Identifiant de script invalide." })
	script_id: number;

	@IsDefined({ groups: [ "newScript", "savedScript" ], message: "Identifiant utilisateur invalide." })
	@IsInt({ groups: [ "newScript", "savedScript" ], message: "Identifiant utilisateur invalide." })
	@IsPositive({ groups: [ "newScript", "savedScript" ], message: "Identifiant utilisateur invalide." })
	user_id: number;

	@IsDefined({ groups: [ "newScript", "savedScript" ], message: "Le nom du script est nécessaire." })
	@IsString({ groups: [ "newScript", "savedScript" ], message: "Le nom du script est invalide." })
	@Length(1, 50, { groups: [ "newScript", "savedScript" ], message: "Le nom du script doit faire entre $constraint1 et $constraint2 caractères." })
	name: string;

	@IsDefined({ groups: [ "newScript", "savedScript" ], message: "Le contenu du script est nécessaire." })
	@IsString({ groups: [ "newScript", "savedScript" ], message: "Le contenu du script est invalide." })
	content: string;

	constructor(data: Script) {
		this.script_id = data?.script_id;
		this.user_id = data?.user_id;
		this.name = data?.name;
		this.content = data?.content;
	}
}

export type ScriptInfo = Omit<Script, "content"> & {
	fileSize: number
}