import { NextRequest, NextResponse } from 'next/server';

import TeamService from '@/services/teamService';

/**
 * @swagger
 * /api/team/create:
 *  post:
 *   tags:
 *    - Team
 *   description: Create a new team
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        userID:
 *         type: integer
 *         example: 3
 *        eventID:
 *         type: integer
 *         example: 2
 *        data:
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *            example: jcxdc
 *          category:
 *            type: string
 *            example: comic
 *   responses:
 *    200:
 *     description: Create team successfully.
 *    401:
 *     description: Unauthorized.
 *    403:
 *     description: Forbidden.
 *    409:
 *     description: Team already exists.
 *    500:
 *     description: Error message.
 */

export async function POST(req: NextRequest) {
  const { userID, data, eventID } = await req.json();
  const token = req.cookies.get('token');
  const team = await TeamService.createTeam(data, token);
  if (!team.data) {
    return NextResponse.json(team.responseBody(), { status: team.status });
  }
  const res = await TeamService.joinTeam(userID, team.data.id, eventID);
  if (!res.data) {
    await TeamService.deleteTeam(team.data.id);
  }
  return NextResponse.json(res.responseBody(), { status: res.status });
}
