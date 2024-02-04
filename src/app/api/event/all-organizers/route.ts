import AccountEventService from '@/services/accountEventService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/event/all-organizers?id={eventID}:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all organizers by event ID.
 *    parameters:
 *     - in: query
 *       name: id
 *       description: ID of event
 *       required: true
 *       schema:
 *        type: integer
 *       example: 2
 *    responses:
 *      200:
 *        description: Get all organizers successfully.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await AccountEventService.getOrganizersByEventId(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
