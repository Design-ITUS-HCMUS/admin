import RoleService from '@/services/roleService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/role?id={roleID}:
 *   get:
 *     tags:
 *       - Role
 *     description: Get information of role by ID.
 *     parameters:
 *        - in: query
 *          name: id
 *          description: ID of role
 *          required: true
 *          schema:
 *            type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Retrieved role successfully.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await RoleService.getRoleById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
