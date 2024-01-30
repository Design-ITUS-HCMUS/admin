import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

export async function DELETE(req: NextRequest) {
    const { ids } = await req.json();
    const res = await UserService.deleteUsers(ids);
    return NextResponse.json(res.responseBody(), { status: res.status });
}