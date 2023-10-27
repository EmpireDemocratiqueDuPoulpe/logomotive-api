/// --- Types ----------------------------------------------------------------------------------------------------------
export type LoggerOptions = {
	prefix?: string
	separator?: string
	colors?: boolean
}

export type MessageOptions = {
	withTime?: boolean
	ip?: string
	params?: string
	isSubLevel?: boolean
}