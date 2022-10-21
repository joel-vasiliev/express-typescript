import mysql from "mysql2/promise";

export async function connect(db: mysql.Connection | null) {
  if (db) {
    return db;
  }

  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
  });

  console.log("Connected on database");

  return connection;
}
