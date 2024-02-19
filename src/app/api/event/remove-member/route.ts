import { NextRequest, NextResponse } from 'next/server';

import AccountEventService from '@/services/accountEventService';

/**
 * @swagger
 * /api/event/remove-member:
 *  delete:
 *    tags:
 *      - Event
 *    description: Remove member from event
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                example: 7
 *    responses:
 *      200:
 *        description: Remove member from event successfully.
 *      500:
 *        description: Error message.
 */

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const res = await AccountEventService.deleteAccountEvent(id);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
