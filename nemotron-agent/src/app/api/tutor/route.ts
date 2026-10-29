import { NextRequest, NextResponse } from 'next/server';
import { tutorReply, detectMistakeWithNano } from '@/lib/nebius';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { subjectName, userMessage } = await req.json();

    if (!userMessage || !subjectName) {
      return NextResponse.json(
        { error: 'Subject name and message are required.' },
        { status: 400 }
      );
    }

    // 1. Detect if the user is struggling with a concept (Nemotron Nano via server env)
    const detectedMistake = await detectMistakeWithNano(
      subjectName,
      userMessage
    );

    // 2. Generate supportive tutor reply (Nemotron Nano / 3 Ultra via server env)
    const reply = await tutorReply(subjectName, userMessage);

    return NextResponse.json({
      success: true,
      reply,
      detectedMistake,
    });
  } catch (error: any) {
    console.error('Tutor API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate tutor reply' },
      { status: 500 }
    );
  }
}
