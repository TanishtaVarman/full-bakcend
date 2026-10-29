import { NextRequest, NextResponse } from 'next/server';
import { gradeTestCorrections } from '@/lib/nebius';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { subjectName, questions, userAnswers } = await req.json();

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Questions are required' }, { status: 400 });
    }

    const corrections = await gradeTestCorrections(
      subjectName || 'Study Subject',
      questions,
      userAnswers || {}
    );

    return NextResponse.json({
      success: true,
      corrections,
    });
  } catch (error: any) {
    console.error('Grade test API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to grade test' },
      { status: 500 }
    );
  }
}
