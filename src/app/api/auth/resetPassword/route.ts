import { NextResponse, NextRequest } from 'next/server';
import AuthService from '@/services/authService';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await AuthService.resetPassword(data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}