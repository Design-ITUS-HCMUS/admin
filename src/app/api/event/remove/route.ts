import { NextRequest, NextResponse } from 'next/server';

import EventService from '@/services/eventService';

/**
 * @swagger
 * /api/event/remove:
 *  delete:
 *    tags:
 *     - Event
 *    description: Delete event by ID.
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *          - id
 *        properties:
 *          id:
 *           type: integer
 *           example: 1
 *    responses:
 *      200:
 *        description: Delete event successfully.
 *      404:
 *        description: Event not found.
 *      500:
 *        description: Error message.
 */

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const res = await EventService.deleteEvent(id);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
