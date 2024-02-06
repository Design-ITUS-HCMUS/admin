import ContestantService from '@/services/contestantService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/contestant?id={id}:
 *  get:
 *    tags:
 *      - Contestant
 *    description: Get contestant's information by id.
 *    parameters:
 *       - in: query
 *         name: id
 *         description: ID of contestant (accountEvent)
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *    responses:
 *      200:
 *        description: Get contestant successfully.
 *      404:
 *        description: Contestant not found.
 *      500:
 *        description: Error message.
 */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await ContestantService.getInfoById(Number(id));
  return NextResponse.json(res.responseBody(), { status: res.status });
}
