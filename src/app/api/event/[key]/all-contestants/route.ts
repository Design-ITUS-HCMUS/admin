import AccountEventService from '@/services/accountEventService';
import { NextRequest, NextResponse } from 'next/server';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/event/{key}/all-contestants:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all contestants by event key.
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
 *        description: Get all contestants successfully.
 *      404:
 *        description: Event not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const key = getParams(req, -2);
  const res = await AccountEventService.getContestantsByEventKey(key as string);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
