import { NextRequest, NextResponse } from 'next/server';
import EventService from '@/services/eventService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{id}:
 *  get:
 *    tags:
 *      - Event
 *    description: Get event by ID.
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
 *        description: Get event successfully.
 *      404:
 *        description: Event not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = getParams(req);
  const res = await EventService.getEventById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}