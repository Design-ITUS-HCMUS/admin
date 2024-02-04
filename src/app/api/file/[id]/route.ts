import { NextRequest, NextResponse } from 'next/server';
import bucketService from '@/services/bucketService';
import getParams from '@/utils/getParams';

export async function GET(req: NextRequest) {
  try {
    const id = Number(getParams(req));
    const response = await bucketService.getFile(id);
    
    if (!response.success) 
      throw new Error(response.responseBody().message);

    return NextResponse.redirect(response.data);
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const ids = Number(getParams(req));
    const response = await bucketService.deleteFile(ids);
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
