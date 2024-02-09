import { NextRequest, NextResponse } from 'next/server';

import UserService from '@/services/userService';

/**
 * @swagger
 * /api/user/registration:
 *   post:
 *     tags:
 *       - User
 *     description: Create account for user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Design_ITUS
 *               email:
 *                 type: string
 *                 example: DesignITUS@gmail.com
 *               password:
 *                  type: string
 *                  example: 12345678
 *     responses:
 *       200:
 *         description: Creating account successfully.
 *       409:
 *         description: Existed username or email.
 *       500:
 *         description: Error message.
 */

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await UserService.createUser(data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
