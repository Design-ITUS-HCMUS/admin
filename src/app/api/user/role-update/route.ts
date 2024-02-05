import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

/**
 * @swagger
 * /api/user/role-update:
 *   patch:
 *     tags:
 *       - User
 *     description: update user's role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                  type: integer
 *                  example: 1
 *               newRoleID:
 *                 type: integer
 *                 example: 2
 *
 *     responses:
 *       200:
 *         description: Update user's role successfully.
 *       404:
 *         description: Not found the user's account.
 *       500:
 *         description: Error message.
 */

export async function PATCH(req: NextRequest) {
  const { id, newRoleID } = await req.json();
  const res = await UserService.updateRoleUser(Number(id), newRoleID);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
