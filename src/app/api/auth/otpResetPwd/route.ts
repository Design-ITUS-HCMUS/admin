import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/services/authService';
import CommonService from '@/services/commonService';

export async function POST(req: NextRequest) {
  const { usernameOrEmail } = await req.json();
  const res = await AuthService.sendOtpToResetPassword(usernameOrEmail);
  const { value, body } = CommonService.getDataToSaveInCookie(res.responseBody(), 'OTP');
  const response = NextResponse.json(body, { status: res.status });
  if (value) {
    response.cookies.set({
      name: 'OTP',
      value,
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 5 * 60 * 1000 + 7 * 3600 * 1000), // 5 minutes in GMT+7
    });
  }
  return response;
}