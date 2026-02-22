import { db } from '@/db';
import { neighborhoodAnalyses } from '@/db/schema';
import { and, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { latitude, longitude, radiusMeters = 800 } = body;

  if (latitude == null || longitude == null) {
    return NextResponse.json(
      { error: 'Missing required fields: latitude, longitude' },
      { status: 400 },
    );
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  // Check for cached analysis within 200m and not expired
  const cached = await db
    .select()
    .from(neighborhoodAnalyses)
    .where(
      and(
        sql`ABS(${neighborhoodAnalyses.centerLatitude} - ${lat}) < 0.002`,
        sql`ABS(${neighborhoodAnalyses.centerLongitude} - ${lng}) < 0.002`,
        sql`${neighborhoodAnalyses.expiresAt} > NOW()`
      )
    )
    .limit(1);

  if (cached.length > 0) {
    return NextResponse.json({ ...cached[0], fromCache: true });
  }

  // Generate new analysis
  // In production, this would call external APIs (isochrone, census, OSMnx)
  // For MVP, we generate a placeholder analysis that can be enriched later
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const [analysis] = await db
    .insert(neighborhoodAnalyses)
    .values({
      centerLatitude: lat,
      centerLongitude: lng,
      radiusMeters: parseInt(String(radiusMeters)),
      // These fields will be populated by the analysis pipeline
      // For now, store the request and mark as pending enrichment
      healthScore: null,
      diagnosisText: 'Analysis pending. Neighborhood data will be populated by the ingestion pipeline.',
      missingAmenities: [],
      expiresAt,
    })
    .returning();

  return NextResponse.json({ ...analysis, fromCache: false }, { status: 201 });
}
