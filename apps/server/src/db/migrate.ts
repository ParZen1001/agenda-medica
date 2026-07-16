import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log("Aplicando migraciones...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migraciones aplicadas correctamente.");

  await pool.end();
}

main().catch((error) => {
  console.error("Error aplicando migraciones:", error);
  process.exit(1);
});
