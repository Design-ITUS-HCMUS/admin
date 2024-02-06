import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

/**
 * @swagger
 * /api/user/all-users:
 *   get:
 *     tags:
 *       - User
 *     description: Get all users' account
 *     responses:
 *       200:
 *         description: Getting list of accounts successfully.
 *       500:
 *         description: Error message.
 */

export async function GET(req: NextRequest) {
  const res = await UserService.getAllUsers();
  return NextResponse.json(res.responseBody(), { status: res.status });
}
