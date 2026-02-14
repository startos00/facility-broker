import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);
  const migrationFile = process.argv[2] || 'drizzle/0001_v2_nodes.sql';
  const migration = readFileSync(migrationFile, 'utf-8');

  // Split by semicolons and run each statement
  const statements = migration
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Running ${statements.length} statements...`);
  for (const stmt of statements) {
    console.log(`  → ${stmt.slice(0, 60)}...`);
    await sql.query(stmt);
  }
  console.log('Migration complete.');
}

migrate().catch(console.error);
