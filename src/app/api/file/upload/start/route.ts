import { NextRequest, NextResponse } from 'next/server';

import bucketService from '@/services/bucketService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = req.cookies.get('token');
    const response = await bucketService.startMultipartUpload(body, token);
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
