import { NextRequest, NextResponse } from 'next/server';

import bucketService from '@/services/bucketService';
import getParams from '@/utils/getParams';

/**
 * @swagger
 * /api/file/{id}:
 *   get:
 *     tags:
 *       - Bucket
 *     description: Get file by id
 *     parameters:
 *     - in: path
 *       name: id
 *       description: ID of file
 *       required: true
 *       schema:
 *        type: integer
 *       example: 1
 *     responses:
 *       200:
 *         description: Return requested file
 *       500:
 *         description: Error message
 *       403:
 *         description: Forbidden
 *
 *   delete:
 *     tags:
 *       - Bucket
 *     description: Get file by id
 *     parameters:
 *     - in: path
 *       name: id
 *       description: ID of file
 *       required: true
 *       schema:
 *        type: integer
 *       example: 1
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Error message
 *       403:
 *         description: Forbidden
 */

export async function GET(req: NextRequest) {
  try {
    const id = Number(getParams(req));
    const token = req.cookies.get('token');
    const response = await bucketService.getFile(id, token);

    if (!response.success) throw new Error(response.responseBody().message);

    return NextResponse.redirect(response.data);
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(getParams(req));
    const token = req.cookies.get('token');
    const response = await bucketService.deleteFile(id, token);
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
