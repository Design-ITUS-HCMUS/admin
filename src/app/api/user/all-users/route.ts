import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

export async function GET(req: NextRequest) {
  const res = await UserService.getAllUsers();
  return NextResponse.json(res.responseBody(), { status: res.status });
}