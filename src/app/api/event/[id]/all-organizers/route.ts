import AccountEventService from '@/services/accountEventService';
import { NextRequest, NextResponse } from 'next/server';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{id}/all-organizers:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all organizers by event ID.
 *    parameters:
 *     - in: path
 *       name: id
 *       description: ID of event
 *       required: true
 *       schema:
 *        type: integer
 *       example: 2
 *    responses:
 *      200:
 *        description: Get all organizers successfully.
 *      404:
 *        description: Event or organizers not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = getParams(req, -2);
  const res = await AccountEventService.getOrganizersByEventID(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
