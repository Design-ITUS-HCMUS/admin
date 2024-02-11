import AccountEventService from '@/services/accountEventService';
import { NextRequest, NextResponse } from 'next/server';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{key}/all-organizers:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all organizers by event key.
 *    parameters:
 *     - in: path
 *       name: key
 *       description: key of event
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
  const key = getParams(req, -2);
  const res = await AccountEventService.getOrganizersByEventKey(key as string);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
