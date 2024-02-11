import { NextRequest, NextResponse } from 'next/server';

import EventService from '@/services/eventService';

/**
 * @swagger
 * /api/event/update:
 *  put:
 *   tags:
 *    - Event
 *   description: Update a event
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *          schema:
 *             type: object
 *             required:
 *              - id
 *              - data
 *             properties:
 *              id:
 *                  type: integer
 *                  example: 1
 *              data:
 *                  type: object
 *                  example:
 *                     url: https://www.google.com
 *                     description: Description of the event
 *   responses:
 *      200:
 *         description: Update event successfully.
 *      404:
 *         description: Event not found.
 *      500:
 *         description: Error message.
 */

export async function PUT(req: NextRequest) {
  const { id, data } = await req.json();
  const res = await EventService.updateEvent(data, Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
