import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

export async function PUT(req: NextRequest) {
    const { id, data } = await req.json();
    const res = await UserService.updateUserInformation(Number(id), data);
    return NextResponse.json(res.responseBody(), { status: res.status });
}