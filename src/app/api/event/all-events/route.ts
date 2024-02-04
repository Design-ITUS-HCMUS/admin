import EventService from '@/services/eventService';
import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(req: NextRequest) {
  const res = await EventService.getAllEvents();
  return NextResponse.json(res.responseBody(), { status: res.status });
}
