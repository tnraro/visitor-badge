import { env } from "bun";
import { Database } from "bun:sqlite";

export const db = new Database(env.DB_NAME, {
  strict: true,
});
db.run("PRAGMA journal_mode = WAL");
db.run(`create table if not exists users (
  uid text primary key,
  count integer not null default 0
)`);
