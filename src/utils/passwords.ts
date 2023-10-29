import bcrypt from "bcrypt";

export async function hashPassword(password: string) : Promise<string> {
	return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!, 10));
}

export async function passwordMatchHash(password: string, hash: string) : Promise<boolean> {
	return await bcrypt.compare(password, hash);
}