import { db } from '@/db';
import { nodes } from '@/db/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + 'cloudtoterra-salt-v2');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function GET() {
  const results = await db
    .select()
    .from(nodes)
    .where(eq(nodes.isVisible, true))
    .orderBy(desc(nodes.createdAt));

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const { nodeName, typology, latitude, longitude } = body;

  if (!nodeName || !typology || latitude == null || longitude == null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const validTypologies = ['society', 'asset', 'facility'];
  if (!validTypologies.includes(typology)) {
    return NextResponse.json({ error: 'Invalid typology' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const ipHash = await hashIP(ip);

  const oneMinuteAgo = new Date(Date.now() - 60_000);
  const recentSubmissions = await db
    .select({ id: nodes.id })
    .from(nodes)
    .where(and(eq(nodes.ipHash, ipHash), gte(nodes.createdAt, oneMinuteAgo)));

  if (recentSubmissions.length > 0) {
    return NextResponse.json(
      { error: 'Rate limited. Wait a moment before submitting again.' },
      { status: 429 },
    );
  }

  const [newNode] = await db
    .insert(nodes)
    .values({
      nodeName,
      typology,
      description: body.description || null,
      photoUrl: body.photoUrl || null,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      boundary: body.boundary || null,
      population: body.population ? parseInt(body.population) : null,
      vibe: body.vibe || null,
      nextEventDate: body.nextEventDate || null,
      acreage: body.acreage || null,
      price: body.price ? parseInt(body.price) : null,
      zoning: body.zoning || null,
      editability: body.editability ? parseInt(body.editability) : null,
      isDistressed: body.isDistressed ?? false,
      capacityPax: body.capacityPax ? parseInt(body.capacityPax) : null,
      internetSpeed: body.internetSpeed || null,
      availability: body.availability || null,
      isFreeOffer: body.isFreeOffer ?? false,
      seekingCapital: body.seekingCapital ?? false,
      capitalAmount: body.capitalAmount || null,
      ipHash,
    })
    .returning();

  return NextResponse.json(newNode, { status: 201 });
}
