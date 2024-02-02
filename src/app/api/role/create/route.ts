import RoleService from '@/services/roleService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/role/create:
 *  post:
 *   tags:
 *    - Role
 *   description: Create a new role
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: Moderator
 *          actions:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *            example: [{id: 1}, {id: 2}]
 *          users:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *            example: [{id: 1}, {id: 2}]
 *   responses:
 *    200:
 *      description: Create role successfully.
 *    409:
 *      description: Role already exists.
 *    500:
 *      description: Error message.
 */

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await RoleService.createRole(data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
