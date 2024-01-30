import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await UserService.getUserById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
