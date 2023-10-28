/// --- Types ----------------------------------------------------------------------------------------------------------
export type LoggerOptions = {
	prefix?: string
	separator?: string
	colors?: boolean
}

export type MessageOptions = {
	withTime?: boolean
	ip?: string
	params?: { [key: string]: unknown }
	isSubLevel?: boolean
}