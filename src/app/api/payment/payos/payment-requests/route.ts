import { NextRequest, NextResponse } from 'next/server';

import payOSPaymentService from '@/services/payOSPaymentService';

/**
 * @swagger
 * /api/payment/payos/payment-requests:
 *   post:
 *     tags:
 *       - Payment
 *     description: Returns the payment request object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyerID
 *               - description
 *               - items
 *             properties:
 *               buyerID:
 *                 type: integer
 *                 default: 1
 *               description:
 *                 type: string
 *                 default: 'OUTRSPACE8'
 *               items:
 *                 type: array
 *                 items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        default: 'Phí tham gia Outrspace'
 *                      quantity:
 *                        type: integer
 *                        default: 1
 *                      price:
 *                        type: integer
 *                        default: 10000
 *     responses:
 *       200:
 *         description: Payment request object
 *       500:
 *         description: Error message
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await payOSPaymentService.createPaymentLink(body);
    if (response === undefined) throw new Error('Empty response');
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
