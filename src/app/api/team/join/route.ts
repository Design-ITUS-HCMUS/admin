import { NextRequest, NextResponse } from 'next/server';

import authService from '@/services/authService';
import teamService from '@/services/teamService';

/**
 * @swagger
 * /api/team/join:
 *  post:
 *    tags:
 *      - Team
 *    description: Join a team
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              inviteCode:
 *                type: string
 *                example: 123456
 *              eventID:
 *                type: integer
 *                example: 2
 *    responses:
 *      200:
 *        description: Join team successfully.
 *      404:
 *        description: Team not found.
 *      500:
 *        description: Error message.
 */

export async function POST(req: NextRequest) {
  const { inviteCode, eventID } = await req.json();
  const payload = await authService.getDataFromToken(req.cookies.get('token'));
  const res = await teamService.joinTeam(Number(payload?.id), inviteCode, eventID);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
