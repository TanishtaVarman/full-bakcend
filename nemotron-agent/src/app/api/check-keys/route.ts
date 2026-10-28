import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const hasNebius = Boolean(process.env.NEBIUS_API_KEY);
  const hasTavily = Boolean(process.env.TAVILY_API_KEY);

  return NextResponse.json({
    status: 'ok',
    nebiusConfigured: hasNebius,
    tavilyConfigured: hasTavily,
    backendReady: true,
    securityModel: 'server-side-environment-variables',
  });
}
