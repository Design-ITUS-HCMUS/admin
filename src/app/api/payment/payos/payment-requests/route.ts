import { NextRequest, NextResponse } from 'next/server';
import payOSPaymentService from '@/services/payOSPaymentService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await payOSPaymentService.createPaymentLink(body);
    if (response === undefined) throw new Error("Empty response");
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}