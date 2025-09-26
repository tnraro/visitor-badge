import { db } from "../db";

const createQuery = db.query(
  "insert into users (uid) values ($uid) on conflict (uid) do update set count = count + 1 returning count"
);
export function put(uid: string) {
  return createQuery.get({
    uid,
  }) as { count: number };
}

const selectQuery = db.query("select uid, count from users where uid = $uid");
export function get(uid: string) {
  return selectQuery.get({
    uid,
  }) as { uid: string; count: number };
}
