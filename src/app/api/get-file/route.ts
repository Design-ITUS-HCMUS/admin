import { NextRequest, NextResponse } from 'next/server';
import bucketService from '@/services/bucketService';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ids = body.ids;
  const response = await bucketService.getFiles(ids);

  return NextResponse.json(response.responseBody(), { status: response.status });
}
