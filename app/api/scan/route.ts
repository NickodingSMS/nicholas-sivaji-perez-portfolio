import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { target, cookies } = body;

    if (!target) {
      return NextResponse.json({ detail: 'Target is required' }, { status: 400 });
    }

    const scan_id = crypto.randomUUID().slice(0, 12);

    return NextResponse.json({
      scan_id,
      status: 'queued',
      target,
      note: 'Scan queued. The VulnScan Pro backend processes scans locally. See /security/download for setup.',
    });
  } catch {
    return NextResponse.json({ detail: 'Invalid request body' }, { status: 400 });
  }
}
