import { NextRequest, NextResponse } from 'next/server';

import EventService from '@/services/eventService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{id}/close-event:
 *  patch:
 *    tags:
 *      - Event
 *    description: Close event by ID.
 *    parameters:
 *     - in: path
 *       name: id
 *       description: ID of event
 *       required: true
 *       schema:
 *        type: integer
 *       example: 1
 *    responses:
 *      200:
 *        description: Close event successfully.
 *      404:
 *        description: Event not found.
 *      500:
 *        description: Error message.
 */

export async function PATCH(req: NextRequest) {
  const id = getParams(req, -2);
  const res = await EventService.updateEvent(Number(id), { end: new Date(), status: false } as any);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
