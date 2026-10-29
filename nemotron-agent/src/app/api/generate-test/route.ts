import { NextRequest, NextResponse } from 'next/server';
import { generateTestQuestions } from '@/lib/nebius';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { subjectName, mistakes } = await req.json();

    const questions = await generateTestQuestions(
      subjectName || 'Study Subject',
      mistakes || []
    );

    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error: any) {
    console.error('Generate test API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate test' },
      { status: 500 }
    );
  }
}
