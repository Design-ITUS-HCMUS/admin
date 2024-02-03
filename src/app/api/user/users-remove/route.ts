import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

/**
 * @swagger
 * /api/user/users-remove:
 *   delete:
 *     tags:
 *       - User
 *     description: remove users' account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                  type: array
 *                  items:
 *                      type: integer
 *                  example: [1, 2, 3]
 *
 *     responses:
 *       200:
 *         description: Delete action finish successfully
 *       500:
 *         description: Error message.
 */

export async function DELETE(req: NextRequest) {
    const { ids } = await req.json();
    const res = await UserService.deleteUsers(ids);
    return NextResponse.json(res.responseBody(), { status: res.status });
}