import { NextRequest, NextResponse } from 'next/server';
import EventService from '@/services/eventService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{key}:
 *  get:
 *    tags:
 *      - Event
 *    description: Get event by key.
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
 *        description: Get event successfully.
 *      404:
 *        description: Event not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const key = getParams(req);
  const res = await EventService.getEventByKey(key as string);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
