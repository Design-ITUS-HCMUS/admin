import { NextRequest, NextResponse } from 'next/server';
import submissionService from '@/services/submissionService';

/**
 * @swagger
 * /api/submission/create:
 *  post:
 *    tags:
 *      - Submission
 *    description: Create a new submission.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              files:
 *                type: array
 *                description: files' ID
 *                example: [{id: 1}]
 *              teamID:
 *                type: number
 *                description: team's ID
 *                example: 1
 *    responses:
 *     200:
 *      description: Create submission successfully.
 *     500:
 *      description: Error message.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await submissionService.createSubmission(body);
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
