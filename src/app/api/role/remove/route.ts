import RoleService from '@/services/roleService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/role/remove:
 *   delete:
 *     tags:
 *       - Role
 *     description: Remove a role
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
 *                 type: integer
 *                 example: 7
 *     responses:
 *       200:
 *         description: Remove role successfully.
 *       403:
 *         description: Prohibit to remove the role.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Error message.
 */

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const res = await RoleService.deleteRole(id);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
