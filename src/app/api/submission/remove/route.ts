import { NextRequest, NextResponse } from 'next/server';
import SubmissionService from '@/services/submissionService';

/**
 * @swagger
 * /api/submission/remove:
 *   delete:
 *     tags:
 *       - Submission
 *     description: Remove a submission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Remove submission successfully.
 *       404:
 *         description: Submission not found.
 *       500:
 *         description: Error message.
 */

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const response = await SubmissionService.deleteSubmission(id);
  return NextResponse.json(response.responseBody(), { status: response.status });
}
