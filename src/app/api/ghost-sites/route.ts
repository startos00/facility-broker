import { db } from '@/db';
import { ghostSites } from '@/db/schema';
import { desc, and, ilike, gte, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const country = searchParams.get('country');
  const minProbability = searchParams.get('minProbability');
  const minLotSize = searchParams.get('minLotSize');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
  const offset = parseInt(searchParams.get('offset') || '0');

  const conditions = [];

  if (city) {
    conditions.push(ilike(ghostSites.city, `%${city}%`));
  }
  if (country) {
    conditions.push(ilike(ghostSites.country, `%${country}%`));
  }
  if (minProbability) {
    conditions.push(gte(ghostSites.abandonmentProbability, minProbability));
  }
  if (minLotSize) {
    conditions.push(gte(ghostSites.lotSizeSqm, minLotSize));
  }

  const results = await db
    .select()
    .from(ghostSites)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(sql`${ghostSites.abandonmentProbability}::numeric`))
    .limit(limit)
    .offset(offset);

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { latitude, longitude, abandonmentProbability, city, country } = body;

  if (latitude == null || longitude == null || !abandonmentProbability || !city || !country) {
    return NextResponse.json(
      { error: 'Missing required fields: latitude, longitude, abandonmentProbability, city, country' },
      { status: 400 },
    );
  }

  const [site] = await db
    .insert(ghostSites)
    .values({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      boundary: body.boundary || null,
      abandonmentProbability,
      vacancySince: body.vacancySince || null,
      lastKnownFunction: body.lastKnownFunction || null,
      lotSizeSqm: body.lotSizeSqm || null,
      ownershipType: body.ownershipType || null,
      ndviScore: body.ndviScore || null,
      nightLightScore: body.nightLightScore || null,
      hasBoardedWindows: body.hasBoardedWindows ?? null,
      lastReviewDate: body.lastReviewDate || null,
      osmStatus: body.osmStatus || null,
      address: body.address || null,
      city,
      country,
    })
    .returning();

  return NextResponse.json(site, { status: 201 });
}
