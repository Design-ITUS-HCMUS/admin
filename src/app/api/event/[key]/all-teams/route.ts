import { NextRequest, NextResponse } from 'next/server';

import TeamService from '@/services/teamService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{key}/all-teams:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all teams by event key.
 *    parameters:
 *     - in: path
 *       name: key
 *       description: key of event
 *       required: true
 *       schema:
 *        type: integer
 *       example: 2
 *    responses:
 *      200:
 *        description: Get all teams successfully.
 *      404:
 *        description: Event or teams not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const key = getParams(req, -2);
  const res = await TeamService.getAllTeamsByEventKey(key as string);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
