import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const res = await UserService.login(data);
    const { data: { token }, ...dataWithoutToken } = res.responseBody();
    const response = NextResponse.json(dataWithoutToken, { status: res.status });
    if (token) {
      response.cookies.set({
        name: 'token',
        value: token,
      });
    }
    return response;
}