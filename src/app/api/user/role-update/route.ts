import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

export async function PATCH(req: NextRequest) {
    const { id, newRoleID } = await req.json();
    const res = await UserService.updateRoleUser(Number(id), newRoleID);
    return NextResponse.json(res.responseBody(), { status: res.status });
}