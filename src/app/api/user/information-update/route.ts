import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

/**
 * @swagger
 * /api/user/information-update:
 *   put:
 *     tags:
 *       - User
 *     description: update user's information
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
 *               data:
 *                 type: object
 *                 example:
 *                   fullName: "Bui Do Duy Quan"
 *                   studentID: "21127113"
 *
 *     responses:
 *       200:
 *         description: Update user's information successfully.
 *       400:
 *          description: Prohibit to update username or email.
 *       404:
 *         description: Not found the user's account.
 *       500:
 *         description: Error message.
 */

export async function PUT(req: NextRequest) {
    const { id, data } = await req.json();
    const res = await UserService.updateUserInformation(Number(id), data);
    return NextResponse.json(res.responseBody(), { status: res.status });
}