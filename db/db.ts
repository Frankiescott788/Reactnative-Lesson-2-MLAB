import * as SQlite from "expo-sqlite";

export const db = SQlite.openDatabaseAsync("app_db.db");

export default async function CreateTable () {
    (await db).execAsync(`CREATE TABLE IF NOT EXISTS users (_id TEXT NOT NULL UNIQUE, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)`);
}