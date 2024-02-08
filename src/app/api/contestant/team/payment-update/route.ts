import { NextRequest, NextResponse } from 'next/server';
import payOSPaymentService from '@/services/payOSPaymentService';
import paymentService from '@/services/paymentService';

/**
 * @swagger
 * /api/contestant/team/payment-update:
 *   post:
 *     tags:
 *       - Payment
 *     description: Update payment status when the transaction is first created.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyerID
 *               - teamID
 *             properties:
 *               buyerID:
 *                 type: integer
 *                 default: 1
 *               teamID:
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
    body.description = 'OUTRSPACE8';
    body.items = [
      {
        name: 'Phí tham gia Outrspace',
        quantity: 1,
        price: 10000,
      },
    ];

    const response = await paymentService.createTransaction(body);
    if (response === undefined) throw new Error('Empty response');
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
