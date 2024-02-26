import authService from '@/services/authService';
import teamService from '@/services/teamService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/team/remove-member:
 *  delete:
 *    tags:
 *      - Team
 *    description: Remove member from team
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userID:
 *                type: integer
 *                example: 3
 *              teamID:
 *                type: integer
 *                example: 1
 *              eventID:
 *                type: integer
 *                example: 2
 *    responses:
 *      200:
 *        description: Remove member from team successfully.
 *      401:
 *        description: Unauthorized.
 *      403:
 *        description: Forbidden.
 *      404:
 *        description: Member not found.
 *      500:
 *        description: Error message.
 */

export async function DELETE(req: NextRequest) {
  const { userID, teamID, eventID } = await req.json();
  const payload = await authService.getDataFromToken(req.cookies.get('token'));
  if (!payload) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  const res = await teamService.deleteMember(teamID, Number(payload.id), eventID, userID);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
