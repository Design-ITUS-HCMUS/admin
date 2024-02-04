import { NextRequest, NextResponse } from 'next/server';
import TeamService from '@/services/teamService';

/**
 * @swagger
 * /api/team?id={teamID}:
 *  get:
 *    tags:
 *      - Team
 *    description: Get a team by ID.
 *    parameters:
 *     - in: query
 *       name: id
 *       description: ID of team
 *       required: true
 *       schema:
 *        type: integer
 *       example: 1
 *    responses:
 *      200:
 *        description: Get team successfully.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await TeamService.getTeamById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
