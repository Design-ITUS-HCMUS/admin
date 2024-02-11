import { NextRequest, NextResponse } from 'next/server';

import EventService from '@/services/eventService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{key}/close-event:
 *  patch:
 *    tags:
 *      - Event
 *    description: Close event by key.
 *    parameters:
 *     - in: path
 *       name: key
 *       description: key of event
 *       required: true
 *       schema:
 *        type: string
 *       example: OS8
 *    responses:
 *      200:
 *        description: Close event successfully.
 *      404:
 *        description: Event not found.
 *      500:
 *        description: Error message.
 */

export async function PATCH(req: NextRequest) {
  const key = getParams(req, -2);
  const res = await EventService.updateEvent({ key: key as string, end: new Date(), status: false } as any);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
