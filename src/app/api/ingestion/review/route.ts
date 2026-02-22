import { db } from '@/db';
import { rawIngestion, archiveEntries, ghostSites } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// List entries pending review
export async function GET() {
  const pending = await db
    .select()
    .from(rawIngestion)
    .where(eq(rawIngestion.status, 'staged'))
    .orderBy(desc(rawIngestion.ingestedAt))
    .limit(50);

  return NextResponse.json(pending);
}

// Approve or reject a staged entry
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, action } = body;

  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json(
      { error: 'Missing required fields: id, action (approve|reject)' },
      { status: 400 },
    );
  }

  // Fetch the raw entry
  const [entry] = await db
    .select()
    .from(rawIngestion)
    .where(eq(rawIngestion.id, id))
    .limit(1);

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  if (entry.status !== 'staged') {
    return NextResponse.json({ error: 'Entry already reviewed' }, { status: 400 });
  }

  if (action === 'reject') {
    await db
      .update(rawIngestion)
      .set({ status: 'rejected', reviewedAt: new Date() })
      .where(eq(rawIngestion.id, id));

    return NextResponse.json({ success: true, status: 'rejected' });
  }

  // Approve: promote to archive_entries or ghost_sites based on raw data
  const data = entry.rawData as Record<string, unknown>;
  let promotedTo: string | null = null;

  if (data.abandonmentProbability) {
    // Promote to ghost_sites
    const [site] = await db
      .insert(ghostSites)
      .values({
        latitude: entry.latitude!,
        longitude: entry.longitude!,
        abandonmentProbability: String(data.abandonmentProbability),
        lastKnownFunction: (data.lastKnownFunction as string) || null,
        address: (data.address as string) || null,
        city: (data.city as string) || 'Unknown',
        country: (data.country as string) || 'Unknown',
        osmStatus: (data.osmStatus as string) || null,
        isVerified: true,
      })
      .returning();
    promotedTo = site.id;
  } else {
    // Promote to archive_entries
    const [archived] = await db
      .insert(archiveEntries)
      .values({
        name: entry.name || 'Unnamed',
        latitude: entry.latitude!,
        longitude: entry.longitude!,
        city: (data.city as string) || 'Unknown',
        country: (data.country as string) || 'Unknown',
        typologyTags: (data.typologyTags as string[]) || ['Unclassified'],
        originalFunction: (data.originalFunction as string) || null,
        currentFunction: (data.currentFunction as string) || null,
        isConversion: (data.isConversion as boolean) ?? false,
        sourceUrl: (data.sourceUrl as string) || null,
        isVerified: true,
      })
      .returning();
    promotedTo = archived.id;
  }

  await db
    .update(rawIngestion)
    .set({
      status: 'verified',
      promotedTo,
      reviewedAt: new Date(),
    })
    .where(eq(rawIngestion.id, id));

  return NextResponse.json({ success: true, status: 'verified', promotedTo });
}
