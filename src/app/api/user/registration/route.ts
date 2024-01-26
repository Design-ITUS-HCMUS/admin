import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';
export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await UserService.createAccount(data);
  return NextResponse.json(res.responeBody(), { status: res.status });
}