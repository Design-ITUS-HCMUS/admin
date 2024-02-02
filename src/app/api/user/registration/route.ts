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
 *               fullName:
 *                 type: string
 *                 example: Nguyen Van A
 *               email:
 *                 type: string
 *                 example: DesignITUS@gmail.com
 *               password:
 *                  type: string
 *                  example: 12345678
 *               studentID:
 *                  type: string
 *                  example: 21127141
 *               school:
 *                  type: string
 *                  example: Đaị học Khoa học Tự Nhiên - Đaị học quốc gia Hồ Chí Minh
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
