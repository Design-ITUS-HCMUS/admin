import { NextRequest, NextResponse } from 'next/server';
import TeamService from '@/services/teamService';

/**
 * @swagger
 * /api/team/all-members?id={id}:
 *  get:
 *    tags:
 *      - Team
 *    description: Get all members by team id.
 *    parameters:
 *     - in: query
 *       name: id
 *       description: id of team
 *       required: true
 *       schema:
 *        type: integer
 *       example: 1
 *    responses:
 *      200:
 *        description: Get all members successfully.
 *      404:
 *        description: Team or members not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await TeamService.getAllMembersByTeamId(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
