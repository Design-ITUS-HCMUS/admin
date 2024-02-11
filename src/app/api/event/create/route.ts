import { NextRequest, NextResponse } from 'next/server';

import EventService from '@/services/eventService';

/**
 * @swagger
 * /api/event/create:
 *  post:
 *   tags:
 *    - Event
 *   description: Create a new event
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            example: Outr Space 8
 *          key:
 *            type: string
 *            example: OS8
 *          tag:
 *            type: array
 *            items:
 *              type: string
 *            example: [contest]
 *          start:
 *            type: string
 *            format: date-time
 *            example: 2024-03-21T00:00:00.000Z
 *          thumbnail:
 *            type: number
 *            example: 1
 *          description:
 *            type: string
 *            example: Description
 *   responses:
 *    200:
 *      description: Create event successfully.
 *    400:
 *      description: Bad request.
 *    409:
 *      description: Event already exists.
 *    500:
 *      description: Error message.
 */

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await EventService.createEvent(data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
