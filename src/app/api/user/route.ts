import { NextRequest, NextResponse } from 'next/server';

import UserService from '@/services/userService';

/**
 * @swagger
 * /api/user?id={userID}:
 *   get:
 *     tags:
 *       - User
 *     description: Get information of user's account by ID.
 *     parameters:
 *        - in: query
 *          name: id
 *          description: ID of user's account
 *          required: true
 *          schema:
 *            type: integer
 *          example: 2
 *     responses:
 *       200:
 *         description: Retrieved user successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await UserService.getUserById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
