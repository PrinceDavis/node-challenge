import config from 'config';
import { Pool } from 'pg';

let db;

export function connect() {
  db = new Pool(config.db);
  return db.connect();
}

export async function query(queryString: string, parameters?: any) {
  if (!db) await connect();

  return db.query(queryString, parameters);
}
