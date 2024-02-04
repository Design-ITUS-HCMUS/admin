import { NextRequest, NextResponse } from 'next/server';
import EventService from '@/services/eventService';

/**
 * @swagger
 * /api/event?id={eventID}:
 *  get:
 *    tags:
 *      - Event
 *    description: Get a event by ID.
 *    parameters:
 *     - in: query
 *       name: id
 *       description: ID of event
 *       required: true
 *       schema:
 *        type: integer
 *       example: 1
 *    responses:
 *      200:
 *        description: Get event successfully.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await EventService.getEventById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
