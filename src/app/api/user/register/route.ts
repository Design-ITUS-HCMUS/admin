import { NextResponse } from 'next/server';
import UserService from '@/services/userService';
export async function POST(req: Request) {
  const data = await req.json();
  const res = await UserService.createAccount(data);
  return NextResponse.json(res.responeBody(), { status: res.status });
}