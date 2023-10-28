interface User {
	user_id: number
	username: string
	email: string
}
export default User;

export interface NewUser {
	username: string,
	email: string,
	password1: string,
	password2: string,
}