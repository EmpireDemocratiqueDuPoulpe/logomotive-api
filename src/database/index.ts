import { Pool, QueryResult, QueryResultRow } from "pg";
import Logger from "../utils/Logger/Logger";

const pool: Pool = new Pool({
	connectionString: process.env.DATABASE_CONNECTION,
	application_name: process.env.APP_NAME, // The name of the application that created this Client instance
	connectionTimeoutMillis: 0,             // number of milliseconds to wait before timing out when connecting a new client
	idleTimeoutMillis: 10000,               // number of milliseconds a client must sit idle in the pool and not be checked out
	max: 10,                                // maximum number of clients the pool should contain
	log: (...messages: unknown[]) : void => {
		for (const message of messages) {
			logger.log(("" + message));
		}
	}
});
const logger: Logger = new Logger({ prefix: "[DB] ⚡" });

async function query<R extends QueryResultRow>(query: string, params: unknown[] = []) : Promise<QueryResult<R>> {
	const startTime: number = Date.now();
	const response: QueryResult<R> = await pool.query(query, params);
	const duration: number = Date.now() - startTime;

	logger.log("Executed query.", { params: {query: `"${query}"`, duration, rows: response.rowCount} });
	return response;
}

export default { query };