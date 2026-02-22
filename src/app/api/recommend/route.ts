import { db } from '@/db';
import { reuseRecommendations, ghostSites, neighborhoodAnalyses, archiveEntries } from '@/db/schema';
import { eq, sql, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { ghostSiteId } = body;

  if (!ghostSiteId) {
    return NextResponse.json(
      { error: 'Missing required field: ghostSiteId' },
      { status: 400 },
    );
  }

  // Fetch the ghost site
  const [site] = await db
    .select()
    .from(ghostSites)
    .where(eq(ghostSites.id, ghostSiteId))
    .limit(1);

  if (!site) {
    return NextResponse.json({ error: 'Ghost site not found' }, { status: 404 });
  }

  // Check for existing neighborhood analysis near this site
  const [analysis] = await db
    .select()
    .from(neighborhoodAnalyses)
    .where(
      sql`ABS(${neighborhoodAnalyses.centerLatitude} - ${site.latitude}) < 0.002
          AND ABS(${neighborhoodAnalyses.centerLongitude} - ${site.longitude}) < 0.002
          AND ${neighborhoodAnalyses.expiresAt} > NOW()`
    )
    .limit(1);

  // Search archive for similar building conversions
  const matchingCaseStudies = await db
    .select()
    .from(archiveEntries)
    .where(eq(archiveEntries.isConversion, true))
    .orderBy(desc(archiveEntries.activationScore))
    .limit(3);

  // Generate recommendation
  // In production, this would use AI/ML to correlate context + archive
  // For MVP, provide a template-based recommendation
  const suggestedFunction = site.lastKnownFunction
    ? `Adaptive reuse of former ${site.lastKnownFunction}`
    : 'Community space conversion';

  const caseStudyIds = matchingCaseStudies.map((cs) => cs.id);

  const rationale = analysis?.diagnosisText
    ? `Based on neighborhood analysis: ${analysis.diagnosisText} Matched ${matchingCaseStudies.length} global precedent(s).`
    : `${matchingCaseStudies.length} global case studies matched for adaptive reuse. Run neighborhood analysis for a more specific recommendation.`;

  const [recommendation] = await db
    .insert(reuseRecommendations)
    .values({
      ghostSiteId,
      analysisId: analysis?.id || null,
      suggestedFunction,
      confidenceScore: matchingCaseStudies.length > 0 ? '0.65' : '0.30',
      rationale,
      caseStudyIds,
    })
    .returning();

  return NextResponse.json({
    recommendation,
    caseStudies: matchingCaseStudies,
    neighborhoodAnalysis: analysis || null,
  }, { status: 201 });
}
