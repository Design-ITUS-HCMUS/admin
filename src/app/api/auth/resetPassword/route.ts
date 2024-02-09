import { NextRequest, NextResponse } from 'next/server';

import AuthService from '@/services/authService';

/**
 * @swagger
 * /api/auth/resetPassword:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Update new password for user's account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 example: Design_ITUS
 *               password:
 *                  type: string
 *                  example: 12345678
 *     responses:
 *       200:
 *         description: Change password successfully.
 *       403:
 *         description: New password must be different from old password.
 *       500:
 *         description: Error message.
 */
export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await AuthService.resetPassword(data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
