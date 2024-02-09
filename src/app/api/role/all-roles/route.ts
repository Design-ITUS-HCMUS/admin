import { NextRequest, NextResponse } from 'next/server';

import RoleService from '@/services/roleService';

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

export async function GET(req: NextRequest) {
  const res = await RoleService.getAllRoles();
  return NextResponse.json(res.responseBody(), { status: res.status });
}
