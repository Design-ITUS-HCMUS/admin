import { NextRequest, NextResponse } from 'next/server';

import AccountEventService from '@/services/accountEventService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{id}/all-contestants:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all contestants by event ID.
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
 *        description: Get all contestants successfully.
 *      404:
 *        description: Event not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = getParams(req, -2);
  const res = await AccountEventService.getContestantsByEventID(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
