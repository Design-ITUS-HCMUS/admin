import RoleService from '@/services/roleService';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/role/all-roles:
 *  get:
 *    tags:
 *      - Role
 *    description: Get all roles
 *    responses:
 *      200:
 *        description: Get all roles successfully.
 *      500:
 *        description: Error message.
 */

export async function GET() {
  const res = await RoleService.getAllRoles();
  return NextResponse.json(res.responseBody(), { status: res.status });
}
