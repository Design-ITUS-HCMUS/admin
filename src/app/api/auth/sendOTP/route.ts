import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/services/authService';

/**
 * @swagger
 * /api/auth/sendOTP:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Send OTP to user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: bddquan@gmail.com
 *     responses:
 *       200:
 *         description: Send otp successfully.The otp is returned in a cookie named `OTP` which expired in 5 minutes. You need to include this cookie in `verifyOTP` requests.
 *       500:
 *         description: Error message.
 */
export async function POST(req: NextRequest) {
    const { email } = await req.json();
    const res = await AuthService.sendOTP(email);
    const body = res.responseBody();
    const OTP = body.data.OTP;
    delete body.data.OTP;
    const response = NextResponse.json(body, { status: res.status });
    if (OTP) {
        response.cookies.set({
            name: 'OTP',
            value: OTP,
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 5 * 60 * 1000 + 7 * 3600 * 1000), // 5 minutes in GMT+7
        });
    }
    return response;
}