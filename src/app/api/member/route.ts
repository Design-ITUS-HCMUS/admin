import { NextRequest, NextResponse } from 'next/server';

import MemberService from '@/services/memberService';

/**
 * @swagger
 * /api/member?eventID={eventID}&userID={userID}:
 *   get:
 *     tags:
 *       - Organizer
 *     description: Get event info of organizer.
 *     parameters:
 *      - in: query
 *        name: eventID
 *        description: ID of event
 *        required: true
 *        schema:
 *          type: integer
 *        example: 1
 *      - in: query
 *        name: userID
 *        description: ID of user
 *        required: true
 *        schema:
 *          type: integer
 *        example: 1
 *     responses:
 *       200:
 *         description: Get organizer's info successfully.
 *       404:
 *         description: Organizer not found.
 *       500:
 *         description: Error message.
 */

export async function GET(req: NextRequest) {
  const eventID = req.nextUrl.searchParams.get('eventID');
  const userID = req.nextUrl.searchParams.get('userID');
  const res = await MemberService.getEventInfoById({ eventID: Number(eventID), userID: Number(userID) });
  return NextResponse.json(res.responseBody(), { status: res.status });
}
