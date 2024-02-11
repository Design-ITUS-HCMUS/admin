import { NextRequest, NextResponse } from 'next/server';

import paymentService from '@/services/paymentService';
/**
 * @swagger
 * /api/payment/by-buyer:
 *   post:
 *     tags:
 *       - Payment
 *     description: Returns all payments of a buyer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyerID
 *             properties:
 *               buyerID:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Payment request object
 *       500:
 *         description: Error message
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await paymentService.getPaymentByBuyerID(body);

    if (response === undefined) throw new Error('Empty response');
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
