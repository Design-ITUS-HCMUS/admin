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
 *        name:
 *         type: string
 *         example: jcxdc
 *        category:
 *         type: string
 *         example: comic
 *   responses:
 *    200:
 *     description: Create team successfully.
 *    409:
 *     description: Team already exists.
 *    500:
 *     description: Error message.
 */

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await TeamService.createTeam(data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
