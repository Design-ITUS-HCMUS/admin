import SubmissionService from '@/services/submissionService';
import getParams from '@/utils/getParams';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/event/{key}/all-submissions:
 *  get:
 *    tags:
 *      - Event
 *    description: Get all submissions by event key.
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
 *        description: Get all submissions successfully.
 *      404:
 *        description: Event or submissions not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const key = getParams(req, -2);
  const res = await SubmissionService.getSubmissionsByEventKey(key as string);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
