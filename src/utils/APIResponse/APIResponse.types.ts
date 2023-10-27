/// --- Types ----------------------------------------------------------------------------------------------------------
export type JSONResponse = {
	status: number
	message?: string
	error?: string
	[key: string]: unknown
}