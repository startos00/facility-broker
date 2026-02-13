import { db } from '@/db';
import { properties } from '@/db/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + 'cloudtoterra-salt-v1');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function GET() {
  const results = await db
    .select()
    .from(properties)
    .where(eq(properties.isVisible, true))
    .orderBy(desc(properties.createdAt));

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Honeypot check — bots fill hidden fields
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const { nodeName, latitude, longitude, typology, priceEstimate, notes, photoUrl } = body;

  // Validate required fields
  if (!nodeName || latitude == null || longitude == null || !typology) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const validTypologies = ['house', 'land', 'commercial', 'industrial'];
  if (!validTypologies.includes(typology)) {
    return NextResponse.json({ error: 'Invalid typology' }, { status: 400 });
  }

  // Rate limiting by IP hash
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const ipHash = await hashIP(ip);

  const oneMinuteAgo = new Date(Date.now() - 60_000);
  const recentSubmissions = await db
    .select({ id: properties.id })
    .from(properties)
    .where(and(eq(properties.ipHash, ipHash), gte(properties.createdAt, oneMinuteAgo)));

  if (recentSubmissions.length > 0) {
    return NextResponse.json(
      { error: 'Rate limited. Wait a moment before submitting again.' },
      { status: 429 },
    );
  }

  const [newProperty] = await db
    .insert(properties)
    .values({
      nodeName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      typology,
      priceEstimate: priceEstimate || null,
      notes: notes || null,
      photoUrl: photoUrl || null,
      ipHash,
    })
    .returning();

  return NextResponse.json(newProperty, { status: 201 });
}
