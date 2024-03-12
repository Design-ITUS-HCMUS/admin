import authService from '@/services/authService';
import teamService from '@/services/teamService';
import { NextRequest, NextResponse } from 'next/server';

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
 *      401:
 *        description: Unauthorized.
 *      404:
 *        description: Team not found.
 *      500:
 *        description: Error message.
 */

export async function POST(req: NextRequest) {
  const { inviteCode, eventID } = await req.json();
  const payload = await authService.getDataFromToken(req.cookies.get('token'));
  if (!payload) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  const res = await teamService.joinTeam(Number(payload.id), inviteCode, eventID);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
