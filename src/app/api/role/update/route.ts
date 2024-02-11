import { NextRequest, NextResponse } from 'next/server';

import RoleService from '@/services/roleService';

/**
 * @swagger
 * /api/role/update:
 *  put:
 *   tags:
 *      - Role
 *   description: Update a role
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *               type: object
 *               required:
 *                - id
 *                - data
 *               properties:
 *                  id:
 *                     type: integer
 *                     example: 7
 *                  data:
 *                    type: object
 *                    example:
 *                      name: Moderator
 *                      actions: [{id: 1}, {id: 2}]
 *                      users: [{id: 3}, {id: 2}]
 *   responses:
 *      200:
 *          description: Update role successfully.
 *      404:
 *          description: Role not found.
 *      500:
 *          description: Error message.
 */

export async function PUT(req: NextRequest) {
  const { id, data } = await req.json();
  const res = await RoleService.updateRole(Number(id), data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
