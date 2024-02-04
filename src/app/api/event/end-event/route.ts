import { NextRequest, NextResponse } from 'next/server';
import EventService from '@/services/eventService';

/**
 * @swagger
 * /api/event/end-event?id={eventID}:
 *  patch:
 *      tags:
 *         - Event
 *      description: End a event
 *      parameters:
 *          - in: query
 *            name: id
 *            description: ID of event
 *            required: true
 *            schema:
 *             type: integer
 *            example: 1
 *      responses:
 *         200:
 *           description: End event successfully.
 *         404:
 *           description: Event not found.
 *         500:
 *           description: Error message.
 */

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await EventService.updateEvent(Number(id), { end: new Date(), status: false } as any);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
