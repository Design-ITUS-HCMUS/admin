import submissionService from '@/services/submissionService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/submission?id={id}:
 *   get:
 *     tags:
 *       - Submission
 *     description: Get information of submission by ID.
 *     parameters:
 *        - in: query
 *          name: id
 *          description: ID of submission
 *          required: true
 *          schema:
 *            type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Retrieved submission successfully.
 *       404:
 *         description: Submission not found.
 *       500:
 *         description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await submissionService.getSubmissionById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
