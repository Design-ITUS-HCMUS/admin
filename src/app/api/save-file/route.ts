import { NextRequest, NextResponse } from 'next/server';
import bucketService from '@/services/bucketService';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const files = body.getAll('files');
  const response = await bucketService.saveItems(files);

  return NextResponse.json(response.responseBody(), { status: response.status });
}
