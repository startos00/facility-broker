import { db } from '@/db';
import { archiveEntries } from '@/db/schema';
import { eq, desc, and, ilike, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const country = searchParams.get('country');
  const functionQuery = searchParams.get('function');
  const conversionOnly = searchParams.get('conversion') === 'true';
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
  const offset = parseInt(searchParams.get('offset') || '0');

  const conditions = [];

  if (city) {
    conditions.push(ilike(archiveEntries.city, `%${city}%`));
  }
  if (country) {
    conditions.push(ilike(archiveEntries.country, `%${country}%`));
  }
  if (functionQuery) {
    conditions.push(
      sql`(${ilike(archiveEntries.originalFunction, `%${functionQuery}%`)} OR ${ilike(archiveEntries.currentFunction, `%${functionQuery}%`)})`
    );
  }
  if (conversionOnly) {
    conditions.push(eq(archiveEntries.isConversion, true));
  }

  const results = await db
    .select()
    .from(archiveEntries)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(archiveEntries.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, city, country, latitude, longitude, typologyTags } = body;

  if (!name || !city || !country || latitude == null || longitude == null || !typologyTags?.length) {
    return NextResponse.json(
      { error: 'Missing required fields: name, city, country, latitude, longitude, typologyTags' },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const [entry] = await db
    .insert(archiveEntries)
    .values({
      name,
      city,
      country,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      typologyTags,
      originalFunction: body.originalFunction || null,
      currentFunction: body.currentFunction || null,
      isConversion: body.isConversion ?? false,
      floorAreaSqm: body.floorAreaSqm || null,
      publicPrivateRatio: body.publicPrivateRatio || null,
      floorCount: body.floorCount ? parseInt(body.floorCount) : null,
      yearBuilt: body.yearBuilt ? parseInt(body.yearBuilt) : null,
      yearConverted: body.yearConverted ? parseInt(body.yearConverted) : null,
      digitalFootprintScore: body.digitalFootprintScore ? parseInt(body.digitalFootprintScore) : null,
      activationScore: body.activationScore ? parseInt(body.activationScore) : null,
      annualVisitors: body.annualVisitors ? parseInt(body.annualVisitors) : null,
      photoUrls: body.photoUrls || null,
      sourceUrl: body.sourceUrl || null,
      submittedByIp: ip,
      isVerified: false,
    })
    .returning();

  return NextResponse.json(entry, { status: 201 });
}
