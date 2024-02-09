import { NextRequest, NextResponse } from 'next/server';
import getParams from '@/utils/getParams';
import TeamService from '@/services/teamService';

/**
 * @swagger
 * /api/event/{id}/all-teams:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all teams by event ID.
 *    parameters:
 *     - in: path
 *       name: id
 *       description: ID of event
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
  const id = getParams(req, -2);
  const res = await TeamService.getAllTeamsByEventID(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
