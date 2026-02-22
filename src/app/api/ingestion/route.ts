import { db } from '@/db';
import { rawIngestion } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  // Pipeline health dashboard
  const [stats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      staged: sql<number>`count(*) filter (where ${rawIngestion.status} = 'staged')::int`,
      verified: sql<number>`count(*) filter (where ${rawIngestion.status} = 'verified')::int`,
      rejected: sql<number>`count(*) filter (where ${rawIngestion.status} = 'rejected')::int`,
      duplicate: sql<number>`count(*) filter (where ${rawIngestion.status} = 'duplicate')::int`,
    })
    .from(rawIngestion);

  // Recent entries
  const recent = await db
    .select()
    .from(rawIngestion)
    .orderBy(desc(rawIngestion.ingestedAt))
    .limit(10);

  return NextResponse.json({ stats, recent });
}
