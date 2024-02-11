import { NextResponse } from 'next/server';

import EventService from '@/services/eventService';

/**
 * @swagger
 * /api/event/all-events:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all events
 *    responses:
 *      200:
 *        description: Get all events successfully.
 *      500:
 *        description: Error message.
 */

export async function GET() {
  const res = await EventService.getAllEvents();
  return NextResponse.json(res.responseBody(), { status: res.status });
}
