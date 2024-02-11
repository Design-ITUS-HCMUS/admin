import { NextRequest, NextResponse } from 'next/server';

import MemberService from '@/services/memberService';

/**
 * @swagger
 * /api/member?accountEventID={id}:
 *   get:
 *     tags:
 *       - Organizer
 *     description: Get event info by ID.
 *     parameters:
 *      - in: query
 *        name: accountEventID
 *        description: ID of organizer (accountEvent)
 *        required: true
 *        schema:
 *         type: integer
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
  const id = req.nextUrl.searchParams.get('accountEventID');
  const res = await MemberService.getEventInfoById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
