import { NextRequest, NextResponse } from 'next/server';

import accountEventService from '@/services/accountEventService';

/**
 * @swagger
 * /api/event/add-member:
 *  post:
 *   tags:
 *    - Event
 *   description: Add a member to an event
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        userId:
 *         type: integer
 *         example: 3
 *        eventID:
 *         type: integer
 *         example: 2
 *        department:
 *         type: string
 *         example: Multimedia
 *   responses:
 *    200:
 *      description: Add member to event successfully.
 *    409:
 *      description: Member already added.
 *    500:
 *      description: Error message.
 */

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await accountEventService.createAccountEvent(data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
