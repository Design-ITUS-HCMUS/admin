import { NextRequest, NextResponse } from 'next/server';

import RoleService from '@/services/roleService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{key}/all-roles:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all roles by event key.
 *    parameters:
 *     - in: path
 *       name: key
 *       description: key of event
 *       required: true
 *       schema:
 *        type: string
 *       example: OS8
 *    responses:
 *      200:
 *        description: Get all roles successfully.
 *      404:
 *        description: Event or roles not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const key = getParams(req, -2);
  const res = await RoleService.getRolesByEventKey(key as string);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
