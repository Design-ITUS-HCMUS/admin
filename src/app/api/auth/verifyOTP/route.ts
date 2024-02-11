import { NextRequest, NextResponse } from 'next/server';

import AuthService from '@/services/authService';

/**
 * @swagger
 * /api/auth/verifyOTP:
 *   post:
 *     tags:
 *       - Authentication
 *     description:  Verify OTP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OTP:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Valid OTP.
 *       403:
 *         description: Invalid OTP.
 *       500:
 *         description: Error message.
 */
export async function POST(req: NextRequest) {
  const sentOTP = decodeURIComponent(req.cookies.get('OTP')?.value || '');
  const { OTP } = await req.json();
  const res = await AuthService.verifyOTP(OTP, sentOTP);
  const response = NextResponse.json(res.responseBody(), { status: res.status });
  if (res.status === 200) {
    response.cookies.delete('OTP');
  }
  return response;
}
