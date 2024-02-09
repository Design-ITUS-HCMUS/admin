import { NextRequest, NextResponse } from 'next/server';
import paymentService from '@/services/paymentService';

/**
 * @swagger
 * /api/contestant/team/verify:
 *   patch:
 *     tags:
 *       - Payment
 *     description: Verify and update payment status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teamID
 *             properties:
 *               teamID:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Payment request object
 *       500:
 *         description: Error message
 */

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await paymentService.verifyPayment(body);

    if (response === undefined) throw new Error('Empty response');
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
