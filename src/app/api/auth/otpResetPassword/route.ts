import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/services/authService';
import CommonService from '@/services/commonService';

/**
 * @swagger
 * /api/auth/otpResetPassword:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Send OTP to user's email to authenticate user to reset password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usernameOrEmail
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 example: bddquan@gmail.com
 *     responses:
 *       200:
 *         description: Send otp successfully.The otp is returned in a cookie named `OTP` which expired in 5 minutes. You need to include this cookie in `verifyOTP` requests.
 *       403:
 *          description: Invalid username or email.
 *       500:
 *         description: Error message.
 */
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
