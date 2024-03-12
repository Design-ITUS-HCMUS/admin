import authService from '@/services/authService';
import teamService from '@/services/teamService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/team/delete-member:
 *  delete:
 *    tags:
 *      - Team
 *    description: Delete member from team
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
  const res = await teamService.removeMember(Number(payload?.id), teamID, eventID, userID);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
