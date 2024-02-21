import { NextRequest, NextResponse } from 'next/server';

import ContestantService from '@/services/contestantService';

/**
 * @swagger
 * /api/contestant?eventID={eventID}&userID={userID}:
 *  get:
 *    tags:
 *      - Contestant
 *    description: Get contestant's information by event and user id.
 *    parameters:
 *       - in: query
 *         name: eventID
 *         description: ID of event
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: userID
 *         description: ID of user
 *         required: true
 *         schema:
 *          type: integer
 *         example: 1
 *    responses:
 *      200:
 *        description: Get contestant successfully.
 *      404:
 *        description: Contestant not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const eventID = Number(req.nextUrl.searchParams.get('eventID'));
  const userID = Number(req.nextUrl.searchParams.get('userID'));
  const res = await ContestantService.getInfoById({ eventID, userID });
  return NextResponse.json(res.responseBody(), { status: res.status });
}
