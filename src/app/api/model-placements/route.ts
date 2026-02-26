import { db } from '@/db';
import { modelPlacements } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const modelId = request.nextUrl.searchParams.get('modelId');
  if (!modelId) {
    return NextResponse.json({ error: 'modelId is required' }, { status: 400 });
  }

  const [placement] = await db
    .select()
    .from(modelPlacements)
    .where(eq(modelPlacements.modelId, modelId))
    .limit(1);

  if (!placement) {
    return NextResponse.json(null);
  }

  return NextResponse.json(placement);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { modelId, longitude, latitude, bearing } = body;

  if (!modelId || longitude == null || latitude == null) {
    return NextResponse.json({ error: 'modelId, longitude, latitude are required' }, { status: 400 });
  }

  const [result] = await db
    .insert(modelPlacements)
    .values({
      modelId,
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      bearing: parseFloat(bearing ?? 0),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: modelPlacements.modelId,
      set: {
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        bearing: parseFloat(bearing ?? 0),
        updatedAt: new Date(),
      },
    })
    .returning();

  return NextResponse.json(result);
}
