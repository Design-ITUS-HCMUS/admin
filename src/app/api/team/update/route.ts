import { NextRequest, NextResponse } from 'next/server';

import TeamService from '@/services/teamService';

/**
 * @swagger
 * /api/team/update:
 *  put:
 *    tags:
 *      - Team
 *    description: Update a team
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                example: 1
 *              data:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: VoTree
 *                  category:
 *                    type: string
 *                    example: animation
 *    responses:
 *      200:
 *        description: Update team successfully.
 *      404:
 *        description: Team not found.
 *      409:
 *        description: Team name already exists.
 *      500:
 *        description: Error message.
 */

export async function PUT(req: NextRequest) {
  const { id, data } = await req.json();
  const res = await TeamService.updateTeam(Number(id), data);
  return NextResponse.json(res.responseBody(), { status: res.status });
}
